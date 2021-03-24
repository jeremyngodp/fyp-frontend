import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    error: null,
    loading: false,//what is it used for??
    user: null,
    projects: null,
    is_Staff: null,
    is_admin: null,
    // paramQuery: null
}

const authStart = (state, action) => {
    return {
        ...state, //the state is copied and the new value is made on the copy, not directly on the state
        error: null,
        loading: true,
        user: {},
        projects: [],
        is_Staff: null,
        is_admin: null
        // paramQuery: null
    }
}

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        error: null,
        loading: false,
        user: action.user,
        projects: action.projects,
        is_Staff: action.is_Staff,
        is_admin: action.is_admin,
        // paramQuery: action.paramQuery
    }
}

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
        user: null,
        projects: null,
        is_Staff: null,
        is_admin: null
        // paramQuery: null
    }
}

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        user: null,
        projects: null,
        is_Staff: null,
        is_admin: null
        // paramQuery: null
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_START': return authStart(state, action);
        case 'AUTH_SUCCESS': return authSuccess(state, action);
        case 'AUTH_FAIL': return authFail(state, action);
        case 'AUTH_LOGOUT': return authLogout(state, action);
        // case 'TASK_PARAMS': return tasklistParam(state, action);
        default:
            return state;
    }
}

export default reducer;