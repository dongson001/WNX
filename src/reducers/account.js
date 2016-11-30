import {
	GET_ACCOUNT_INFO_BEGIN ,
	GET_ACCOUNT_INFO_SUCCESS ,
	GET_ACCOUNT_INFO_FAIL ,
	RESET_ACCOUNT_INFO
}
from 'constants/actionTypes'

const defaultState = {
	error: false,
	isBegin: false,
	isSuccess: false
}

export default function account(state = defaultState, action) {
	switch (action.type) {
		case GET_ACCOUNT_INFO_BEGIN:{
			return Object.assign({}, state, {
				isBegin: true
			})
		}
		case GET_ACCOUNT_INFO_SUCCESS:
			return Object.assign({}, state, {
				isBegin: false,
				isSuccess: true,
				result: action.result
			})
		case GET_ACCOUNT_INFO_FAIL:
			return Object.assign({}, state, {
				isBegin: false,
				isSuccess: false,
				error:action.error,
				errorCode: action.errorCode,
				errorMessage: action.errorMessage
			})
		case RESET_ACCOUNT_INFO:
			return defaultState;
		default:
			return state
	}
}
