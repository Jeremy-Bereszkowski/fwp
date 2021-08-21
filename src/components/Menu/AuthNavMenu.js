import React from 'react';

import {
    Divider,
    IconButton,
    makeStyles,
    Menu,
    MenuItem, Typography
} from "@material-ui/core";

import {useAuth} from "../Provides/AuthProvider";
import {Link} from "react-router-dom";
import {Urls} from "../../data/Urls";
import UserAvatar from "../Avatar/UserAvatar";

const useStyles = makeStyles(theme => ({
    padding: {
        padding: "0",
    },
    link: {
        textDecoration: "none",
        color: "inherit",
    },
    avatar: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light,
        color: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.7)" : "white",
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.main,
        }
    },
    menuHeader: {
        margin: theme.spacing(0, 10, 2, 2)
    },
    menuSubHeader: {
        margin: theme.spacing(0, 10, 0, 2)
    }
}));

export default function AuthNavMenu({menuOpen, handleSetMenuOpen, handleSetMenuClose}) {
    const classes = useStyles();
    const auth = useAuth();

    return (
        <li>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleSetMenuOpen}
                color="inherit"
                className={classes.padding}
            >
                <UserAvatar onHoverEffect={true}/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={menuOpen}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: "right",
                }}
                open={Boolean(menuOpen)}
                onClose={handleSetMenuClose}
            >
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
                <Divider />
                <Link to={Urls.ACCOUNT} className={classes.link} title={"Account Link"}>
                    <MenuItem onClick={handleSetMenuClose}>My Account</MenuItem>
                </Link>
                <Divider />
                <Link to={Urls.FEED} className={classes.link} title={"Feed Link"}>
                    <MenuItem onClick={handleSetMenuClose}>Feed</MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={auth.signOut}>Sign out</MenuItem>
                <Divider />
            </Menu>
        </li>
    );
}
