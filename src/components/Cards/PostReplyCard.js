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
    Typography,
} from "@material-ui/core";

import {usePost} from "../Provides/PostProvider";
import {useAuth} from "../Provides/AuthProvider";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(0, 0.5),
        padding: theme.spacing(1, 1.5),
    },
    replyCard: {
        padding: `${theme.spacing(1)}!important`,
    },
    flexBox: {
        display: "flex"
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
}));

export default function PostReplyCard({postId, postOwnerName, replies}) {
    const classes = useStyles()
    const post = usePost()
    const {getUserByEmail} = useAuth();

    const [reply, setReply] = React.useState('')

    const handleReplySet = (event) => setReply(event.target.value)
    const handleReplyReset = () => setReply('')

    const onSubmit = (event) => {
        event.preventDefault();

        if (!reply) return

        post.replyCreate(reply, postId)
        handleReplyReset()
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
                const user = getUserByEmail(ele.userId)
                return (
                    <React.Fragment key={ele.replyId}>
                        <CardContent className={classes.replyCard}>
                            <div className={classes.flexBox}>
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
                                    className={classes.bodyText}
                                >
                                    {ele.body}
                                </Typography>
                            </div>
                        </CardContent>
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
