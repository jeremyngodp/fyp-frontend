import React from "react";
import { Route, Redirect } from "react-router-dom";
import moment from 'moment';
import {store} from "./redux/login-store/loginStore";
import history from './history';

export const StudentOnlyRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render = {props => {
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
                    return <Component {...props} />
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
            
            }
        }
    />
)

export const StaffOnlyRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render = {props => {
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
                if (!store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/student',
                            state: { from: props.location }
                        }}
                    />
                } else if (store.getState().is_Staff) {
                    return <Component {...props} />
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
            
            }
        }
    />
)

export const AdminOnlyRoute = ({ component: Component, ...rest }) => (
    <Route
    {...rest}
    render = {props => {
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
                if (!store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/student',
                            state: { from: props.location }
                        }}
                    />
                } else if (store.getState().is_Staff) {
                    if(store.getState().is_admin) {
                        return <Component {...props} />
                    }

                    else {
                        return <Redirect
                        to={{
                            pathname: '/staff',
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
            } else {
                return <Redirect
                    to={{
                        pathname: '/login',
                        state: { from: props.location }
                    }}
                />
            }
            
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
                if(!store.getState().is_Staff) {
                    rest.calendarStore.addUserType("Student")
                    return <Component {...props}
                                calendarStore={rest.calendarStore}
                            />
                } else {
                    return <Redirect 
                            to={{ 
                            pathname: '/staff',
                            state: {from: props.location} 
                            }} 
                            />
                }
                
            } else {
                return <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}
                />
            }
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
                    if (store.getState().is_admin) {
                        console.log("you are admin");
                        return <Redirect
                        to={{
                            pathname: '/admin',
                            state: { from: props.location }
                        }}
                    />
                    }

                    else {
                        return <Redirect
                        to={{
                            pathname: '/staff',
                            state: { from: props.location }
                        }}
                    />
                    }
                    
                } else if (!store.getState().is_Staff) {
                    return <Redirect
                        to={{
                            pathname: '/student',
                            state: { from: props.location }
                        }}
                    />
                } else {
                    return <Component {...props} />
                }
            } else {
                return <Component {...props} />
            }
        }}
    />
)

export const RegisterRoute = ({component: Component, ...rest}) => (
    <Route 
    {...rest}
    render = {props =>{
        return <Component {...props} />
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
                if (store.getState().is_Staff) { //if is staff
                    if (store.getState().is_admin) {
                        return <Redirect
                        to={{
                            pathname: '/admin',
                            state: { from: props.location }
                        }}
                    />
                    }

                    else {
                        return <Redirect
                        to={{
                            pathname: '/staff',
                            state: { from: props.location }
                        }}
                    />
                    }
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