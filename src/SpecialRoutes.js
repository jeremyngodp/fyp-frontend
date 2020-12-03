import React from "react";
import { Route, Redirect } from "react-router-dom";
import moment from 'moment';
import {store} from "./redux/login-store/loginStore";
import history from './history';

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
            const token = localStorage.getItem("token")
            const expiry = new Date(localStorage.getItem("expirationDate"))
            const currentTime = new Date();
            rest.calendarStore.setUserData(JSON.parse(localStorage.getItem("user")))
            if (currentTime > expiry) {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
            if (token) { //as long as authenticated, able to access the privateroute
                return <Component {...props}
                    calendarStore={rest.calendarStore}
                />
            } else {
                return <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
                />
            }

            return <Component {...props}
                    calendarStore={rest.calendarStore}
                />
        }}
    />
)

export const LoginRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const token = localStorage.getItem("token")
            const expiry = new Date(localStorage.getItem("expirationDate"))
            const currentTime = new Date();
            if (currentTime > expiry) {
                return <Component {...props} />
            }
            if (token) {
                rest.calendarStore.setUserData(JSON.parse(localStorage.getItem("user")))
                if (store.getState().is_Staff) { //if is staff
                    history.push("/staff");
                } else if (!store.getState().is_Staff) {
                    history.push('/student');
                } else {
                    return <Component {...props} />
                }
            } else {
                return <Component {...props} />
            }
        }}
    />
)

export const CheckSwitchRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const token = localStorage.getItem("token")
            const expiry = new Date(localStorage.getItem("expirationDate"))
            const currentTime = new Date();
            rest.calendarStore.setUserData(JSON.parse(localStorage.getItem("user")))
            if (currentTime > expiry) {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
            if (token) {
                if (store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/staff',
                            state: { from: props.location }
                        }}
                    />
                } else if (!store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/student',
                            state: { from: props.location }
                        
                        }}
                    />
                } else {
                    return <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                }
            } else {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
        }}
    />
)