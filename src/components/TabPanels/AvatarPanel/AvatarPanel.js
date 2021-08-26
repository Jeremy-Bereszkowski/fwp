import React from 'react';

import {
    Divider,
    makeStyles,
} from "@material-ui/core";

import DefaultPanel from "../DefaultPanel";
import AvatarPanelTopSection from "./AvatarPanelTopSection";
import AvatarPanelBottomSection from "./AvatarPanelBottomSection";
import {avatarObject, useAuth} from "../../Providers/AuthProvider";

const useStyles = makeStyles(theme => ({
    divider: {
        margin: theme.spacing(2, 0)
    },
}));

export const avatarColors = [
    {label: "Denim", colorCode: "primary"},
    {label: "Turquoise", colorCode: "secondary"},
    {label: "Blue", colorCode: "info"},
    {label: "Orange", colorCode: "warning"},
    {label: "Red", colorCode: "error"},
    {label: "Green", colorCode: "success"},
];

/**
 * Panel for selecting user avatar
 *  - Upper panel displays avatar colors
 *  - Lower panel allows users to upload a profile picture
 *    for an avatar
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function AvatarPanel() {
    const classes = useStyles()
    const {currentUser, updateCurrentUserAvatar} = useAuth()
    const userAvatarUrl = currentUser.avatar.url

    /* Event handlers */
    const onUpdateAvatarColor = (color) => updateCurrentUserAvatar(avatarObject("color", userAvatarUrl, color));
    const onUpdateAvatarUrl = () => updateCurrentUserAvatar(avatarObject("url", userAvatarUrl, ""));

    return (
        <DefaultPanel tabTitle={"Choose your avatar"}>
            <AvatarPanelTopSection
                onClick={onUpdateAvatarColor}
            />
            <Divider className={classes.divider}/>
            <AvatarPanelBottomSection
                onClick={onUpdateAvatarUrl}
            />
        </DefaultPanel>
    );
}
