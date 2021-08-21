import React from 'react';
import {
    BrowserRouter as Router,
    Redirect,
    Route,
    Switch
} from "react-router-dom";

import {PublicRoute} from "./PublicRoute";
import {PrivateRoute} from "./PrivateRoute";

import LandingPage from "../../pages/LandingPage";
import NotFoundPage from "../../pages/NotFoundPage";
import FeedPage from "../../pages/FeedPage";
import AccountPage from "../../pages/AccountPage";
import UpdatePasswordPage from "../../pages/UpdatePasswordPage";

import {Urls as URLS} from "../../data/Urls";

/**
 * App React Router
 *
 *  Route types:
 *      PublicRoute - not restricted to any user
 *      PrivateRoute - restricted to logged in uses only
 *
 *  Default Route - LandingPage
 *  Error Route - NotFoundPage
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function MainRouter() {
    return (
        <Router>
            <Switch>
                {/* Page Routes */}
                <PublicRoute
                    exact
                    path={URLS.ROOT}
                    component={LandingPage}
                />
                <PrivateRoute
                    exact
                    path={URLS.FEED}
                    component={FeedPage}
                />
                <PrivateRoute
                    exact
                    path={URLS.ACCOUNT}
                    component={AccountPage}
                />
                <PrivateRoute
                    exact
                    path={URLS.UPDATE_PASSWORD}
                    component={UpdatePasswordPage}
                />
                <PublicRoute
                    exact
                    path={URLS.PAGE_NOT_FOUND}
                    component={NotFoundPage}
                />


                {/* Default Route */}
                <Route>
                    <Redirect to={URLS.PAGE_NOT_FOUND}/>
                </Route>
            </Switch>
        </Router>
    );
}
