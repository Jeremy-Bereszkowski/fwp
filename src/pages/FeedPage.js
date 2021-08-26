import React from 'react';
import {useSnackbar} from "notistack";

import {
    makeStyles,
    Typography,
} from "@material-ui/core";

import {usePost} from "../components/Providers/PostProvider";
import {useAuth} from "../components/Providers/AuthProvider";
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
 *  Providers facility to create a new post
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function FeedPage() {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar()
    const {posts, postCreate, postUpdate, postDelete} = usePost();
    const {currentUser, getUserById, getCurrentUserInitials, getUserFullName} = useAuth();

    /* State variables */
    const [loading, setLoading] = React.useState(false)
    const [inputData, setInputData] = React.useState('')
    const [files, setFiles] = React.useState([])
    const [warningDialogOpen, setWarningDialogOpen] = React.useState(false);
    const [uploadFileDialogOpen, setUploadFileDialogOpen] = React.useState(false);
    const [activePost, setActivePost] = React.useState(false);

    /* State modifiers */
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

    /* Event handlers */
    const onSubmit = () => {
        if (!inputData) return;

        handleLoadingSet()

        if (files?.length > 0) {
            postCreate(inputData, files)
                .then(() => {
                    handleInputDataReset();
                    handleFileReset()
                    handleLoadingUnset()
                });
        } else {
            postCreate(inputData, files)
            handleInputDataReset();
            handleFileReset()
            handleLoadingUnset()
        }

    }

    const onEdit = (postId, body) => {
        postUpdate(postId, body)
    }

    const onDelete = () => {
        postDelete(activePost)
        handleWarningDialogClose()
        enqueueSnackbar('Post deleted', { variant: 'warning' });
    }

    const onDeletePress = (postId) => {
        handleWarningDialogOpen()
        handleActivePostSet(postId)
    }

    return (
        <>
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
                {posts.length === 0 && (
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
                {[...posts].reverse().map(ele => {
                    const user = getUserById(ele.userId)
                    const avatar = user?.avatar
                    return (
                        <div className={classes.cardContainer} key={ele.id}>
                            <PostCard
                                id={ele.id}
                                avatar={avatar}
                                initials={getCurrentUserInitials(user)}
                                editControls={currentUser.id === ele.userId}
                                header={getUserFullName(user)}
                                date={ele.postDate}
                                body={ele.body}
                                files={ele.fileNames}
                                onEdit={(body) => onEdit(ele.id, body)}
                                onDelete={() => onDeletePress(ele.id)}
                            />
                            <PostReplyCard
                                postId={ele.id}
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
        </>
    );
}