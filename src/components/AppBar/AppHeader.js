import React from 'react';
import {useHistory} from "react-router-dom";
import PropTypes from 'prop-types';

import {
    AppBar,
    Grid,
    Toolbar,
    Typography,
    makeStyles,
    Link, Avatar,
} from "@material-ui/core";

import AuthButtonGroup from "../ButtonGroup/AuthButtonGroup";
import AuthNavMenu from "../Menu/AuthNavMenu";

import {Urls} from "../../data/Urls";
import {useAuth} from "../Provides/AuthProvider";
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
export default function AppHeader({handleDialogOpen}) {
    const classes = useStyles();
    const auth = useAuth()
    const history = useHistory();

    const [menuOpen, setMenuOpen] = React.useState(null)

    const handleSetMenuOpen = (event) => setMenuOpen(event.currentTarget);
    const handleSetMenuClose = () => setMenuOpen(null);

    React.useEffect(() => {
        handleSetMenuClose()
    }, [auth.currentUser])

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
                            {auth.currentUser && (
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
                                {!auth.currentUser ? (
                                    <AuthButtonGroup handleDialogOpen={handleDialogOpen}/>
                                ) : (
                                    <AuthNavMenu
                                        menuOpen={menuOpen}
                                        handleSetMenuOpen={handleSetMenuOpen}
                                        handleSetMenuClose={handleSetMenuClose}
                                    />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

AppHeader.propTypes = {
    handleDialogOpen: PropTypes.func.isRequired,
};
