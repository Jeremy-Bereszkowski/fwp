import React from 'react';

import {Container, makeStyles} from "@material-ui/core";

import AppHeader from "../components/AppBar/AppHeader";
import AppFooter from "../components/Footer/AppFooter";
import AuthDialog from "../components/Dialog/AuthDialog";
import AppDrawer from "../components/AppDrawer/AppDrawer";
import {useAuth} from "../components/Providers/AuthProvider";

/* Auth modal type keys */
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

/* Auth modal type object */
function authDialog(type, open) {
    return {
        type: type ?? SIGN_UP_TYPE,
        open: open ?? false,
    }
}

/**
 * Renders global AppHeader, AppFooter and AuthDialog
 *
 * - Providers <main> wrapper around children
 * - AuthDialog only rendered when no user is logged in
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
export default function DefaultLayout({children}) {
    const classes = useStyles();
    const { currentUser } = useAuth()

    /* State variables*/
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const [dialog, setDialog] = React.useState(authDialog());

    /* State handlers */
    const handleDrawerOpen = (open) => setDrawerOpen(open);
    const handleDrawerClose = () => setDrawerOpen( false);

    const handleDialogOpen = (type) => setDialog(authDialog(type, true));
    const handleDialogClose = () => setDialog({...dialog, open: false});

    return (
        <>
            <AppHeader
                open={drawerOpen}
                handleDialogOpen={handleDialogOpen}
                handleMenuOpen={handleDrawerOpen}
                handleMenuClose={handleDrawerClose}
            />
            {currentUser && (
                <AppDrawer
                    open={drawerOpen}
                    handleClose={handleDrawerClose}
                />
            )}
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
