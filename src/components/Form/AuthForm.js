import React from 'react';
import PropTypes from 'prop-types';

import {
    makeStyles, Typography
} from "@material-ui/core";

import OutlinedInputWithLabel from "../Inputs/OutlinedInputWithLabel";
import FormButtonGroup from "../ButtonGroup/FormButtonGroup";

import {SIGN_UP_TYPE} from "../../layouts/DefaultLayout";

const useStyles = makeStyles(theme => ({
    line: {
        width: "90%",
        marginLeft: `0`,
        marginRight: `10%`,
        marginTop: theme.spacing(3),
        borderColor: theme.palette.divider,
    },
    formRow: {
        marginTop: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginLeft: `auto`,
            marginRight: `auto`,
        },
        [theme.breakpoints.up('md')]: {
            width: '80%',
        },
    },
    sectionSpaceNoErrors: {
        marginTop: theme.spacing(12),
    },
    sectionSpaceWithErrors: {
        marginTop: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            width: '100%!important',
        },
        [theme.breakpoints.up('md')]: {
            width: '80%!important',
        },
    },
}));

/**
 * Auth form renders sign in/up fields
 *
 * @param handleSubmit
 * @param loading
 * @param handleCancel
 * @param user
 * @param type
 * @param errorMessages
 * @returns {JSX.Element}
 * @constructor
 */
export default function AuthForm({handleSubmit, loading, handleCancel, user, type, errorMessages}) {
    const classes = useStyles();

    const signInFields = [
        {id: 'email', type: 'email', label: "Email", labelWidth: 40, disabled: false, required: true},
        {id: 'password', type: 'password', label: "Password", labelWidth: 70, disabled: false, required: true},
    ]
    const signUpFields = [
        {id: 'firstName', type: 'text', label: "First Name", labelWidth: 80, disabled: false, required: true},
        {id: 'lastName', type: 'text', label: "Last Name", labelWidth: 80, disabled: false, required: true},
        ...signInFields,
        {id: 'passwordConfirm', type: 'password', label: "Password Confirm", labelWidth: 135, disabled: false, required: true},
    ]
    const inputFields = type === SIGN_UP_TYPE ? signUpFields : signInFields

    return (
        <form onSubmit={handleSubmit}>
            {inputFields.map(ele => (
                <OutlinedInputWithLabel
                    key={ele.id}
                    id={ele.id}
                    type={ele.type}
                    value={user.value[ele.id]}
                    onChange={(event) => user.onChange(ele.id, event)}
                    label={ele.label}
                    labelWidth={ele.labelWidth}
                    disabled={ele.disabled}
                    required={ele.required}
                />
            ))}
            {errorMessages?.length > 0 && (
                <div className={classes.sectionSpaceWithErrors}/>
            )}
            {errorMessages?.map(ele => (
                <Typography
                    key={ele}
                    variant={"body1"}
                    color={"error"}
                >
                    {ele}
                </Typography>
            ))}
            <FormButtonGroup
                loading={loading}
                rootClass={errorMessages?.length > 0 ? classes.sectionSpaceWithErrors : classes.sectionSpaceNoErrors}
                leftButton={{
                    label: 'Cancel',
                    color: "primary",
                    variant: "outlined",
                    onClick: handleCancel
                }}
                rightButton={{
                    label: type === SIGN_UP_TYPE ? 'Sign Up' : 'Sign In',
                    color: "primary",
                    variant: "contained",
                }}
            />
        </form>
    );
}

AuthForm.propTypes = {
    handleCancel: PropTypes.func.isRequired,
    user: PropTypes.shape({
        value: PropTypes.object.isRequired,
        onChange: PropTypes.func.isRequired,
    }).isRequired,
    type: PropTypes.oneOf([
        "SIGN_IN", "SIGN_UP",
    ]).isRequired,
    errorMessages: PropTypes.array,
};
