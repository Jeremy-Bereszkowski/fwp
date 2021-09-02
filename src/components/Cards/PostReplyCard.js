import React from 'react';
import clsx from "clsx";
import PropTypes from 'prop-types';

import {
    Button,
    Card,
    CardContent,
    Divider,
    makeStyles,
    OutlinedInput,
    Tooltip,
    Typography,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from '@material-ui/icons/Edit';

import {usePost} from "../Providers/PostProvider";
import {useAuth} from "../Providers/AuthProvider";
import ReplyCardBody from "./CardBody/ReplyCardBody";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0, 0.5),
        padding: theme.spacing(1, 1.5),
    },
    replyCard: {
        padding: `${theme.spacing(1)}!important`,
    },
    flexBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    nameText: {
        marginRight: theme.spacing(1),
    },
    bodyText: {

    },
    replyInputContainer: {
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
    input: {
        padding: theme.spacing(1)
    },
    button: {
        marginLeft: theme.spacing(4)
    },
    replyEdit: {
        marginLeft: theme.spacing(1),
        transition: `${theme.transitions.duration.standard}ms`,
        "&:hover": {
            color: theme.palette.info.main
        }
    },
    replyDelete: {
        marginLeft: theme.spacing(1),
        transition: `${theme.transitions.duration.standard}ms`,
        "&:hover": {
            color: theme.palette.error.main
        }
    },
    replyTypeContainer: {
        display: "flex",
    }
}));

export default function PostReplyCard({postId, postOwnerName, replies}) {
    const classes = useStyles()
    const {replyCreate, replyDelete} = usePost()
    const {currentUser, getUserById} = useAuth();

    const [reply, setReply] = React.useState('')
    const [edit, setEdit] = React.useState(false)

    const handleReplySet = (event) => setReply(event.target.value)
    const handleReplyReset = () => setReply('')

    const onSubmit = (event) => {
        event.preventDefault();

        if (!reply) return

        replyCreate(reply, postId)
        handleReplyReset()
    }

    const onDeleteReply = (replyId) => {
        replyDelete(postId, replyId)
    }

    return (
        <Card ele1ation={3} className={classes.root}>
            <form
                className={clsx(classes.flexBox, classes.replyInputContainer)}
                onSubmit={onSubmit}
            >
                <OutlinedInput
                    id={'sad'}
                    type={"text"}
                    required={false}
                    value={reply}
                    onChange={handleReplySet}
                    fullWidth
                    placeholder={`Reply to ${postOwnerName}'s post`}
                    classes={{
                        input: classes.input
                    }}
                />
                <Button
                    size={"small"}
                    type={"submit"}
                    variant={"contained"}
                    color={"primary"}
                    className={classes.button}
                >
                    REPLY
                </Button>
            </form>
            {replies.length > 0 && replies.map((ele, key) => {
                const user = getUserById(ele.userId)
                return (
                    <React.Fragment key={ele.id}>
                        <ReplyCardBody
                            user={user}
                            postId={postId}
                            reply={ele}
                        />
                        {key !== replies.length - 1 && (
                            <Divider/>
                        )}
                    </React.Fragment>
                )
            })}
        </Card>
    );
}

PostReplyCard.defaultProps = {
    editControls: []
};

PostReplyCard.propTypes = {
    postId: PropTypes.string.isRequired,
    postOwnerName: PropTypes.string.isRequired,
    replies: PropTypes.array,
};
