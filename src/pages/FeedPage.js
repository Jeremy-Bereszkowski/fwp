import React from 'react';
import {useSnackbar} from "notistack";

import {
    makeStyles,
    Typography,
} from "@material-ui/core";

import DefaultLayout from "../layouts/DefaultLayout";

import {usePost} from "../components/Provides/PostProvider";
import {useAuth} from "../components/Provides/AuthProvider";
import NewPostCard from "../components/Cards/NewPostCard";
import PostCard from "../components/Cards/PostCard";
import WarningDialog from "../components/Dialog/WarningDialog";
import PostReplyCard from "../components/Cards/PostReplyCard";
import FileUploadDialog from "../components/Dialog/FileUploadDialog";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(0, 0)
        },
        [theme.breakpoints.up("md")]: {
            padding: theme.spacing(0, 6)
        },
    },
    newPostContainer: {
        marginBottom: theme.spacing(5)
    },
    cardContainer: {
        marginBottom: theme.spacing(7.5)
    },
}));

/**
 * Feed page - private page
 *
 *  Renders all posts from all users
 *  Provides facility to create a new post
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function FeedPage() {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar()
    const {posts, postCreate, postUpdate, postDelete} = usePost();
    const {currentUser, getUserByEmail, getInitialsOfUser} = useAuth();
    const feed = posts ?? []

    const [loading, setLoading] = React.useState(false)
    const [inputData, setInputData] = React.useState('')
    const [files, setFiles] = React.useState([])
    const [warningDialogOpen, setWarningDialogOpen] = React.useState(false);
    const [uploadFileDialogOpen, setUploadFileDialogOpen] = React.useState(false);
    const [activePost, setActivePost] = React.useState(false);

    const handleLoadingSet = () => setLoading(true)
    const handleLoadingUnset = () => setLoading(false)

    const handleWarningDialogOpen = () => setWarningDialogOpen(true);
    const handleWarningDialogClose = () => setWarningDialogOpen(false);

    const handleFileUploadDialogOpen = () => setUploadFileDialogOpen(true);
    const handleFileUploadDialogClose = () => setUploadFileDialogOpen(false);

    const handleFileSet = (files) => setFiles(files)
    const handleFileReset = () => setFiles([])

    const handleInputDataUpdate = (event) => setInputData(event.target.value)
    const handleInputDataReset = () => setInputData('')

    const handleActivePostSet = (postId) => setActivePost(postId);

    const onSubmit = () => {
        if (!inputData) return;

        handleLoadingSet()

        postCreate(inputData, files)
            .then(() => {
                handleInputDataReset();
                handleFileReset()
                handleLoadingUnset()
            });
    }

    const onEdit = (postId, body) => {
        postUpdate(postId, body)
    }

    const onDelete = () => {
        postDelete(activePost)
        handleWarningDialogClose()
        enqueueSnackbar('Post deleted', { variant: 'warning' });
    }

    const handleDeletePress = (postId) => {
        handleWarningDialogOpen()
        handleActivePostSet(postId)
    }

    return (
        <DefaultLayout>
            <div className={classes.root}>
                <div className={classes.newPostContainer}>
                    <NewPostCard
                        loading={loading}
                        files={files.length > 0}
                        onSubmit={onSubmit}
                        value={inputData}
                        handleInputDataReset={handleInputDataReset}
                        handleInputDataUpdate={handleInputDataUpdate}
                        handleFileUploadDialogOpen={handleFileUploadDialogOpen}
                    />
                </div>
                {feed?.length === 0 && (
                    <div className={classes.cardContainer}>
                        <Typography
                            align={"center"}
                            variant={"h6"}
                            component={"p"}
                            color={"textSecondary"}
                        >
                            No posts yet, be the first to make one!
                        </Typography>
                    </div>
                )}
                {[...feed].reverse().map(ele => {
                    const user = getUserByEmail(ele.userId)
                    const avatar = user?.avatar
                    return (
                        <div className={classes.cardContainer} key={ele.postId}>
                            <PostCard
                                id={ele.postId}
                                avatar={avatar}
                                initials={getInitialsOfUser(user)}
                                editControls={currentUser.email === ele.userId}
                                header={`${user.firstName} ${user.lastName}`}
                                date={ele.postDate}
                                body={ele.body}
                                files={ele.fileNames}
                                onEdit={(body) => onEdit(ele.postId, body)}
                                onDelete={() => handleDeletePress(ele.postId)}
                            />
                            <PostReplyCard
                                postId={ele.postId}
                                postOwnerName={`${user.firstName} ${user.lastName}`}
                                replies={ele.replies}
                            />
                        </div>
                    )
                })}
            </div>
            <FileUploadDialog
                open={uploadFileDialogOpen}
                onClose={handleFileUploadDialogClose}
                files={files}
                onUpload={handleFileSet}
                onViewImage={null}
            />
            <WarningDialog
                headerLabel={'Warning!'}
                open={warningDialogOpen}
                handleClose={handleWarningDialogClose}
                handleSubmit={onDelete}
            >
                <Typography variant={"body1"}>
                    Are you sure you want to delete your post? This is irreversible.
                </Typography>
            </WarningDialog>
        </DefaultLayout>
    );
}