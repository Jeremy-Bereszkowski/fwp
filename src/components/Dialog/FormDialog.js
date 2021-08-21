import React from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    Dialog,
    makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
    },
}));

export default function FormDialog(props) {
    const {headerLabel, body, open, handleClose} = props
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <Grid
                container
                direction={"column"}
                alignItems={"center"}
                alignContent={"center"}
                justify={"center"}
                className={classes.paper}
            >
                <Grid item xs={12} sm={12} md={12}>
                    <h2 className={classes.paper}>
                        {headerLabel}
                    </h2>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                    {body}
                </Grid>
            </Grid>
        </Dialog>
    );
}

FormDialog.defaultProps = {
    header: PropTypes.node.isRequired,
    body: PropTypes.node.isRequired,
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
}
