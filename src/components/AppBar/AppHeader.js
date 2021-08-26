import React from 'react';
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types';

import {
    AppBar,
    Grid,
    Toolbar,
    Typography,
    makeStyles,
    Link,
    Avatar,
    useMediaQuery,
    useTheme, ClickAwayListener,
} from "@material-ui/core";

import AuthButtonGroup from "../ButtonGroup/AuthButtonGroup";
import AuthNavMenu from "../Menu/AuthNavMenu";

import {Urls} from "../../data/Urls";
import {useAuth} from "../Providers/AuthProvider";
import CustomButton from "../Button/CustomButton";

const image = "/vibe-check-logo.png"

const useStyles = makeStyles(theme => ({
    header: {
        color: theme.palette.common.white,
    },
    button: {
        margin: theme.spacing(0, 0, 0, 1)
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    feedButtonContainer: {
        marginRight: theme.spacing(2),
    },
    navBar: {
        padding: 0,
        margin: 0,
        listStyle: "none"
    },
    logo: {
        marginRight: theme.spacing(1)
    }
}));

/**
 * Global app header
 *
 * @param handleDialogOpen
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppHeader({open, handleDialogOpen, handleMenuOpen, handleMenuClose}) {
    const classes = useStyles();
    const {currentUser} = useAuth()
    const history = useHistory();
    const theme = useTheme();
    const isXsDown = !useMediaQuery(theme.breakpoints.down("xs"));

    const handleSetMenuOpen = (event) => handleMenuOpen(event.currentTarget);
    const handleSetMenuClose = () => handleMenuClose(null);

    const handleSetMenuToggle = (event) => open ? handleSetMenuClose() : handleSetMenuOpen(event);

    return (
        <AppBar>
            <Toolbar component={"nav"}>
                <Grid
                    container
                    component={"ul"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    className={classes.navBar}
                >
                    <Grid item>
                        <Link
                            href={Urls.ROOT}
                            className={classes.header}
                        >
                            <Toolbar disableGutters>
                                <Avatar src={image} className={classes.logo}/>
                                <Typography
                                    variant={"h6"}
                                    component={"li"}
                                >
                                    Vibe Check
                                </Typography>
                            </Toolbar>
                        </Link>
                    </Grid>
                    <Grid item>
                        <Grid
                            container
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            {currentUser && isXsDown && (
                                <Grid item component={"li"} className={classes.feedButtonContainer}>
                                    <CustomButton
                                        whiteText
                                        color={"secondary"}
                                        variant={"outlined"}
                                        onClick={() => history.push(Urls.FEED)}
                                    >
                                        Feed
                                    </CustomButton>
                                </Grid>
                            )}
                            <Grid item>
                                <ClickAwayListener onClickAway={handleSetMenuClose}>
                                    <div>
                                        {!currentUser ? (
                                            <AuthButtonGroup handleDialogOpen={handleDialogOpen}/>
                                        ) : (
                                            <AuthNavMenu
                                                open={open}
                                                handleOpenToggle={handleSetMenuToggle}
                                                handleOpenClose={handleSetMenuClose}
                                            />
                                        )}
                                    </div>
                                </ClickAwayListener>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

AppHeader.propTypes = {
    handleMenuOpen: PropTypes.func.isRequired,
    handleMenuClose: PropTypes.func.isRequired,
    handleDialogOpen: PropTypes.func.isRequired,
    open: PropTypes.oneOfType([
        PropTypes.bool, PropTypes.object,
    ]).isRequired,
};
