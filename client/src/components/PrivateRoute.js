import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

export const  PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            auth ? (
                <Component {...props} />
            ) : (
                    <Redirect to="/" />
                )
        }
    />
);