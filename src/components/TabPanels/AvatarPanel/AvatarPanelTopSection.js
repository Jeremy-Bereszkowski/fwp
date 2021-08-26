import React from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    makeStyles,
    Typography
} from "@material-ui/core";

import AvatarDisplayCard from "../../Cards/AvatarDisplayCard";

import {avatarColors} from "./AvatarPanel";

const useStyles = makeStyles(theme => ({
    cardContainer: {
        margin: theme.spacing(2, 0),
        display: "flex",
        justifyContent: "center",
    },
}));

export default function AvatarPanelTopSection({onClick}) {
    const classes = useStyles();
    return (
        <>
            <Typography
                variant={"h4"}
                component={"p"}
                color={"textSecondary"}
            >
                Colour:
            </Typography>
            <Grid container>
                {avatarColors.map(ele => (
                    <Grid item md={4} xs={4} key={ele.label}>
                        <div className={classes.cardContainer}>
                            <AvatarDisplayCard
                                onClick={() => onClick(ele)}
                                color={ele.colorCode}
                                label={ele.label}
                            />
                        </div>
                    </Grid>
                ))}
            </Grid>
        </>
    );
}

AvatarPanelTopSection.propTypes = {
    onClick: PropTypes.func.isRequired,
};