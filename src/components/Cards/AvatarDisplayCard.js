import React from 'react';
import clsx from "clsx";
import PropTypes from 'prop-types';

import {
    Card,
    makeStyles,
    Typography
} from "@material-ui/core";

import ColorAvatar from "../Avatar/ColorAvatar";
import ProfilePictureAvatar from "../Avatar/ProfilePictureAvatar";
import {useAuth} from "../Providers/AuthProvider";

const useStyles = makeStyles(theme => ({
    avatarCard: {
        width: "100px",
        height: "120px",
        padding: theme.spacing(1),
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        cursor: "pointer",
        "@media (hover: hover)": {
            transition: "all .15s ease-in-out",
            "&:hover": {
                transform: "scale(1.1)",
            }
        }
    },
    primaryType: {
        color: theme.palette.type === "dark" ? theme.palette.primary.light : theme.palette.primary.main
    },
    secondaryType: {
        color: theme.palette.type === "dark" ? theme.palette.secondary.light : theme.palette.secondary.main
    },
    errorType: {
        color: theme.palette.type === "dark" ? theme.palette.error.light : theme.palette.error.main
    },
    infoType: {
        color: theme.palette.type === "dark" ? theme.palette.info.light : theme.palette.info.main
    },
    warningType: {
        color: theme.palette.type === "dark" ? theme.palette.warning.light : theme.palette.warning.main
    },
    successType: {
        color: theme.palette.type === "dark" ? theme.palette.success.light : theme.palette.success.main
    },
    selected: {
        border: `3px solid ${theme.palette.primary.light}`,
    },
    avatarContainer: {
        marginBottom: theme.spacing(2)
    },
}));

export default function AvatarDisplayCard(props) {
    const {onClick, color, label} = props
    const {currentUser} = useAuth();
    const classes = useStyles();

    const cardClasses = clsx({
        [classes.avatarCard]: true,
        [classes.selected]: color === currentUser.avatar.color.colorCode || (currentUser.avatar.selected === "url" && color === ""),
    })

    const typeClasses = clsx({
        [classes[`${color}Type`]]: color
    })

    return (
        <Card className={cardClasses} elevation={2} onClick={onClick}>
            <div className={classes.avatarContainer}>
                {color ? (
                    <ColorAvatar color={color}/>
                ) : (
                    <ProfilePictureAvatar/>
                )}
            </div>
            <Typography
                align={"center"}
                variant={"subtitle1"}
                component={"p"}
                className={typeClasses}
            >
                {label}
            </Typography>
        </Card>
    );
}

AvatarDisplayCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    color: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};