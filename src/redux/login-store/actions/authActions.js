import * as actionTypes from './actionTypes';
import axios from 'axios';
import history from '../../../history';

//action creators
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, user, is_staff, projects, is_admin) => ({ 
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    user: user,
    is_Staff: is_staff,
    projects: projects,
    is_admin: is_admin
})

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

//thunk action creators -> thunks are actions with asynchronous logic

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('projects');
    localStorage.removeItem('is_Staff');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    // localStorage.removeItem('paramQuery');
    return (
        history.push("/login"), {
        type: actionTypes.AUTH_LOGOUT
    })
}

//This fucntion will automatically dispatch logout() action when the expiration time is met.
export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post("http://localhost:8080/fyp/api/user/authenticate", {
            username: username,
            password: password
        })
        .then(res => {
            const token = res.data.token;
            const expirationDate = new Date((new Date().getTime() + 3600*5*1000));
            dispatch(checkAuthTimeout(5*3600));
            const user = {
                id: res.data.user.id,
                username: res.data.user.username,
                is_staff: res.data.user.is_staff,
                is_admin: res.data.user.is_admin,
                email: res.data.user.email,
                //fullname: res.data.user.fname + " " + res.data.user.lname -> maynot be necessary
            };

            const projects = res.data.projects;
            
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('is_staff', user.is_staff);
            localStorage.setItem('is_admin', user.is_admin);
            var myUserJSON = JSON.stringify(user);
            localStorage.setItem('user', myUserJSON);
            var projectsJson = JSON.stringify(projects)
            localStorage.setItem('projects',projectsJson)
            console.log(localStorage.getItem('is_admin'));
            dispatch(authSuccess(token, user, user.is_staff, projects, user.is_admin));
        })
        .then(res =>{history.push("/determiner")})
        .catch(err => {
            dispatch(authFail(err));
            history.push('/login');
        })
    }
}
