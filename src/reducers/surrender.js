import {
	SURRENDER_BEGIN,
	SURRENDER_SUCCESS,
	SURRENDER_FAIL,
	RESET_SURRENDER
} from '../constants/actionTypes'

const defaultState = {
	error: false,
	isBegin: false,
	isSuccess: false,
	isFinish:false
}

export default function surrender(state = defaultState, action) {
	switch (action.type) {
		case SURRENDER_SUCCESS:
			return Object.assign({}, state, {
				result: action.result,
				responseCode:action.responseCode,
				isBegin: false,
				isSuccess: true,
				isFinish:true
			})
		case SURRENDER_BEGIN:
			return Object.assign({}, state, {
				isBegin: true
			})
		case SURRENDER_FAIL:
			return Object.assign({}, state, {
				isBegin: false,
				isSuccess: false,
				isFinish:true,
				error: true,
				errorCode: action.errorCode,
				errorMessage: action.errorMessage
			})
		case RESET_SURRENDER:
			return defaultState
		default:
			return state
	}
}
