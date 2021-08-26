import React from 'react';
import PropTypes from 'prop-types'

import {useAuth} from "../Providers/AuthProvider";
import ColorAvatar from "./ColorAvatar";
import ProfilePictureAvatar from "./ProfilePictureAvatar";

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
    const { currentUser } = useAuth();
    const mAvatar = avatar ?? currentUser?.avatar

    return (
        <>
            {mAvatar.selected === "color" ? (
                <ColorAvatar
                    initials={initials}
                    color={mAvatar.color.colorCode}
                    onHoverEffect={onHoverEffect}
                />
            ) : (
                <ProfilePictureAvatar
                    avatar={avatar}
                />
            )}
        </>
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
