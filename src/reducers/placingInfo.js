import {
	CHECK_PLACINGINFO_BEGIN,
	CHECK_PLACINGINFO_SUCCESS,
	CHECK_PLACINGINFO_FAIL,
	UPDATE_PLACINGINFO_BEGIN,
	UPDATE_PLACINGINFO_SUCCESS,
	UPDATE_PLACINGINFO_FAIL,
	RESET_PLACINGINFO
} from '../constants/actionTypes'

const defaultState = {
	checkPlacingInfoIsBegin: false,
	updatePlacingInfoIsBegin: false,
	updatePlacingInfoIsComplete: false
}

export default function placingInfo(state = defaultState, action) {
  switch (action.type) {
		//check
    case CHECK_PLACINGINFO_BEGIN:
      return Object.assign({}, state, {
        checkPlacingInfoIsBegin: true
      })
		case CHECK_PLACINGINFO_SUCCESS:
			return Object.assign({}, state, {
				checkPlacingInfoIsBegin: false,
				checkPlacingInfoResult: {
					code: action.code
				}
			})
		case CHECK_PLACINGINFO_FAIL:
			return Object.assign({}, state, {
				checkPlacingInfoIsBegin: false,
				checkPlacingInfoResult: {
					code: action.errorCode
				},
				checkPlacingInfoErrorCode: action.errorCode,
				checkPlacingInfoErrorMessage: action.errorMessage
			})

		case UPDATE_PLACINGINFO_BEGIN:
		  return Object.assign({}, state, {
				updatePlacingInfoIsBegin: true,
				updatePlacingInfoIsComplete: false
			})
		case UPDATE_PLACINGINFO_SUCCESS:
		  return Object.assign({}, state, {
				updatePlacingInfoBegin: false,
				updatePlacingInfoIsComplete: true,
				updatePlacingInfoResult: {
					result: action.result
				}
			})
		case UPDATE_PLACINGINFO_FAIL:
		  return Object.assign({}, state, {
				updatePlacingInfoBegin: false,
				updatePlacingInfoIsComplete: true,
				updatePlacingInfoErrorCode: action.errorCode,
				updatePlacingInfoErrorMessage: action.errorMessage
			})
		case RESET_PLACINGINFO:
			return defaultState
    default:
      return state
  }
}
