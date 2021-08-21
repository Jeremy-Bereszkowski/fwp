import React from 'react'
import {Redirect, Route} from "react-router-dom";

import {Urls} from "../../data/Urls";

import {useAuth} from "../Provides/AuthProvider";

/**
 * Route wrapper for publicly accessible pages
 *
 * Redirect to ROOT when user is not authenticated
 *
 * @param Component
 * @param restricted
 * @param disabled
 * @param rest
 * @returns {JSX.Element}
 * @constructor
 */
export const PublicRoute = ({component: Component, restricted, disabled, ...rest}) => {
    const { currentUser } = useAuth();
    return (
        <Route
            {...rest}
            render={props =>
                (disabled || (currentUser && restricted)) ? (
                    <Redirect
                        to={{
                            pathname: Urls.ROOT,
                            state: { from: props.location }
                        }}
                    />
                ) : <Component {...props} />
            }
        />
    );
};
