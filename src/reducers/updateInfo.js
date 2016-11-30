/**
 * 升级信息
 */
import {
    GET_UPDATREINFO_BEGIN,
    GET_UPDATREINFO_SUCCESS,
    GET_UPDATREINFO_FAIL,
    RESET_UPDATREINFO
} from '../constants/actionTypes'

const defaultState = {
    getUpdateInfoBegin: false,
}

export default function updateInfo(state = defaultState, action) {
    switch (action.type) {
        case GET_UPDATREINFO_BEGIN:
            return Object.assign({}, state, {
                getUpdateInfoBegin: true
            })
        case GET_UPDATREINFO_SUCCESS:
            return Object.assign({}, state, {
                getUpdateInfoBegin: false,
                getUpdateInfoResult: action.data,
                sso:{
                    timestamp:action.data.timestamp,
                    ssoTicket:action.data.SSOTicket,
                    sign:action.data.signature
                },
                clientNo:action.data.clientNo
            })
        case GET_UPDATREINFO_FAIL:
            return Object.assign({}, state, {
                getUpdateInfoBegin: false,
                getUpdateInfoResult: {
                    errorMessage: action.errorMessage
                }
            })
        case RESET_UPDATREINFO:
            return defaultState
        default:
            return state
    }
}
