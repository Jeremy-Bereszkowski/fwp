import React from "react"
import { SnackbarProvider } from 'notistack';

import {
    unstable_createMuiStrictModeTheme as createMuiTheme,
    CssBaseline,
    responsiveFontSizes,
    useMediaQuery,
    ThemeProvider,
} from "@material-ui/core";

import {AuthProvider} from "./components/Provides/AuthProvider";
import {PostProvider} from "./components/Provides/PostProvider";
import MainRouter from "./components/Router/MainRouter";

/**
 * Entrypoint in to application
 *
 * Provider List:
 *  AuthProvider - provides user state storage and management - useAuth()
 *  PostProvider - provides post state storage and management - usePost()
 *  ThemeProvider - provides theme access - dark mode tied to user system - useTheme()
 *  SnackBarProvider - provides ability to enqueue customisable snackBars - useSnackbar()
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function App() {
    /* Custom global theme */
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = React.useMemo( () => responsiveFontSizes(createMuiTheme({
        palette: {
            type: prefersDarkMode ? 'dark' : 'light',
            primary: {
                main: "#445775",
            },
            secondary: {
                main: "#347378",
            },
        },
        drawer: {
            width: 240,
        },
        spacing: factor => `${0.5 * factor}rem`,
    })), [prefersDarkMode]);

    return (
        <AuthProvider>
            <PostProvider>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: "top", horizontal: "center"}}>
                        <CssBaseline/>
                        <MainRouter/>
                    </SnackbarProvider>
                </ThemeProvider>
            </PostProvider>
        </AuthProvider>
    );
}
