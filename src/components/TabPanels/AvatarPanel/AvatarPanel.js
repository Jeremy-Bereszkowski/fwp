import React from 'react';

import {
    Divider,
    makeStyles,
} from "@material-ui/core";

import DefaultPanel from "../DefaultPanel";
import AvatarPanelTopSection from "./AvatarPanelTopSection";
import AvatarPanelBottomSection from "./AvatarPanelBottomSection";
import {avatarMap, useAuth} from "../../Provides/AuthProvider";

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

export default function AvatarPanel() {
    const classes = useStyles()
    const {getCurrentUserAvatar, setCurrentUserAvatar} = useAuth()
    const userAvatar = getCurrentUserAvatar()

    const onUpdateAvatarColor = (color) => {
        setCurrentUserAvatar(avatarMap("color", userAvatar.url, color));
    }
    const onUpdateAvatarUrl = () => {
        setCurrentUserAvatar(avatarMap("url", userAvatar.url, ""));
    }

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
