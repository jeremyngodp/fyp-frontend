import React from "react";
import { Route, Redirect } from "react-router-dom";
import moment from 'moment';

export const StudentOnlyRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render = {props => {
            return <Component {...props} />
            }
        }
    />
)

export const StaffOnlyRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render = {props => {
            return <Component {...props} />
            }
        }
    />
)