import React from 'react';
import {Button, CardContent, makeStyles, OutlinedInput, Tooltip, Typography} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import {usePost} from "../../Providers/PostProvider";
import {useAuth} from "../../Providers/AuthProvider";
import OutlinedInputWithLabelWithErrors from "../../Inputs/OutlinedInputWithLabelWithErrors";
import clsx from "clsx";

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
    const {replyCreate, replyDelete} = usePost()
    const {currentUser, getUserById} = useAuth();

    const [edit, setEdit] = React.useState(false);
    const [replyData, setReplyData] = React.useState('')

    const handleEditSet = () => setEdit(true);
    const handleEditUnset = () => setEdit(false);
    const handleEditToggle = () => setEdit(edit => !edit);

    const handleReplyDataSet = (event) => setReplyData(event.target.value)
    const handleReplyDataReset = () => setReplyData('')

    const onDeleteReply = (replyId) => {
        replyDelete(postId, replyId)
    }

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
                    {edit ? (
                        <form
                            className={clsx(classes.flexBox, classes.form)}
                            // onSubmit={onSubmit}
                        >
                            <OutlinedInput
                                id={'sad'}
                                type={"text"}
                                required={false}
                                value={replyData}
                                onChange={handleReplyDataSet}
                                fullWidth
                                placeholder={reply.body}
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
                                Update
                            </Button>
                        </form>
                    ) : (
                        <Typography
                            variant={"body2"}
                            color={"textSecondary"}
                            className={classes.bodyText}
                        >
                            {reply.body}
                        </Typography>
                    )}
                </div>
                {reply.userId === currentUser.id && (
                    <div className={classes.replyTypeContainer}>
                        <Tooltip
                            title={"Edit Post"}
                            placement={"left"}
                            className={classes.replyEdit}
                            onClick={handleEditToggle}
                        >
                            <EditIcon fontSize={"small"}/>
                        </Tooltip>
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