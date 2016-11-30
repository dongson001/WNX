import request from 'reqwest'
import Utils from 'lodash/core'
import RSAKey from 'utils/rsa'
import App from 'utils/native'
import CryptoJS from 'crypto-js'

const isDeveloping = process.env.NODE_ENV !== 'production';
const isTest = process.env.DEV_ENV === 'test'
const port = isDeveloping ? 3000 : process.env.PORT;
const OXYGEN_PORT = '3013'
let domain,sDomain,route,cashier4Url,cashierSDomain;

domain = process.env.DEV_ENV === 'production'
	? 'http://m.pingan.com/chaoshi'
	: 'http://pa18-wapmall-dmzstg1.pingan.com.cn:5380/chaoshi'

route = process.env.DEV_ENV === 'production'
         ? 'http://m.pingan.com/chaoshi/baoxian/changshengrenshou/index.shtml'
	     : 'http://pa18-wapmall-dmzstg1.pingan.com.cn:5380/chaoshi/baoxian/changshengrenshou/index.shtml'
if(!!process.env.ISMORK){
	domain = ''
	route = ''
}

sDomain = process.env.DEV_ENV === 'production'
	? 'https://m.pingan.com/chaoshi'
	: 'https://pa18-wapmall-dmzstg1.pingan.com.cn:5380/chaoshi'

cashierSDomain = process.env.DEV_ENV === 'production'
	? 'https://m.pingan.com/chaoshi'
	: 'https://pa18-wapmall-dmzstg1.pingan.com.cn:53443/chaoshi'

cashier4Url = process.env.DEV_ENV === 'production'
	? 'https://jkkit-cashier.pingan.com.cn/cashier-web/main/login.shtml'
	: 'http://jkkit-cashier-stg1.pingan.com.cn:20380/cashier-web/main/login.shtml'
let type="jsonp"
	// domain = 'http://m.pingan.com/chaoshi';
	// sDimain = 'https://m.pingan.com/chaoshi';
//超时
const timeout = 10000
//RSA
 const PublicKey = process.env.DEV_ENV === 'production'
 	? "adee58af9bafad2b2e9008eeee066509c053069f84c483eb5c312f2eb833073df48eb139ecaf8912ed08e6adf40aa1a419c6a0aada923bde727ee6082210d5e4e44cbfe0f2a56042b5ba2eb4d8981913410586ceb376e18e0e03b2140507cd5189f09c8624df00f5c0c3828c6cbcf714319bb239fe466e923eae1bf8642b6a6e5a3ac50e141ccf05b11edeeebb22ee5f1792440671b94938b85a52352f228c9246f331077fc0239f889351e88223b3e6d30b62c900a6bea739597400da20178791cbce5a9283a7dc641eb1e417ffeadeac677a6863682f6afb018568f2874f0f6a8639f32bc9c34208319ead6267099e14fe8944593543c80e2c465214c8940d"
 	: "8bfcdc2fba15b27f9ce73fbf17465cb6b483aa3c9c69a8e33fbb128a1fd00a4baff762cb5118d55025ef0a29153057ca793c33e009d9832bdd4ca1982b25394d0ec2e36a1d0d274d91c07a5683c4a2ee3f30cfb208c26943e0f15bfd399e728da38396f066910883de8feaaf66a2d1fcde96a5362bbebc43ba3be836b836b6bf"

//const PublicKey = "adee58af9bafad2b2e9008eeee066509c053069f84c483eb5c312f2eb833073df48eb139ecaf8912ed08e6adf40aa1a419c6a0aada923bde727ee6082210d5e4e44cbfe0f2a56042b5ba2eb4d8981913410586ceb376e18e0e03b2140507cd5189f09c8624df00f5c0c3828c6cbcf714319bb239fe466e923eae1bf8642b6a6e5a3ac50e141ccf05b11edeeebb22ee5f1792440671b94938b85a52352f228c9246f331077fc0239f889351e88223b3e6d30b62c900a6bea739597400da20178791cbce5a9283a7dc641eb1e417ffeadeac677a6863682f6afb018568f2874f0f6a8639f32bc9c34208319ead6267099e14fe8944593543c80e2c465214c8940d"

const RSA = new RSAKey()
RSA.setPublic(PublicKey, "10001")

function hmacEncrypt(context) {
	const hmacPub = '57df89b6a8619bf188fd43a6'
	const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.MD5, hmacPub)
	let source = ''
	Object.keys(context).sort().forEach((key) => {
			source += `${key}=${context[key]}&`
	})
	const clear = source.slice(0, source.length - 1)
	hmac.update(clear)
	return hmac.finalize().toString()
}

let source = 'h5'
if (App.isIOS) {
	source = 'iPhone'
} else if (App.isAndroid) {
	source = 'Android'
}
//详情
export function getProductDetail(productId, productCode) {
	return request({
		url: domain + '/product/quer/productInfo.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			from:'wap-chaoshi',
			productId: productId,
			productCode:productCode,
			transactionCode:'WNX02'
		}
	})
}

//核保
export function insure(params) {
	return request({
		url: domain + '/scene/handler.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data:params /*{
			source:params.source || "",
			activity:params.activity || "",
			productId:params.productId || "",
			productCode:params.productCode || "",
			insurancePeriod:params.insurancePeriod || "",
			insurancePriodUnit:params.insurancePriodUnit || "",
			insurantUseProvinceNo:params.insurantUseProvinceNo || "",
			insurantUseCityNo:params.insurantUseCityNo || "",
			insurantUseContactAdrress:params.insurantUseContactAdrress || "",
			insurantUseRegionNo:params.insurantUseRegionNo || "",
			annualPremium:params.annualPremium || "",
			insuranceBeginTime:params.insuranceBeginTime || "",
			insuranceStartTime:params.insuranceStartTime || "",
			insuranceEndTime:params.insuranceEndTime || "",
			email:params.email || "",
			transactionCode:"WNX04",
		}*/
	})
}
//退保
export function surrender(params) {
	return request({
		url: domain + '/scene/handler.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			source:params.source || "",
			activity:params.activity || "",
			drawAmount:params.drawAmount || "",
			orderNo:params.orderNo ,
			productId:params.productId ,
			productCode:params.productCode ,
			pwd:RSA.encrypt(params.pwd) ,
			transactionCode:'WNX06'
		}
	})
}
//退保手续费计算
export function charge(params) {
	return request({
		url: domain + '/scene/handler.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			amount:params.amount || "",
			orderNo:params.orderNo || "",
			productId:params.productId || "",
			productCode:params.productCode || "",
			unit:params.unit || "",//0：元 1：万
			transactionCode:'WNX05'
		}
	})
}

//用户信息回显
export function getAccountInfo() {
	return request({
		url: domain + '/scene/handler.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: {
			transactionCode: 'WNX07'
		}
	})
}
//判断需要升级（主账户等级）
export function checkOrderPayCondition(params){//查询用户的升级跳转对应的数据
	return request({
		url:domain+'/sso/account/checkOrderPayCondition.do',
		method: 'GET',
		type: 'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data: params
	})
}
export function getUpdateUrl(){
	return {
		'02':cashierSDomain+'/customerupgrade/index.shtml#/account/pwd',
		'01':cashierSDomain+'/customerupgrade/index.shtml#/account/certify',
		'03':cashierSDomain+'/customerupgrade/index.shtml#/account/newCertify',
	}
}
export function checkIfAdult(){//查询是否满足18岁
	return request({
		url:domain+'/yanglao/order/checkInfoForPlacingOrder.do',
		method:'GET',
		type:type,
		timeout: timeout,
		contentType: 'application/json;charset=utf-8'
	})
}
//判断是否需要橙子账户鉴权和开户
export function orangeAccount(data){
	return request({
		url:`${process.env.ISMORK?'':domain}/scence/orangebank/orangeAccount.jsonp`,
		method:'GET',
		type:'jsonp',
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data:data
	})
}

export function getAccessTicket(sso){//同步登录态
	return request({
		url:domain+'/sso/account/getAccessTicket.do',
		method:'GET',
		type:type,
		timeout: timeout,
		contentType: 'application/json;charset=utf-8',
		data:sso
	})
}

export function postCashier(params) {
	const paramData = {
		digest:  hmacEncrypt(params),
		...params
	}
	dynamicForm(cashier4Url, paramData)
}

function dynamicForm(path, params, method) {
	const form = document.createElement('form')
	form.setAttribute('method', method || 'post')
	form.setAttribute('action', path)
	const fragment = document.createDocumentFragment()

	Object.keys(params).forEach((value) => {
		const input = document.createElement('input')
		input.setAttribute('type', 'hidden')
		input.setAttribute('name', value)
		input.setAttribute('value', params[value])
		fragment.appendChild(input)
	})
	form.appendChild(fragment)
	document.body.appendChild(form)
	form.submit()
	document.body.removeChild(form)
}

//鉴权跳转url
export const OXYGEN = (!!process.env.ISMORK)
	                ?`${location.protocol}//${location.hostname + ':' + OXYGEN_PORT}/` :`${sDomain}/payPre/auth/index.shtml`

//鉴权和橙子开户的返回页面
//export const NEXTLINK = (!!process.env.ISMORK)
	                //  ?`${location.protocol}//${location.hostname + ':' + port}#/product/welding`:`${route}#/product/welding`

export const NEXTLINK = "/product/welding/"
export const GLOBAL_ROUTE = (!!isDeveloping)?`${location.protocol}//${location.hostname + ':' + port}`:`${route}`
export const CHASHIER = cashierSDomain + '/unifyCashier/index.shtml#/cashier';
export const WANNENGXIAN = route + '/product/detail?productId=64185'
export const ZICHAN = route + " /chaoshi/baoxian/changshengrenshou/productDetails.shtml"
