import React, {useState} from 'react';
import PropTypes from "prop-types";

import {Avatar} from "@material-ui/core";

import {useAuth} from "../Providers/AuthProvider";

export default function ProfilePictureAvatar(props) {
    const {avatar} = props
    const {currentUser, getUserAvatarUrlBlob } = useAuth();

    const [src, setSrc] = useState( '')

    const handleSrcSet = (src) => setSrc(src)

    React.useEffect(() => {
        getUserAvatarUrlBlob(avatar ?? currentUser.avatar)
            ?.then(url => handleSrcSet(url))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser.avatar.url])

    return (
        <Avatar src={src}/>
    );
}

ProfilePictureAvatar.propTypes = {
    avatar: PropTypes.object
};
