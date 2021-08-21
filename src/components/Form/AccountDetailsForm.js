import React from 'react';
import PropTypes from 'prop-types';

import {
    Grid,
    makeStyles, useTheme
} from "@material-ui/core";

import OutlinedInputWithLabel from "../Inputs/OutlinedInputWithLabel";
import CustomButton from "../Button/CustomButton";
import FormButtonGroup from "../ButtonGroup/FormButtonGroup";

const useStyles = makeStyles((theme) => ({
    buttonGroup: {
        margin: `${theme.spacing(5, 0, 0, 0)}!important`,
        [theme.breakpoints.down("xs")]: {
            margin: `${theme.spacing(3, 0, 0, 0)}!important`,
        }
    },
}));

export default function AccountDetailsForm(props) {
    const {onSubmit, onReset, onChange, onChangePassword, fields, userData} = props
    const theme = useTheme();
    const classes = useStyles();
    return (
        <form onSubmit={onSubmit}>
            <Grid
                container
                justifyContent={"space-between"}
            >
                {fields.map(ele => (
                    <Grid item md={5} sm={5} xs={12} key={ele.id}>
                        <OutlinedInputWithLabel
                            id={ele.id}
                            type={ele.type}
                            value={userData[ele.id]}
                            onChange={(event) => onChange(ele.id, event)}
                            label={ele.label}
                            labelWidth={ele.labelWidth}
                            disabled={ele.disabled}
                            required={ele.required}
                            endAdornment={ele.id === "password" && (
                                <CustomButton
                                    color={"secondary"}
                                    variant={"outlined"}
                                    onClick={onChangePassword}
                                    whiteText={theme.palette.type === "dark"}
                                >
                                    Change
                                </CustomButton>
                            )}
                        />
                    </Grid>
                ))}
            </Grid>
            <FormButtonGroup
                loading={false}
                rootClass={classes.buttonGroup}
                leftButton={{
                    label: 'Reset Details',
                    color: "primary",
                    variant: "outlined",
                    onClick: onReset
                }}
                rightButton={{
                    label: 'Update Details',
                    color: "primary",
                    variant: "contained",
                }}
            />
        </form>
    );
}

AccountDetailsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangePassword: PropTypes.func.isRequired,
    fields: PropTypes.array.isRequired,
    userData: PropTypes.object.isRequired
};