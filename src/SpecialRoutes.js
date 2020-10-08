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

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            // const token = localStorage.getItem("token")
            // const expiry = new Date(localStorage.getItem("expirationDate"))
            // const currentTime = new Date();
            // rest.calendarStore.setUserData(JSON.parse(localStorage.getItem("user")))
            // if (currentTime > expiry) {
            //     return <Redirect
            //         to={{
            //             pathname: '/login',
            //             state: { from: props.location }
            //         }}
            //     />
            // }
            // if (token) { //as long as authenticated, able to access the privateroute
            //     return <Component {...props}
            //         calendarStore={rest.calendarStore}
            //     />
            // } else {
            //     return <Redirect to={{
            //         pathname: '/login',
            //         state: { from: props.location }
            //     }}
            //     />
            // }

            return <Component {...props}
                    calendarStore={rest.calendarStore}
                />
        }}
    />
)