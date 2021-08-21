import React from 'react';
import {useHistory} from "react-router-dom";
import {useSnackbar} from "notistack";

import {useAuth} from "../Provides/AuthProvider";
import {Urls} from "../../data/Urls";

import AccountDetailsForm from "../Form/AccountDetailsForm";
import DefaultPanel from "./DefaultPanel";

const DISPATCH_USER_SET = 'set'
const DISPATCH_USER_RESET = 'reset'

function init(currentUser) {
    return currentUser
}

function reducer(userData, action) {
    switch (action.type) {
        case DISPATCH_USER_SET: return {...userData, [action.payload.field]: action.payload.value};
        case DISPATCH_USER_RESET: return init(action.payload);
        default: throw new Error();
    }
}

export default function AccountDetailsPanel() {
    const { currentUser, updateUser } = useAuth()
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar();

    const [userData, dispatch] = React.useReducer(reducer, currentUser, init);

    const dispatchInputDataSetEvent = (field, event) => dispatch({type: DISPATCH_USER_SET, payload: {field: field, value: event.target.value}})
    const dispatchInputDataReset = () => dispatch({type: DISPATCH_USER_RESET, payload: currentUser})

    const onReset = () => dispatchInputDataReset()
    const onSubmit = (event) => {
        event.preventDefault()
        updateUser(userData);
        enqueueSnackbar('Details updated successfully!', { variant: 'success' });
    }

    const onChangePassword = () => {
        history.push(Urls.UPDATE_PASSWORD)
    }

    const signInFields = [
        {id: 'firstName', type: 'text', label: "First Name", labelWidth: 80, disabled: false, required: true},
        {id: 'lastName', type: 'text', label: "Last Name", labelWidth: 80, disabled: false, required: true},
        {id: 'email', type: 'email', label: "Email", labelWidth: 50, disabled: true, required: true},
        {id: 'password', type: 'password', label: "Password", labelWidth: 80, disabled: true, required: true},
    ]
    return (
        <DefaultPanel tabTitle={"Update your personal details"}>
            <AccountDetailsForm
                onSubmit={onSubmit}
                onReset={onReset}
                onChange={dispatchInputDataSetEvent}
                onChangePassword={onChangePassword}
                fields={signInFields}
                userData={userData}
            />
        </DefaultPanel>
    );
}
