import React from 'react';
import PropTypes from 'prop-types';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, makeStyles, Typography,
} from "@material-ui/core";

import CustomButton from "../Button/CustomButton";
import Dropzone from "../Dropzone/Dropzone";

const useStyles = makeStyles(theme => ({
    actionContainer: {
        marginRight: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
    }
}));

/**
 * Dialog panel for uploading files
 *
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function FileUploadDialog(props) {
    const {open, onClose, onUpload} = props
    const classes = useStyles()
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={"md"}
            fullWidth
        >
            <DialogTitle>
                Image upload
            </DialogTitle>
            <DialogContent>
                <Dropzone handleFileUpload={onUpload} />
            </DialogContent>
            <DialogActions>
                <div className={classes.actionContainer}>
                    <Typography color={"error"}>
                        Max. upload size of 10MB
                    </Typography>
                    <CustomButton
                        color={"primary"}
                        variant={"outlined"}
                        onClick={onClose}
                    >
                        DONE
                    </CustomButton>
                </div>
            </DialogActions>
        </Dialog>
    );
}

FileUploadDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onUpload: PropTypes.func.isRequired,
};
