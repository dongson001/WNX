import {
	GET_PRODUCTDETAIL_BEGIN,
	GET_PRODUCTDETAIL_SUCCESS,
	GET_PRODUCTDETAIL_FAIL
} from '../constants/actionTypes'

const defaultState = {
	error: false,
	isBegin: false,
	isSuccess: false,
}

export default function productDetail(state = defaultState, action) {
	switch (action.type) {
		case GET_PRODUCTDETAIL_SUCCESS:
			return Object.assign({}, state, {
				result: action.result,
				isBegin: false,
				isSuccess: true
			})
		case GET_PRODUCTDETAIL_BEGIN:
			return Object.assign({}, state, {
				isBegin: true
			})
		case GET_PRODUCTDETAIL_FAIL:
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
