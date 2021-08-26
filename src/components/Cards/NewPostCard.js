import React from 'react';
import PropTypes from 'prop-types';

import {
    Card,
    CardContent,
    CardHeader,
    makeStyles,
} from "@material-ui/core";

import {useAuth} from "../Providers/AuthProvider";
import UserAvatar from "../Avatar/UserAvatar";
import PostCardActions from "./PostCardActions";
import OutlinedInputWithLabelWithErrors from "../Inputs/OutlinedInputWithLabelWithErrors";

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(2.5)
    },
    cardHeader: {
        paddingBottom: "0",
    },
    cardContent: {
        paddingTop: "0",
        paddingBottom: "0",
    },
}));

/**
 * Card that provides facility to create a new post
 * New post can contain text and a single image
 *
 * @param loading
 * @param files
 * @param onSubmit
 * @param handleFileUploadDialogOpen
 * @param value
 * @param handleInputDataUpdate
 * @param handleInputDataReset
 * @returns {JSX.Element}
 * @constructor
 */
export default function NewPostCard({loading, files, onSubmit, handleFileUploadDialogOpen, value, handleInputDataUpdate, handleInputDataReset}) {
    const classes = useStyles();
    const {getCurrentUserFullName} = useAuth();

    /* State variables */
    const [errors, setErrors] = React.useState([])

    /* State handlers */
    const handleErrorsSet = (errors) => setErrors(errors);
    const handleErrorsReset = () => setErrors([]);

    /* Event handlers */
    const handleSubmit = (event) => {
        event.preventDefault()
        handleErrorsReset()

        if (!value) return handleErrorsSet(["Post can't be empty"])

        onSubmit();
    }

    return (
        <Card elevation={6} className={classes.root}>
            <CardHeader
                avatar={<UserAvatar/>}
                title={getCurrentUserFullName()}
                className={classes.cardHeader}
            />
            <form onSubmit={handleSubmit}>
                <CardContent className={classes.cardContent}>
                    <OutlinedInputWithLabelWithErrors
                        id={"create-post-input"}
                        type={"text"}
                        label={"Create a new post"}
                        labelWidth={130}
                        required={true}
                        value={value}
                        onChange={handleInputDataUpdate}
                        errors={errors}
                    />
                </CardContent>
                <PostCardActions
                    handleFileUploadDialogOpen={handleFileUploadDialogOpen}
                    color={"primary"}
                    files={files}
                    leftButton={{
                        label: "CLEAR",
                        onClick: handleInputDataReset
                    }}
                    rightButton={{
                        label: "POST",
                        loading: loading
                    }}
                />
            </form>
        </Card>
    );
}

NewPostCard.defaultProps = {
    loading: false
};

NewPostCard.propTypes = {
    loading: PropTypes.bool,
    files: PropTypes.bool,
    onSubmit: PropTypes.func,
    value: PropTypes.string,
    handleInputDataUpdate: PropTypes.func,
    handleInputDataReset: PropTypes.func,
};