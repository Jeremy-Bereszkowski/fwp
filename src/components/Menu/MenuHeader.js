import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {useAuth} from "../Providers/AuthProvider";

const useStyles = makeStyles(theme => ({
    menuHeader: {
        margin: theme.spacing(0, 14, 4, 2)
    },
    menuSubHeader: {
        margin: theme.spacing(0, 14, 0, 2)
    }
}));

function MenuHeader() {
    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Typography
                variant={"subtitle2"}
                component={"p"}
                color={"textSecondary"}
                className={classes.menuSubHeader}
            >
                Welcome
            </Typography>
            <Typography
                variant={"subtitle1"}
                component={"p"}
                color={"textPrimary"}
                className={classes.menuHeader}
                gutterBottom
            >
                {auth.currentUser.firstName}
            </Typography>
        </>
    );
}

export default MenuHeader;