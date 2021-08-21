import React from 'react';
import { useHistory } from "react-router-dom";
import PropTypes from 'prop-types';

import {
    Dialog,
    makeStyles,
    Typography
} from "@material-ui/core";

import AuthForm from "../Form/AuthForm";
import {useAuth} from "../Providers/AuthProvider";
import {SIGN_UP_TYPE} from "../../layouts/DefaultLayout";
import {Urls} from "../../data/Urls";
import {useSnackbar} from "notistack";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
    },
}));

const DISPATCH_USER_SET = 'set'
const DISPATCH_USER_RESET = 'reset'

function inputDataMap(firstName, lastName, email, password, passwordConfirm) {
    return {
        firstName: firstName ?? '',
        lastName: lastName ?? '',
        email: email ?? '',
        password: password ?? '',
        passwordConfirm: passwordConfirm ?? '',
    }
}

function inputDataReducer(userInputData, action) {
    switch (action.type) {
        case DISPATCH_USER_SET: return {...userInputData, [action.payload.field]: action.payload.value};
        case DISPATCH_USER_RESET: return inputDataMap();
        default: throw new Error();
    }
}

export const passwordChecks = [
    {regex: "^(?=.*[a-z])", errorMessage: "- Password must contain at least one lowercase character"},
    {regex: "^(?=.*[A-Z])", errorMessage: "- Password must contain at least one uppercase character"},
    {regex: "^(?=.*[0-9])", errorMessage: "- Password must contain at least one number"},
    {regex: "^(?=.*[^a-zA-Z0-9])", errorMessage: "- Password must contain at least one special character"},
    {regex: "^(?=.{6,})", errorMessage: "- Password must be at least 6 characters long"},
]

/**
 * Auth dialog
 *  Responsible for rendering sign in/sign up form components
 *
 * @param open
 * @param handleClose
 * @param headerLabel
 * @param type
 * @returns {JSX.Element}
 * @constructor
 */
export default function AuthDialog({open, handleClose, headerLabel, type}) {
    const classes = useStyles();
    const auth = useAuth()
    const history = useHistory()
    const {doesEmailExist} = useAuth()
    const { enqueueSnackbar } = useSnackbar();

    const [userInputData, dispatchUserInputData] = React.useReducer(inputDataReducer, inputDataMap());
    const [errorMessages, setErrorMessages] = React.useState([]);

    React.useEffect(() => {
        if (!open) {
            dispatchInputDataReset();
            handleErrorMessagesReset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])

    const dispatchInputDataSetEvent = (field, event) => dispatchUserInputData({type: DISPATCH_USER_SET, payload: {field: field, value: event.target.value}})
    const dispatchInputDataReset = () => dispatchUserInputData({type: DISPATCH_USER_RESET, payload: userInputData})

    const handleErrorMessagesSet = (errors) => setErrorMessages(errors);
    const handleErrorMessagesReset = () => setErrorMessages([]);


    const handleSubmit = (event) => {
        event.preventDefault()
        handleErrorMessagesReset();

        const {email, password, passwordConfirm} = userInputData

        if (type === SIGN_UP_TYPE) {
            if (doesEmailExist(email.trim())) {
                console.log("- Email already exists");
                return handleErrorMessagesSet(["- Email already exists"])
            }

            const errors = []
            passwordChecks.forEach(ele => {
                const regex =  new RegExp(ele.regex)
                if (!regex.test(password)) errors.push(ele.errorMessage)
            })
            if (password.trim() !== passwordConfirm.trim()) {
                errors.push("- Passwords do not match")
            }

            if (errors.length > 0) return handleErrorMessagesSet(errors)
        }

        if (type === SIGN_UP_TYPE) handleSignUp()
        else handleSignIn()
    }

    const handleSignUp = () => {
        const {firstName, lastName, email, password} = userInputData

        auth.signUp(firstName.trim(), lastName.trim(), email.trim(), password.trim())
        onClose()
        history.push(Urls.FEED)
        enqueueSnackbar('Account created, welcome!', { variant: 'success' });
    }

    const handleSignIn = () => {
        const {email, password} = userInputData

        const signIn = auth.signIn(email, password)

        if (signIn) {
            onClose()
            history.push(Urls.FEED)
        }
        else handleErrorMessagesSet(["- Sign in error, please try again"])
    }

    const onClose = () => {
        handleClose();
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth={"sm"}
            fullWidth={true}
        >
            <Typography
                variant={"h5"}
                component={"h2"}
                align={"center"}
                className={classes.paper}
            >
                {headerLabel}
            </Typography>
            <div className={classes.paper}>
                <AuthForm
                    type={type}
                    loading={false}
                    handleCancel={onClose}
                    handleSubmit={handleSubmit}
                    errorMessages={errorMessages}
                    user={{
                        value: userInputData,
                        onChange: dispatchInputDataSetEvent,
                    }}
                />
            </div>
        </Dialog>
    );
}

AuthDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    headerLabel: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        "SIGN_IN", "SIGN_UP",
    ]).isRequired,
};
