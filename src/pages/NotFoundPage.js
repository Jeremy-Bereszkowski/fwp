import React from 'react';

import {
    makeStyles,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(20),
    },
}))

/**
 * Not found page
 *  Public page which users are directed if they reach a broken url
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function NotFoundPage() {
    const classes = useStyles();
    return (
        <>
            <Typography
                variant={"h3"}
                component={"h2"}
                align={"center"}
                className={classes.root}
            >
                404 - Page not found :(
            </Typography>
        </>

    );
}
