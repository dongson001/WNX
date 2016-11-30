import {
	SURRENDER_CHARGE_BEGIN,
	SURRENDER_CHARGE_SUCCESS,
	SURRENDER_CHARGE_FAIL
} from '../constants/actionTypes'

const defaultState = {
	error: false,
	isBegin: false,
	isSuccess: false,
}

export default function surrenderCharge(state = defaultState, action) {
	switch (action.type) {
		case SURRENDER_CHARGE_SUCCESS:
			return Object.assign({}, state, {
				result: action.result,
				isBegin: false,
				isSuccess: true
			})
		case SURRENDER_CHARGE_SUCCESS:
			return Object.assign({}, state, {
				isBegin: true
			})
		case SURRENDER_CHARGE_FAIL:
			return Object.assign({}, state, {
				isBegin: false,
				isSuccess: false,
				error: true,
				errorCode: action.errorCode,
				errorMessage: action.errorMessage
			})
		default:
			return state
	}
}
