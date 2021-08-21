import React from 'react';
import PropTypes from 'prop-types';

import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    makeStyles,
} from "@material-ui/core";

import FormButtonGroup from "../ButtonGroup/FormButtonGroup";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

export default function WarningDialog({open, handleClose, headerLabel, handleSubmit, children}) {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <DialogTitle>
                {headerLabel}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
            <DialogActions>
                <FormButtonGroup
                    loading={false}
                    rootClass={classes.buttonGroup}
                    leftButton={{
                        label: 'Cancel',
                        color: "primary",
                        onClick: handleClose,
                    }}
                    rightButton={{
                        label: 'Delete',
                        color: "warning",
                        onClick: handleSubmit,
                    }}
                />
            </DialogActions>
        </Dialog>
    );
}

WarningDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    headerLabel: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};
