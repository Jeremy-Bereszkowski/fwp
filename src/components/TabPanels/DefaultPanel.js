import React from 'react';
import {Typography} from "@material-ui/core";

export default function DefaultPanel({tabTitle, children}) {
    return (
        <>
            <Typography
                variant={"h6"}
                component={"h3"}
                gutterBottom
            >
                {tabTitle}
            </Typography>
            {children}
        </>
    );
}
