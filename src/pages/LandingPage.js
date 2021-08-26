import React from 'react';

import {
    makeStyles,
    Typography,
    useTheme
} from "@material-ui/core";

const logoLight = "/vibe-check-light.png"
const logoDark = "/vibe-check-dark.png"

const useStyles = makeStyles(theme => ({
    image: {
        display: "block",
        margin: theme.spacing(2, "auto"),
    }
}))

/**
 * Landing page
 *  Public page which users first arrive at
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function LandingPage() {
    const classes = useStyles()
    const theme = useTheme()
    return (
        <>
            <Typography
                variant={"h2"}
                component={"h2"}
                gutterBottom
            >
                Welcome to Vibe Check!
            </Typography>
            <Typography
                variant={"h6"}
                color={"textSecondary"}
                gutterBottom
            >
                Vibe Check (VC for short) is an online social media platform intended specifically for RMIT students. Designed to help students better communicate and share information, we are putting the you back in to you-niversity.
            </Typography>
            <img
                src={theme.palette.type === "dark" ? logoDark : logoLight}
                alt={"Vibe Check Logo"}
                height={200}
                width={200}
                className={classes.image}
            />
            <Typography
                variant={"h6"}
                color={"textSecondary"}
                gutterBottom
            >
                Please sign in or create an account to begin connecting with your peers.
            </Typography>
        </>
    );
}