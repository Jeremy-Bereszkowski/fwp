import React from 'react';

import {
    Container,
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    footerSpacer: {
        minHeight: theme.spacing(6)
    },
    footer: {
        padding: theme.spacing(3, 0),
        backgroundColor: theme.palette.type === "light" ? theme.palette.grey["300"] : theme.palette.grey["800"],
    }
}))

/**
 * Global app footer
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppFooter() {
    const classes = useStyles()
    return (
        <footer className={classes.footer}>
            <Container maxWidth={"md"}>
                <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"space-between"}
                >
                    <Grid item>
                        <Typography
                            variant={"body1"}
                            component={"p"}
                            color={"textPrimary"}
                        >
                            Vibe Check
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography
                            variant={"body2"}
                            component={"p"}
                            color={"textPrimary"}
                            align={"right"}
                            gutterBottom
                        >
                            RMIT University
                        </Typography>
                        <Typography
                            variant={"body2"}
                            component={"p"}
                            color={"textPrimary"}
                            align={"right"}
                        >
                            Melbourne, Australia
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </footer>
    );
}
