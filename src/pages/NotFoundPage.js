import React from 'react';

import {
    makeStyles,
    Typography
} from "@material-ui/core";

import DefaultLayout from "../layouts/DefaultLayout";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(20),
    },
}))

export default function NotFoundPage() {
    const classes = useStyles();
    return (
        <DefaultLayout>
            <Typography
                variant={"h3"}
                component={"h2"}
                align={"center"}
                className={classes.root}
            >
                404 - Page not found :(
            </Typography>
        </DefaultLayout>

    );
}
