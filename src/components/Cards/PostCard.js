import React from 'react';
import PropTypes from 'prop-types';
import {useSnackbar} from "notistack";

import {
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    IconButton,
    makeStyles,
    Tooltip,
    Typography,
} from "@material-ui/core";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from '@material-ui/icons/Edit';

import PostCardActions from "./PostCardActions";
import OutlinedInputWithLabelWithErrors from "../Inputs/OutlinedInputWithLabelWithErrors";
import {downloadBlob} from "../../util/firebase/storage";
import UserAvatar from "../Avatar/UserAvatar";
import {usePost} from "../Provides/PostProvider";
import {useAuth} from "../Provides/AuthProvider";

const useStyles = makeStyles((theme) => ({
    editButton: {
        color: theme.palette.text.secondary,
        "&:hover": {
            color: theme.palette.info.main,
        }
    },
    deleteButton: {
        color: theme.palette.text.secondary,
        "&:hover": {
            color: theme.palette.error.main,
        }
    },
    cardContent: {
        paddingTop: "0",
        paddingBottom: "0",
    },
    cardActions: {
        padding: theme.spacing(1, 2),
    },
    buttonContainer: {
        marginLeft: 'auto',
    },
    button: {
        marginLeft: theme.spacing(1),
    },
    postBody: {
        marginBottom: theme.spacing(0.25),
    },
    imageContainer: {
        display: "flex",
        justifyContent: "center",
    },
    image: {
        display: "block",
        maxWidth: "100%",
        width: "auto",
        height: "auto",
    },
    form: {
        backgroundColor: theme.palette.type === "dark" ? theme.palette.grey["700"] : theme.palette.grey["50"],
        borderRadius: theme.shape.borderRadius,
    }
}));

/**
 * Card that presents a users post
 * Renders image and text of post
 *
 * Allows users to edit text in their existing post
 * Existing posts cannot be edited to have an image
 *
 * @param files
 * @param id
 * @param editControls
 * @param avatar
 * @param header
 * @param date
 * @param body
 * @param onEdit
 * @param onDelete
 * @returns {JSX.Element}
 * @constructor
 */
export default function PostCard({files, id, editControls, avatar, initials, header, date, body, onEdit, onDelete}) {
    const classes = useStyles();
    const {enqueueSnackbar} = useSnackbar();
    const {posts} = usePost();

    const [postData, setPostData] = React.useState(body)
    const [edit, setEdit] = React.useState(false)
    const [errors, setErrors] = React.useState([])
    const [fileUrl, setFileUrl] = React.useState('');
    const [loading, setLoading] = React.useState(true)

    const handleFileUrlSet = (fileUrl) => setFileUrl(fileUrl)

    const handleLoadingUnset = () => setLoading(false)

    React.useEffect(() => {
        if (!edit) {
            handleErrorsReset()
            handlePostDataReset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [edit])

    React.useEffect(() => {
        const func = async () => {
            if (files.length > 0) {
                downloadBlob(files[0])
                    ?.then((url) => handleFileUrlSet(url))
            }
            handleLoadingUnset()
        }

        func()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts])

    const handleEditToggle = () => setEdit(edit => !edit);

    const handlePostDataSet = (event) => setPostData(event.target.value);
    const handlePostDataReset = () => setPostData(body);

    const handleErrorsSet = (errors) => setErrors(errors);
    const handleErrorsReset = () => setErrors([]);

    const handleDelete = () => {
        onDelete(id)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        if (!postData) return handleErrorsSet(["Post can't be empty"]);

        onEdit(postData);
        handleEditToggle();
        enqueueSnackbar('Post updated', { variant: 'success' });
    }

    const headerButtons = [
        {tooltip: "Edit Post", ariaLabel: "edit", onClick: handleEditToggle, className: classes.editButton, icon: <EditIcon/>},
        {tooltip: "Delete Post", ariaLabel: "delete", onClick: handleDelete, className: classes.deleteButton, icon: <DeleteOutlineIcon/>},
    ]

    return (
        <Card elevation={4} className={classes.postBody}>
            <CardHeader
                avatar={<UserAvatar avatar={avatar} initials={initials}/>}
                action={
                    <>
                        {editControls && headerButtons.map(ele => (
                            <Tooltip
                                key={ele.ariaLabel}
                                title={ele.tooltip}
                                placement={"bottom"}
                            >
                                <IconButton
                                    size={"medium"}
                                    aria-label={ele.ariaLabel}
                                    onClick={ele.onClick}
                                    className={ele.className}
                                >
                                    {ele.icon}
                                </IconButton>
                            </Tooltip>
                        ))}
                    </>
                }
                title={header}
                subheader={`Posted on: ${date}`}
            />
            <div className={classes.imageContainer}>
                {loading ? (
                    <CircularProgress
                        color={"secondary"}
                        size={60}
                    />
                ) : (
                    <img
                        src={fileUrl}
                        alt={files[0]}
                        className={classes.image}
                    />
                )}
            </div>
            <form onSubmit={onSubmit} className={classes.form}>
                <CardContent>
                    {edit ? (
                        <OutlinedInputWithLabelWithErrors
                            color={"secondary"}
                            id={"edit-post-input"}
                            type={"text"}
                            label={"Edit post"}
                            labelWidth={70}
                            required={true}
                            value={postData}
                            onChange={handlePostDataSet}
                            errors={errors}
                        />
                    ) : (
                        <Typography
                            variant={"body1"}
                            component={"p"}
                        >
                            {body}
                        </Typography>
                    )}
                </CardContent>
                {edit && (
                    <PostCardActions
                        color={"secondary"}
                        leftButton={{
                            label: "RESET",
                            onClick: handlePostDataReset,
                        }}
                        rightButton={{
                            label: "UPDATE",
                        }}
                    />
                )}
            </form>
        </Card>
    );
}

PostCard.defaultProps = {
    editControls: false
};

PostCard.propTypes = {
    files: PropTypes.array,
    initials: PropTypes.string,
    editControls: PropTypes.bool,
    avatar: PropTypes.object.isRequired,
    header: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};
