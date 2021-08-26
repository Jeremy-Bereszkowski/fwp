import React from 'react';
import PropTypes from 'prop-types'
import {Avatar, makeStyles} from "@material-ui/core";

import {useAuth} from "../Providers/AuthProvider";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    avatar: {
        color: theme.palette.type === 'dark' ? "rgba(255, 255, 255, 0.7)" : "white",
    },
    primary: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
    },
    secondary: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.light,
    },
    info: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.info.main : theme.palette.info.light,
    },
    warning: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.warning.main : theme.palette.warning.light,
    },
    error: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.error.main : theme.palette.error.light,
    },
    success: {
        backgroundColor: theme.palette.type === 'dark' ? theme.palette.success.main : theme.palette.success.light,
    },
    primaryHover: {
        border: `1px solid ${theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main}`,
        "&:hover": {
            border: `1px solid ${theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.light}`,
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main,
        }
    },
    secondaryHover: {
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.secondary.dark : theme.palette.secondary.main,
        }
    },
    infoHover: {
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.info.dark : theme.palette.info.main,
        }
    },
    warningHover: {
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.warning.dark : theme.palette.warning.main,
        }
    },
    errorHover: {
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.error.dark : theme.palette.error.main,
        }
    },
    successHover: {
        "&:hover": {
            backgroundColor: theme.palette.type === 'dark' ? theme.palette.success.dark : theme.palette.success.main,
        }
    },
}));

export default function ColorAvatar({color, initials, onHoverEffect}) {
    const classes = useStyles();
    const { getCurrentUserInitials } = useAuth();

    const avatarClasses = clsx({
        [classes.avatar]: true,
        [classes[color]]: color,
        [classes[`${color}Hover`]]: onHoverEffect,
    });

    return (
        <Avatar className={avatarClasses}>
            {initials ?? getCurrentUserInitials()}
        </Avatar>
    );
}

ColorAvatar.defaultProps = {
    color: "secondary",
    onHoverEffect: false
};

ColorAvatar.propTypes = {
    initials: PropTypes.string,
    onHoverEffect: PropTypes.bool,
    color: PropTypes.oneOf([
        "primary", "secondary", "warning", "error", "info", "success"
    ]).isRequired
};
