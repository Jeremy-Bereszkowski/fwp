import React from 'react';

import {Hidden, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    line: {
        width: "100%",
        marginTop: theme.spacing(3),
        borderColor: theme.palette.divider,
    },
}));

export default function HrUpMedium() {
    const classes = useStyles()
    return (
        // <Hidden only={["xs", "sm"]}>
            <hr className={classes.line}/>
        // </Hidden>
    );
}
