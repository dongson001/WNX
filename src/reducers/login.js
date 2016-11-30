import {
    LOGIN_BEGIN,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SSO_BEGIN,
    SSO_SUCCESS,
    SSO_FAIL
}
    from 'constants/actionTypes'

const defaultState = {
    isLogin:false,
    sso:null,
    error:null,
    pending:false,
    clientNo:''
}

export default function login(state = defaultState, action) {
    switch (action.type) {
        case LOGIN_BEGIN:{
            return Object.assign({}, state, {
                pending:true,
            })
        }
        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLogin:true,
            })
        case LOGIN_FAIL:
            return Object.assign({}, state, {
                isLogin:false,
                error:action.error
            })
        case SSO_BEGIN:
            return Object.assign({}, state, {
                pending:true
            })
        case SSO_SUCCESS:
            return Object.assign({}, state, {
                sso:true,
                pending:false,
                clientNo:action.clientNo
            })
        case SSO_FAIL:
            return Object.assign({}, state, {
                sso:false,
                pending:false,
                error:action.error
            })
        default:
            return state
    }
}
