import React, {useState} from 'react';
import PropTypes from 'prop-types'
import {Avatar, makeStyles} from "@material-ui/core";

import {useAuth} from "../Provides/AuthProvider";
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

/**
 * User avatar for displaying avatar color initals or profile pic
 * If no user prop will use current user
 *
 * @param avatar
 * @param initials
 * @param onHoverEffect
 * @returns {JSX.Element}
 * @constructor
 */
export default function UserAvatar({avatar, initials, onHoverEffect}) {
    const classes = useStyles();
    const {getCurrentUserAvatar, currentUser, getCurrentUserInitials, getAvatarUrlBlob } = useAuth();
    const mAvatar = avatar ?? getCurrentUserAvatar()

    const [src, setSrc] = useState( '')

    const handleSrcSet = (src) => setSrc(src)
    const handleSrcReset = () => setSrc('')

    React.useEffect(() => {
        if (mAvatar?.selected === "url") {
            getAvatarUrlBlob(mAvatar)
                ?.then(url => handleSrcSet(url))
        } else {
            handleSrcReset()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    const avatarColor = mAvatar?.color?.colorCode
    const avatarString = initials ? initials : getCurrentUserInitials()

    const avatarClasses = clsx({
        [classes.avatar]: true,
        [classes[avatarColor]]: avatarColor,
        [classes[`${avatarColor}Hover`]]: onHoverEffect,
    });

    return (
        <Avatar className={avatarClasses} src={src}>
            {avatarString}
        </Avatar>
    );
}

UserAvatar.defaultProps = {
    color: "secondary",
    onHoverEffect: false
};

UserAvatar.propTypes = {
    initals: PropTypes.string,
    onHoverEffect: PropTypes.bool,
    color: PropTypes.oneOf([
        "primary", "secondary", "warning", "error", "info", "success"
    ])
};
