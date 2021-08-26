import React from 'react'
import PropTypes from 'prop-types'
import clsx from "clsx";

import {
    makeStyles,
    Hidden,
    Drawer
} from "@material-ui/core";

import NavList from "../List/NavList";

const useStyles = makeStyles(theme => ({
    toolbar: {
        ...theme.mixins.toolbar,
    },
    drawer: {
        width: theme.drawer.width,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: theme.drawer.width,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
}))

export default function AppDrawer(props) {
    const {open, handleClose} = props;
    const classes = useStyles();

    const drawerClasses = {
        paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
        }),
    };
    const drawerClassNames = clsx({
        [classes.drawer]: true,
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
    });

    return (
        <Hidden only={["sm", "md", "lg", "xl"]}>
            <Drawer
                open={Boolean(open)}
                anchor={"right"}
                className={drawerClassNames}
                classes={drawerClasses}
                onClose={handleClose}
            >
                <div className={classes.toolbar}/>
                <NavList onClose={handleClose}/>
            </Drawer>
        </Hidden>
    )
}

AppDrawer.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.oneOfType([
        PropTypes.bool, PropTypes.object,
    ]).isRequired,
}
