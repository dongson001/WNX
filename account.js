import {
	LOGIN_ACCOUNT_FAIL,
	CREATE_ACCOUNT_BEGIN,
	CREATE_ACCOUNT_SUCCESS,
	CREATE_ACCOUNT_FAIL,
	SCRATCH_INITIALPASSWORD,
	CLEAR_INITIALPASSWORD,
	SCRATCH_PASSWORD,
	GET_ACCOUNT_INFO_BEGIN,
	GET_ACCOUNT_INFO_SUCCESS,
	GET_ACCOUNT_INFO_FAIL,
	RESET_ACCOUNT,
	APP_LOGIN_BEGIN,
	APP_LOGIN_SUCCESS,
	APP_LOGIN_FAIL,
	APP_LOGIN_RESET
}
from 'constants/actionTypes'

const defaultState = {
	isLogin: true,
	createAccountIsBegin: false,
	createAccountComplete: false,
	getAccountInfoIsBegin: false,
	//app同步登录态
	sso:null,
	error:null,  //同步登录态失败
	pending:false,
	clientNo:''
}

export default function account(state = defaultState, action) {
	switch (action.type) {
		case LOGIN_ACCOUNT_FAIL:
			return Object.assign({}, state, {
				isLogin: false,
				currentUrl: action.currentUrl,
				loginUrl: action.loginUrl
			})

		case CREATE_ACCOUNT_BEGIN:
		  return Object.assign({}, state, {
				createAccountIsBegin: true,
				createAccountComplete: false
			})
		case CREATE_ACCOUNT_SUCCESS:
		  return Object.assign({}, state, {
				createAccountIsBegin: false,
				createAccountComplete: true,
				createAccountResult: action.result
			})
		case CREATE_ACCOUNT_FAIL:
		  return Object.assign({}, state, {
				createAccountIsBegin: false,
				createAccountComplete: true,
				errorCode: action.errorCode,
				errorMessage: action.errorMessage
			})
		case SCRATCH_PASSWORD:
			return Object.assign({}, state, {
				password: action.password
			})
		case SCRATCH_INITIALPASSWORD:
			return Object.assign({}, state, {
				initialPassword: action.password
			})
		case CLEAR_INITIALPASSWORD:
			return Object.assign({}, state, {
				initialPassword: ''
			})
		case GET_ACCOUNT_INFO_BEGIN:
			return Object.assign({}, state, {
				getAccountInfoIsBegin: true
			})
		case GET_ACCOUNT_INFO_SUCCESS:
			return Object.assign({}, state, {
				getAccountInfoIsBegin: false,
				info: action.result
			})
		case GET_ACCOUNT_INFO_FAIL:
			return Object.assign({}, state, {
				getAccountInfoIsBegin: false,
				errorCode: action.errorCode,
				errorMessage: action.errorMessage
			})

		case RESET_ACCOUNT:
			return defaultState
		case APP_LOGIN_BEGIN:{
			return Object.assign({}, state, {
				pending:true,
			})
		}
		case APP_LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isLogin:true,
				pending:false
			})
		case APP_LOGIN_FAIL:
			return Object.assign({}, state, {
				isLogin:false,
				pending:false,
				error:action.error
			})
		case APP_LOGIN_RESET:
			return defaultState;
		default:
			return state
	}
}
