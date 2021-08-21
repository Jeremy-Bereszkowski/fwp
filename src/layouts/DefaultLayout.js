import React from 'react';

import {Container, makeStyles} from "@material-ui/core";

import AppHeader from "../components/AppBar/AppHeader";
import AppFooter from "../components/Footer/AppFooter";
import AuthDialog from "../components/Dialog/AuthDialog";

export const SIGN_IN_TYPE = "SIGN_IN";
export const SIGN_UP_TYPE = "SIGN_UP";

const useStyles = makeStyles(theme => ({
    main: {
        margin: theme.spacing(10, 0),
    },
    mainContainer: {
        paddingTop: "2vh",
        minHeight: `calc(100vh - 2vh - 5rem - 150px)`
    }
}))

function dialogMap(type, open) {
    return {
        type: type ?? SIGN_UP_TYPE,
        open: open ?? false,
    }
}

/**
 * Renders global AppHeader, AppFooter and AuthDialog
 *
 * Provides <main> wrapper around children
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function DefaultLayout({children}) {
    const classes = useStyles();

    const [dialog, setDialog] = React.useState(dialogMap());

    const handleDialogOpen = (type) => setDialog(dialogMap(type, true));
    const handleDialogClose = () => setDialog({...dialog, open: false});

    return (
        <>
            <AppHeader handleDialogOpen={handleDialogOpen}/>
            <main className={classes.main}>
                <Container maxWidth={"md"} className={classes.mainContainer}>
                    {children}
                </Container>
            </main>
            <AppFooter/>
            <AuthDialog
                open={dialog.open}
                handleClose={handleDialogClose}
                headerLabel={dialog.type === SIGN_IN_TYPE ? "Sign In" : "Sign Up"}
                type={dialog.type}
            />
        </>
    );
}
