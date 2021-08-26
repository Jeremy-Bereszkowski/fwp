import React from 'react';
import PropTypes from 'prop-types';

import {
    Hidden,
    IconButton,
    makeStyles,
    Popper,
} from "@material-ui/core";

import UserAvatar from "../Avatar/UserAvatar";
import NavList from "../List/NavList";

const useStyles = makeStyles(theme => ({
    padding: {
        padding: "0",
    },
    popper: {
        backgroundColor: theme.palette.background.paper,
        zIndex: 1200,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[16],
    }
}));

export default function AuthNavMenu({open, handleOpenToggle}) {
    const classes = useStyles();
    return (
        <li>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenToggle}
                color="inherit"
                className={classes.padding}
            >
                <UserAvatar onHoverEffect={true}/>
            </IconButton>
            <Hidden only={["xs"]}>
                    <Popper
                        open={Boolean(open)}
                        anchorEl={open}
                        className={classes.popper}
                        placement={"bottom-end"}
                    >
                        <NavList onClose={handleOpenToggle}/>
                    </Popper>
            </Hidden>
        </li>
    );
}

AuthNavMenu.propTypes = {
    handleOpenToggle: PropTypes.func.isRequired,
    open: PropTypes.oneOfType([
        PropTypes.bool, PropTypes.object,
    ]).isRequired,
};
