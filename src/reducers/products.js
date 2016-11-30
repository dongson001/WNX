import {
  GET_PRODUCTS_BEGIN,
	GET_PRODUCTS_SUCCESS,
	GET_PRODUCTS_FAIL,
	RESET_PRODUCTS
}
from '../constants/actionTypes'

const defaultState = {
	list: [],
	knotting: 0,
	total: 0,
	error: false,
  isBegin: false
}

export default function products(state = defaultState, action) {
	switch (action.type) {
		case GET_PRODUCTS_SUCCESS:
			return Object.assign({}, state, {
        isBegin: false,
        isSuccess: true,
				list: state.list.concat(action.result.dataList),
				knotting: action.result.currPageEnd,
				total: action.result.dataSize
			})
		case GET_PRODUCTS_FAIL:
			return Object.assign({}, state, {
        isBegin: false,
				error: true,
				errorCode: action.errorCode,
				errorMessage: action.errorMessage
			})
    case GET_PRODUCTS_BEGIN:
      return Object.assign({}, state, {
				isBegin: true
			})
		case RESET_PRODUCTS:
			return defaultState
		default:
			return state
	}
}
