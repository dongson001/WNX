import * as api from 'api'
import * as types from '../constants/actionTypes'
import incinerator from 'hooks/incinerator'
import {App, YztApp} from 'utils/native'

// 用户态实效
export function loginAccountFail(currentUrl, loginUrl) {
  return {
    type: types.LOGIN_ACCOUNT_FAIL,
    currentUrl,
    loginUrl
  }
}
// 产品详情
export function resetProductDetail() {
  return {
    type: types.RESET_PRODUCTDETAIL
  }
}

function getProductDetailBegin() {
  return {
    type: types.GET_PRODUCTDETAIL_BEGIN
  }
}

function getProductDetailSuccess(result) {
  return {
    type: types.GET_PRODUCTDETAIL_SUCCESS,
    result: result
  }
}

function getProductDetailFail(errorCode, errorMessage) {
  return {
    type: types.GET_PRODUCTDETAIL_FAIL,
    errorCode:errorCode,
    errorMessage:errorMessage
  }
}
export function getProductDetail(productId, productcode) {
  return (dispatch, getState) => {
    dispatch(getProductDetailBegin())
    return api.getProductDetail(productId,productcode)
			.then(res => {
        incinerator('productDetail', res.responseCode, {
					success: dispatch.bind(this, getProductDetailSuccess(Object.assign(res.responseData?res.responseData:{}))),
					fail: dispatch.bind(this, getProductDetailFail(res.responseCode, res.responseMessage)),
					//unlogin: dispatch.bind(this, loginAccountFail(getState().routing.path, res.url))
          unlogin:()=>{
            dispatch(getProductDetailFail(res.responseCode,res.responseMessage));
            YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
            })
          }
				})
			})
			.fail(() => dispatch(getProductDetailFail('77777', '当前网络异常，请检查您的网络设置')))
	}
}

//  提交保单
export function submitOrder(data) {
	return (dispatch, getState) => {
		dispatch(submitOrderBegin())

    async function insure() {
      return new Promise((resolve, reject) => {
        api.insure(data)
          .then(res => {
						incinerator('createOrder', res.responseCode, {
							success: resolve.bind(this, res),
							fail: reject.bind(this, {
								errorCode: res.responseCode,
								errorMessage: res.responseMessage
							}),
							// unlogin:()=>{
							// 	dispatch(loginAccountFail())
							// }
              unlogin:()=>{
                reject.bind(this, {
  								errorCode: res.responseCode,
  								errorMessage: res.responseMessage
  							})
                YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
                })
              }
						})
          })
          .fail(res => {
            reject({
              errorCode: '77777',
              errorMessage: '当前网络异常，请检查您的网络设置'
            })
          })
      })
    }
    (async function(){
      try{
        let createOrderResult = await insure()
				incinerator('submitOrder', createOrderResult.responseCode, {
					success: dispatch.bind(this, submitOrderSuccess({
						productId: createOrderResult.responseData.productId,
						payOrderNo: createOrderResult.responseData.payOrderNo,
						orderAmount: createOrderResult.responseData.orderAmount,
						orderNo: createOrderResult.responseData.orderNo
					})),
					fail: dispatch.bind(this, submitOrderFail(createOrderResult.errorCode, createOrderResult.errorMessage))
				})
      }
      catch(e){
				incinerator('submitOrder', e.errorCode, {
					fail: dispatch.bind(this, submitOrderFail(e.errorCode, e.errorMessage))
				})
      }
    })()
	}

}

function submitOrderBegin() {
	return {
		type: types.CREATE_ORDER_BEGIN
	}
}

function submitOrderSuccess(result) {
	return {
		type: types.CREATE_ORDER_SUCCESS,
		result: result
	}
}

function submitOrderFail(errorCode, errorMessage) {
	return {
		type: types.CREATE_ORDER_FAIL,
		errorCode: errorCode,
		errorMessage: errorMessage
	}
}

export function resetOrder() {
	return {
		type: types.RESET_ORDER
	}
}

//用户信息回显
export function getAccountInfo(){
	return (dispatch, getState) => {
		dispatch(getAccountInfoBegin())
		return api.getAccountInfo()
		.then(res => {
			incinerator('getAccountInfo', res.responseCode, {
				success: dispatch.bind(this, getAccountInfoSuccess(res)),
				fail: dispatch.bind(this, getAccountInfoFail(res.responseCode, res.responseMessage)),
				//unlogin: dispatch.bind(this, loginAccountFail(getState().routing.path, res.url))
        unlogin:()=>{
          dispatch(getAccountInfoFail(res.responseCode,res.responseMessage));
          YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
          })
        }
			})
		})
		.fail(() => {
			dispatch(getAccountInfoFail('77777', '当前网络异常，请检查您的网络设置'))
		})
	}
}

export function getAccountInfoBegin() {
	return {
		type: types.GET_ACCOUNT_INFO_BEGIN
	}
}

export function getAccountInfoSuccess(result) {
	return {
		type: types.GET_ACCOUNT_INFO_SUCCESS,
		result: result
	}
}

function getAccountInfoFail(errorCode, errorMessage) {
	return {
		type: types.GET_ACCOUNT_INFO_FAIL,
		errorCode: errorCode,
		errorMessage: errorMessage
	}
}

/*
  退保手续费计算
*/
export function getSurrenderCharge(params){
	return (dispatch, getState) => {
		dispatch(surrenderChargeBegin())
		return api.charge(params)
		.then(res => {
			incinerator('surrenderCharge', res.responseCode, {
				success: dispatch.bind(this, surrenderChargeSuccess(res.responseData)),
				fail: dispatch.bind(this, surrenderChargeFail(res.responseCode, res.responseMessage)),
				//unlogin: dispatch.bind(this, surrenderChargeFail(getState().routing.path, res.url))
        unlogin:()=>{
          //dispatch(surrenderChargeFail(res.responseCode,res.responseMessage));
           YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
           })
        }
			})
		})
		.fail(() => {
			dispatch(surrenderChargeFail('77777', '当前网络异常，请检查您的网络设置'))
		})
	}
}

function surrenderChargeBegin() {
	return {
		type: types.SURRENDER_CHARGE_BEGIN
	}
}

function surrenderChargeSuccess(result) {
	return {
		type: types.SURRENDER_CHARGE_SUCCESS,
		result: result
	}
}

function surrenderChargeFail(errorCode, errorMessage) {
	return {
		type: types.SURRENDER_CHARGE_FAIL,
		errorCode: errorCode,
		errorMessage: errorMessage
	}
}
/*
  退保
*/
export function surrenderAction(param){
	return (dispatch, getState) => {
		dispatch(surrenderBegin())
		return api.surrender(param)
		.then(res => {
			incinerator('surrender', res.responseCode, {
				success: dispatch.bind(this, surrenderSuccess(res.responseCode,res.responseData)),
				fail: dispatch.bind(this, surrenderFail(res.responseCode, res.responseMessage)),
				//unlogin: dispatch.bind(this, surrenderFail(getState().routing.path, res.url)
        unlogin:()=>{
          dispatch(surrenderFail(res.responseCode,res.responseMessage));
          YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
          })
        }
			})
		})
		.fail(() => {
			dispatch(surrenderFail('77777', '当前网络异常，请检查您的网络设置'))
		})
	}
}

function surrenderBegin() {
	return {
		type: types.SURRENDER_BEGIN
	}
}

function surrenderSuccess(code,result) {
	return {
		type: types.SURRENDER_SUCCESS,
		result: result,
    responseCode:code
	}
}

function surrenderFail(errorCode, errorMessage) {
	return {
		type: types.SURRENDER_FAIL,
		errorCode: errorCode,
		errorMessage: errorMessage
	}
}

export function resetSurrender(){
	return {
		type:types.RESET_SURRENDER
	}
}
//用户登录

function loginBegin(){
	return {
		type: types.LOGIN_BEGIN
	}
}

function loginSuccess(clientNo){
	return {
		type: types.LOGIN_SUCCESS,
	}
}

function loginFail(error){
	return {
		type: types.LOGIN_FAIL,
		error:error
	}
}

function ssoBegin(){
	return {
		type:types.SSO_BEGIN
	}
}

function ssoSuccess(clientNo){
	return {
		type:types.SSO_SUCCESS,
		clientNo:clientNo
	}
}

function ssoFail(error){
	return {
		type:types.SSO_FAIL,
		error:error
	}
}
export function userLogin() {
	//if(!App.IS_YZT ){
	//	YztApp.getLoginStatus= function(cb){
	//		setTimeout(()=>{cb('success',{clientNo:'111'})},1000);
	//	}
	//	YztApp.getSSOTicket= function(cb){
	//		setTimeout(()=>{cb('success',JSON.stringify({signature:'111'}))},1000);
	//	}
	//	//return
	//};
	return (dispatch, getState) => {
		dispatch(loginBegin())
		return YztApp.getLoginStatus((status,data)=> {
			if (status !== 'success') {
				dispatch(ssoFail('native api call error'));
				return;
			}
			if (status === 'success' && !data.clientNo) {//未登录先去登录
				YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
				})
			}
			if(data.clientNo){
				dispatch(loginSuccess(data.clientNo))
				dispatch(ssoBegin());
				YztApp.getSSOTicket((status,data)=>{
						//let sso = data ?JSON.parse(data.toString()):false;
            let sso = data
						if(status==='success' && sso){
							api.getAccessTicket(sso)
								.then(res => {
									incinerator('getAccessTicket', res.responseCode, {
										success:()=>{
											if(res.responseData && res.responseData.clientNo){
												dispatch(ssoSuccess(res.responseData.clientNo))
											}
											else{
												dispatch(ssoFail('请求接口失败'))
											}
										},
										fail:dispatch.bind(this, ssoFail(res.responseMessage)),
										unlogin:()=>{
											dispatch(ssoFail(res.responseMessage));
											YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
											})
										}
									})
								})
								.fail(() => {
									dispatch(ssoFail('请求接口失败'))
								});
						}
					})
			}
		})
	}
}

/*
   升级信息获取
 */

function getUpdateInfoBegin(){
	return {
		type:types.GET_UPDATREINFO_BEGIN
	}
}

function getUpdateInfoSuccess(data){
	return {
		type:types.GET_UPDATREINFO_SUCCESS,
		data:data
	}
}
function getUpdateInfoFail(errorCode,errorMessage){
	return {
		type:types.GET_UPDATREINFO_FAIL,
		errorCode: errorCode,
		errorMessage: errorMessage
	}
}

export function resetUpdateInfo(){
	return {
		type:types.RESET_UPDATREINFO
	}
}

export function getUpdateInfo(params){
	return (dispatch, getState) => {
		dispatch(getUpdateInfoBegin())
		return api.checkOrderPayCondition(params)
			.then(res => {
				incinerator('checkOrderPayCondition', res.responseCode, {
					success: dispatch.bind(this, getUpdateInfoSuccess(res.responseData)),
					fail: dispatch.bind(this, getUpdateInfoFail(res.responseCode, res.responseMessage)),
					unlogin: ()=>{
            YztApp.accessNativeModule('patoa://pingan.com/login', ()=> {
            })
          }
				})
			})
			.fail(() => {
				dispatch(getUpdateInfoFail('77777', '当前网络异常，请检查您的网络设置'))
			})
	}
}
