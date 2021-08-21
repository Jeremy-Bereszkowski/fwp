import React, {useState} from 'react';

import {Avatar} from "@material-ui/core";

import {useAuth} from "../Providers/AuthProvider";

export default function ProfilePictureAvatar() {
    const {currentUser, getAvatarUrlBlob, getCurrentUserAvatar } = useAuth();

    const [src, setSrc] = useState( '')

    const handleSrcSet = (src) => setSrc(src)

    React.useEffect(() => {
        const avatar = getCurrentUserAvatar()
        getAvatarUrlBlob(avatar)
            ?.then(url => handleSrcSet(url))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser])

    return (
        <Avatar src={src}/>
    );
}
