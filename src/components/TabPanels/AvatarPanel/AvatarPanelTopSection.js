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
        justifyContent: "flex-end",
    },
}));

export default function AvatarPanelTopSection({onClick}) {
    const classes = useStyles();
    return (
        <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
        >
            <Grid item md={3}>
                <Typography
                    variant={"h4"}
                    component={"p"}
                    color={"textSecondary"}
                >
                    Colour:
                </Typography>
            </Grid>
            <Grid item md={8}>
                <Grid container>
                    {avatarColors.map(ele => (
                        <Grid item md={4} xs={6} key={ele.label}>
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
            </Grid>
        </Grid>
    );
}

AvatarPanelTopSection.propTypes = {
    onClick: PropTypes.func.isRequired,
};