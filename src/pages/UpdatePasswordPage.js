import React from 'react';
import {useHistory} from "react-router-dom"
import { useSnackbar } from 'notistack';

import {
    makeStyles,
    Grid,
    Typography,
} from "@material-ui/core";

import DefaultLayout from "../layouts/DefaultLayout";

import {useAuth} from "../components/Providers/AuthProvider";
import OutlinedInputWithLabel from "../components/Inputs/OutlinedInputWithLabel";
import FormButtonGroup from "../components/ButtonGroup/FormButtonGroup";

import {Urls} from "../data/Urls";
import {passwordChecks} from "../components/Dialog/AuthDialog";

const useStyles = makeStyles((theme) => ({
    buttonGroup: {
        margin: `${theme.spacing(5, 0, 0, 0)}!important`,
        [theme.breakpoints.down("xs")]: {
            margin: `${theme.spacing(3, 0, 0, 0)}!important`,
        }
    },
    sectionSpaceWithErrors: {
        minHeight: theme.spacing(1)
    }
}));

/**
 * Update password page
 *  Private page where signed in users can update their password
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function UpdatePasswordPage() {
    const { currentUser, updateUserPassword } = useAuth()
    const history = useHistory()
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    /* Form field data */
    const fields = [
        {id: 'old_password', type: 'password', label: "Old Password", labelWidth: 100, required: true},
        {id: 'new_password', type: 'password', label: "New Password", labelWidth: 110, required: true},
        {id: 'new_password_confirm', type: 'password', label: "New Password Confirm", labelWidth: 170, required: true},
    ]

    /* State variables */
    const [inputs, setInputs] = React.useState({
        old_password: '',
        new_password: '',
        new_password_confirm: '',
    });
    const [errorMessages, setErrorMessages] = React.useState([]);

    /* State handlers */
    const handleErrorMessagesSet = (errors) => setErrorMessages(errors);
    const handleErrorMessagesReset = () => setErrorMessages([]);

    const inputDataSet = (event, field) => setInputs({ ...inputs, [field]: event.target.value})

    /* Event handlers */
    const onCancel = () => history.push(Urls.ACCOUNT)
    const onSubmit = (event) => {
        event.preventDefault()
        handleErrorMessagesReset()

        const errors = []
        passwordChecks.forEach(ele => {
            const regex =  new RegExp(ele.regex)
            if (!regex.test(inputs.new_password)) errors.push(ele.errorMessage)
        })
        if (currentUser.password !== inputs.old_password) {
            errors.push("- Current password is incorrect")
        }
        if (inputs.old_password === inputs.new_password) {
            errors.push("- New password can't match old password")
        }
        if (inputs.new_password !== inputs.new_password_confirm) {
            errors.push("- New passwords don't match");
        }

        if (errors.length > 0) return handleErrorMessagesSet(errors)

        updateUserPassword(inputs.new_password);
        enqueueSnackbar('Password updated', { variant: 'success' });
        history.push(Urls.ACCOUNT)
    }

    return (
        <DefaultLayout>
            <Typography
                variant={"h6"}
                component={"h3"}
                align={"left"}
            >
                Update Password
            </Typography>
            <form onSubmit={onSubmit}>
                <Grid
                    container
                    justifyContent={"center"}
                >
                    {fields.map(ele => (
                        <Grid item md={7} sm={10} xs={12} key={ele.id}>
                            <OutlinedInputWithLabel
                                id={ele.id}
                                type={ele.type}
                                value={inputs[ele.id]}
                                onChange={(event) => inputDataSet(event, ele.id)}
                                label={ele.label}
                                labelWidth={ele.labelWidth}
                                required={ele.required}
                                disabled={false}
                            />
                        </Grid>
                    ))}
                    {errorMessages?.length > 0 && (
                        <Grid item md={7} sm={10} xs={12}>
                            <div className={classes.sectionSpaceWithErrors}/>
                        </Grid>
                    )}
                    {errorMessages?.map(ele => (
                        <Grid item md={7} sm={10} xs={12} key={ele}>
                            <Typography
                                key={ele}
                                variant={"body1"}
                                color={"error"}
                            >
                                {ele}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                <FormButtonGroup
                    loading={false}
                    rootClass={classes.buttonGroup}
                    leftButton={{
                        label: 'Cancel',
                        color: "primary",
                        variant: "outlined",
                        onClick: onCancel
                    }}
                    rightButton={{
                        label: 'Update',
                        color: "primary",
                        variant: "contained",
                    }}
                />
            </form>

        </DefaultLayout>
    );
}