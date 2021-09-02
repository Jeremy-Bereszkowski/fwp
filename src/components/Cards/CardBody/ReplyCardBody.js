import React from 'react';

import {
    CardContent,
    makeStyles,
    Tooltip,
    Typography
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import {usePost} from "../../Providers/PostProvider";
import {useAuth} from "../../Providers/AuthProvider";

const useStyles = makeStyles((theme) => ({
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
        whiteSpace: "nowrap",
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
        alignItems: "center",
    },
    input: {
        padding: theme.spacing(1)
    },
    button: {
        marginLeft: theme.spacing(1)
    },

}));

function ReplyCardBody(props) {
    const {user, postId, reply} = props
    const classes = useStyles()
    const {replyDelete} = usePost()
    const {currentUser} = useAuth();

    const onDeleteReply = (replyId) => replyDelete(postId, replyId)

    return (
        <CardContent className={classes.replyCard}>
            <div className={classes.flexBox}>
                <div className={classes.replyTypeContainer}>
                    <Typography
                        variant={"body2"}
                        color={"textPrimary"}
                        className={classes.nameText}
                    >
                        {user ? (
                            `${user.firstName} ${user.lastName} - `
                        ) : (
                            `Deleted -`
                        )}
                    </Typography>
                    <Typography
                        variant={"body2"}
                        color={"textSecondary"}
                        className={classes.nameText}
                    >
                        {reply.body}
                    </Typography>
                </div>
                {reply.userId === currentUser.id && (
                    <div className={classes.replyTypeContainer}>
                        <Tooltip
                            title={"Delete Post"}
                            placement={"left"}
                            className={classes.replyDelete}
                            onClick={() => onDeleteReply(reply.id)}
                        >
                            <DeleteOutlineIcon fontSize={"small"}/>
                        </Tooltip>
                    </div>
                )}
            </div>
        </CardContent>
    );
}

export default ReplyCardBody;