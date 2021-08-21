import React from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    makeStyles
} from "@material-ui/core";

import CustomButton from "../Button/CustomButton";

import {SIGN_IN_TYPE, SIGN_UP_TYPE} from "../../layouts/DefaultLayout";

const useStyles = makeStyles(theme => ({
    buttonWrapper: {
        marginLeft: theme.spacing(1)
    },
}))

export default function AuthButtonGroup({handleDialogOpen}) {
    const classes = useStyles();

    const buttons = [
        {color: "secondary", variant: "contained", whiteText: false, type: SIGN_IN_TYPE, label: "Sign In"},
        {color: "secondary", variant: "outlined", whiteText: true, type: SIGN_UP_TYPE, label: "Sign Up"},
    ]
    return (
        <Grid container>
            {buttons.map(ele => (
                <Grid item className={classes.buttonWrapper} key={ele.label} component={"li"}>
                    <CustomButton
                        color={ele.color}
                        whiteText={ele.whiteText}
                        variant={ele.variant}
                        onClick={() => handleDialogOpen(ele.type)}
                    >
                        {ele.label}
                    </CustomButton>
                </Grid>
            ))}
        </Grid>
    )
}

AuthButtonGroup.propTypes = {
    handleDialogOpen: PropTypes.func.isRequired
};