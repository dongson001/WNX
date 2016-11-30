import {
  CREATE_ORDER_BEGIN,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  RESET_ORDER
} from 'constants/actionTypes'

const defaultState ={
  isBegin: false,
  isSucess:false,
  error:false
}
export default function order(state = defaultState, action) {
  switch (action.type) {
    case CREATE_ORDER_BEGIN:
      return Object.assign({}, state, {
        isBegin: true
      })
    case CREATE_ORDER_SUCCESS:
      return Object.assign({}, state, {
        isBegin: false,
        isSuccess:true,
        result:  action.result
      })
    case CREATE_ORDER_FAIL:
      return Object.assign({}, state, {
        isBegin: false,
        error:true,
        errorCode: action.errorCode,
        errorMessage: action.errorMessage
      })
    case RESET_ORDER:
      return defaultState
    default:
      return state
  }
}
