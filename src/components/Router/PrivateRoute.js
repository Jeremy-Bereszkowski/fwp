import React from 'react'
import {Redirect, Route} from "react-router-dom";

import {Urls} from "../../data/Urls";

import {useAuth} from "../Provides/AuthProvider";

/**
 * Route wrapper for privately accessible pages
 *
 * Redirect to ROOT when user is not authenticated
 *
 * @param Component
 * @param restricted
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
export const PrivateRoute = ({component: Component, ...rest}) => {
    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                currentUser ? <Component {...props} /> : (
                    <Redirect
                        to={{
                            pathname: Urls.ROOT,
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};
