import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {getAccountInfo,submitOrder,resetOrder,getProductDetail} from 'actions'
import Utils from 'lodash/core'
import {App, YztApp} from 'utils/native'
import Loading from 'components/loading'
import Modal from 'components/modal'
import Handle from 'components/handle'
import KeyBoard from 'components/keyBoard'
import City from 'components/cityCascade'
import { getUrlParam } from 'utils/getUrlParams'
import parameter from 'utils/parameter'
import * as api from 'api'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Toast from 'components/toast'
import {email} from "utils/checker"

const CHANNEL = 1982;
const CHANNELSECOND = 1982003;
//百年人寿：999201009，长生人寿：999201
const ORDERPLATFORM = 999201;
const PAYCLASSIFY = 25;
let ISCHECK = false;
@connect(
  state => ({
    accountInfo: state.account,
    productDetail: state.productDetail,
    order: state.order,
    login:state.login
  }), {
    getProductDetail,
    getAccountInfo,
    submitOrder,
    resetOrder
  }
)

class Submit extends React.Component {
  state =  {
    isHandle:false,
    isModalVisible: false,
    error:'',
    email:sessionStorage.getItem("email") || "",
    address:sessionStorage.getItem("address") || "",
    showKeyBoard:false,
    showCity:false,
    city : ['','',''],
    payPassword: ['', '', '', '', '', '','','']
  }

  incrementCity(i,v){//index:0province,1city,2..
      const {city} = this.state
      i = i || 0
      v = v || ''
      const newCity =  (() => {
        city[i] = v
        return city
      }())
      this.setState({
        city: newCity
      })

  }
  incrementPayPassword(increment) {
    const { payPassword } = this.state
    const newPayPassword = !(payPassword[payPassword.length - 1] !== '') ? (() => {
      payPassword[payPassword.indexOf('')] = increment
      return payPassword
    }()) : payPassword
    this.setState({
      payPassword: newPayPassword
    })
  }
  hideCity(){
     this.setState({showCity:false})
  }
  decrementPayPassword() {
    const { payPassword } = this.state
    const newPayPassword = !(payPassword[0] === '') ? (() => {
      payPassword[(payPassword.indexOf('')) == -1 ? (payPassword.length - 1) : (payPassword.indexOf('') - 1)] = ''
      return payPassword
    }()) : payPassword
    this.setState({
      payPassword: newPayPassword
    })
  }
  hideKeyboard(){
     this.setState({showKeyBoard:false})
  }

  showError(error){
      this.setState({error:error})
      setTimeout(()=>{
          this.setState({error:null})
      },1500)
      return true;
  }
  componentWillMount(){
    App.nativeCallbacks.goback = function (){
        this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
    this.props.getProductDetail(getUrlParam("productId"),getUrlParam("productCode"))
    this.props.getAccountInfo()
  }
  onClickBack() {
    history.go(-1)
    // let productId = this.props.routeParams.productId ,
    // productCode = this.props.routeParams.productCode,
    // page = '1'
    // this.props.history.pushState(null, `/product/detail/:${productId}/:${productCode}/:${page}`)
  }
  onChangeEmail(e) {
      this.setState({
          email: e.target.value
      })
  }
  onChangeAddress(e) {
      this.setState({
          address: e.target.value
      })
  }
  detailArray(){
    return {
      '1':'insuranceClauseList',
      '2':'productDescUrl',
      '3':'insuranceStatement',
      '4':'insuranceNotice',
      '5':'insuranceTips',
      '6':'commonIssueList',
      '7':'urlLiPeiFuWu',
      '8':'insuranceScope'
    }
  }
  saveItem2session(arrayCB){
    let ar ={}
    if(Object.prototype.toString.call(arrayCB) === '[object Function]')
      ar = arrayCB.call(this)
    return function(index,val){
      if(ar[index]) {
        sessionStorage.setItem(ar[index], val)
      }
    }
  }
  onClickGuarantee(category,value) {
    //保存展示信息
    this.saveItem2session(this.detailArray)(category,value)
    let {productId,productCode} = this.props.productDetail.result
    this.props.history.pushState(null, `/guarantee/${productId}/${productCode}/${category}`)
  }
  componentWillReceiveProps(nextProps){
    const order = nextProps.order;
    if(!order){return}
    if(order.isBegin){
      this.setState({
        isHandle:true
      })
      return
    }
    else if(order.isSuccess && order.result && order.result.orderNo){
      //cashier 3.0
      // console.log('-------success-------')
      // let  next = encodeURIComponent(`${origin}${pathname}${search}`);
      //     let params = {
      //         clientNo:sessionStorage.getItem("clientNo"),
      //         orderNo:order.result.orderNo,
      //         payOrderNo:order.result.payOrderNo,
      //         channel:CHANNEL,
      //         channelSecond:CHANNELSECOND,
      //         orderPlatform:ORDERPLATFORM,
      //         payClassify:PAYCLASSIFY,
      //         payResultURL:encodeURIComponent(api.WANNENGXIAN)
      //     }
      //     let {origin,pathname,search} = location;
      //
      //     let url = api.CHASHIER+'?'+parameter(params)
      //     console.log(url)
      //     location.href = url
      this.setState({
        isHandle:false
      })
      let {origin,pathname,search} = location;
      let  next = `${origin}${pathname}${search}#/product/result`;
      //console.log("hook url:"+`${origin}${pathname}${search}#/product/result`)
      //console.log("encode url:"+next)
          function getSSO(){
              if(!App.isNative){
                  return JSON.parse(sessionStorage.getItem('sso'))
              }
              return new Promise((resolve,reject)=>{
                  YztApp.getSSOTicket((status,data)=>{
                      if(status==='success' && data){
                          resolve({ssoTicket:data.SSOTicket,timestamp:data.timestamp,sign:data.signature})
                      }
                      else{
                          reject('native api call error')
                      }
                  })
              })
          }

          (async function(){
              let sso = await getSSO.apply(this);
              try{
                api.postCashier({
                    userId:sessionStorage.getItem("clientNo"),
                    orderNo:order.result.orderNo,
                    payOrderNo:order.result.payOrderNo,
                    channel:CHANNEL,
                    channelSecond:CHANNELSECOND,
                    platId:ORDERPLATFORM,
                    payClassify:PAYCLASSIFY,
                    hook:next,
                    from:'wap-chaoshi',
                    customId:'',
                    productSide: '',
                    ...sso
                })
              }
              catch(e){
                  // this.setState({
                  //     showDialog: !this.state.showDialog,
                  //     isHandle: !this.state.isHandle,
                  //     errorContent: e
                  // })
                  this.showError(e)
              }
          }).bind(this)()

    }
    else if(order.error){
      this.setState({
        isHandle:false
      })
      // this.setState({
      //     isHandle:false,
      //     isModalVisible: true,
      //     content: `${order.errorMessage}`,
      //     goto: () => {
      //         this.setState({isModalVisible: false})
      //     }
      // })
      this.showError(order.errorMessage)
    }
  }
  render(){
    let accountInfo = this.props.accountInfo
    let productDetail = this.props.productDetail
    return (
        <div>
            {
                !! accountInfo.isBegin && <Loading />
            }
            {
                !! accountInfo.error && <div style={{
                    marginTop: '50px',
                    textAlign: 'center',
                    lineHeight: '30px'
                  }}>{ accountInfo.errorMessage }</div>
            }
            {
                !! productDetail.error && <div style={{
                    marginTop: '50px',
                    textAlign: 'center',
                    lineHeight: '30px'
                  }}>{ productDetail.errorMessage }</div>
            }
            {
                !! accountInfo.isSuccess &&
                   productDetail.isSuccess &&
                  this.renderContent(accountInfo.result.responseDate,productDetail.result)

            }
            { this.state.isHandle && <Handle /> }
        </div>
    )
  }
  getProductName(){
    let name = getUrlParam('productName',btoa(sessionStorage.getItem('submitParam')))
    return name
  }
  renderContent(accountInfo,product){
    let errorView = (()=>{
        if (this.state.error){
            return <Toast content={this.state.error} />
        }
        return null
    })();
    return (
      <div>
        <div className="page-container supermarket_page">
            {
              /*<header className="brand-title1">
                    投保信息填写

                  <div className="brand-title-back"></div>

            </header>*/
          }
            <ul className="container">
                <li>
                    <p className="title"></p>
                </li>

                  <li id="selcity" style={{"display":"none"}}>
                      <p className="p-title" style={{"top": "-8px"}}>常住地址</p>
                      <input type="text" name="areacode"  value={this.state.city.join('')} onTouchTap={()=>{
                        this.setState({
                          showCity:true,
                          showKeyBoard:false
                        })
                      }}/>
                  </li>

                <li>
                  <p className="p-title" style={{"top": "-8px"}}>常住地址</p>
                    <input  type="text" name="address"  value={this.state.address}
                      onChange = {::this.onChangeAddress}
                     onBlur={
                      (e)=>{
                        sessionStorage.setItem("address",e.currentTarget.value)
                      }
                    } />
                </li>

                <li>
                    <p className="p-title" style={{"top": "-8px"}}>电子邮箱</p>
                    <input className="email" type="text" name="email" value={this.state.email}
                      onChange = {::this.onChangeEmail}
                     onBlur={
                      (e)=>{
                        sessionStorage.setItem("email",e.currentTarget.value)
                      }
                    }/>
                </li>
            </ul>
            <p style={{'height':'20px', 'border':0, 'textAlign':'center'}} className="welfare_tips"></p>

            <div className="information">
                <table>
                  <tbody>
                    <tr>
                        <td style={{'textAlign':'left'}} colSpan="2">投保信息</td>
                    </tr>
                    <tr>
                        <td className="t-title">产品名称</td>
                        <td>{
                          product.productName
                        }</td>
                    </tr>
                    <tr>
                        <td className="t-title">投保金额({product.unit==='0'?'':'万'}元)</td>

                        <td id="money" style={{color: '#3b88e0'}}>{sessionStorage.getItem('amount')}
                        {
                          /*
                            <input type="text" style={{'textAlign':'right'}} name="amount" value={sessionStorage.getItem('amount')}  />
                          */
                        }</td>
                    </tr>
                    <tr>
                        <td className="t-title">投保人姓名</td>
                        <td>{accountInfo.memberName}</td>
                    </tr>

                    <tr>
                        <td className="t-title">性别</td>
                        <td>{accountInfo.memberSex == 'M'?"男":"女"}</td>
                    </tr>

                    <tr>
                        <td className="t-title">证件类型</td>
                        <td>{accountInfo.memberCertype==='1'?'身份证':accountInfo.memberCertype==='2'?'护照':accountInfo.memberCertype==='3'?'军官证或士兵证':accountInfo.memberCertype==='6'?'港澳通行证/回乡证或台胞证士':accountInfo.memberCertype==='0'?'其他':'户口本' }</td>
                    </tr>
                    <tr>
                        <td className="t-title">证件号码</td>
                        <td>{accountInfo.memberIdno}</td>
                    </tr>
                    {

                      <tr>
                          <td className="t-title">出生日期</td>
                          <td>{accountInfo.memberBirthDate}</td>
                      </tr>

                    }

                    <tr>
                        <td className="t-title">手机号码</td>
                        <td>{accountInfo.memberMobileNo}</td>
                    </tr>
                    </tbody>
                </table>
                <div className="agreement">
                    <p>
                      <span id="check" onTouchTap={(e)=>{
                        if (typeof (pa_sdcajax) === 'function') {
                         pa_sdcajax('WT.ti', '用户信息填写页_点击_阅读并同意' ,true)
                        }

                        ISCHECK = !ISCHECK
                        ISCHECK ? (e.target.className = "changecolor") : (e.target.className = "")
                      }}
                      ></span>
                      <text>我已阅读并同意</text>
                      <ins className="ins-text" onTouchTap={
                        ()=>{
                          if (typeof (pa_sdcajax) === 'function') {
                           pa_sdcajax('WT.ti', '用户信息填写页_点击_保险条款' ,true)
                          }
                          this.onClickGuarantee( 1 , JSON.stringify(product.insuranceClauseList))
                        }
                        }>《保险条款》、</ins>
                      <ins className="ins-text" onTouchTap={
                        ()=>{
                          if (typeof (pa_sdcajax) === 'function') {
                           pa_sdcajax('WT.ti', '用户信息填写页_点击_投保须知' ,true)
                          }
                          this.onClickGuarantee( 4 , product.insuranceNotice)
                        }
                        }>《投保须知》</ins>
                    </p>
                    <span>并完全理解和接受上述文件的全部内容。本人的投资决策完全基于本人的独立自主判断做出，并且原承担该项目所产生的相关风险和全部后果</span>
                </div>
            </div>
            <div className="btn" ><button style={{'width':'100%'}}  onTouchTap={()=>{
              if (typeof (pa_sdcajax) === 'function') {
               pa_sdcajax('WT.ti', '用户信息填写页_点击_确认投保' ,true)
              }
              if(!ISCHECK) {
                // this.setState({
                //     isHandle:false,
                //     isModalVisible: true,
                //     content: "请阅读并同意《长生鑫得益一号相关协议》",
                //     goto: () => {
                //         this.setState({isModalVisible: false})
                //     }
                // })
                this.showError("请阅读并同意《保险条款》、《投保须知》")
                return
              }
              let address = document.getElementsByName("address")[0].value;
              let email_v = document.getElementsByName("email")[0].value;
              //let areacode = document.getElementsByName("areacode")[0].value;
              if(!address ||  !email_v ){
                  this.showError("页面需填写内容都是必填项，请核实")
                  return
              }//console.log(address.length)
              if(address.length < 8){
                this.showError("常住地址长度不能少于8个汉字")
                return
              }

              //check email
              let error = email(email_v)
              if(error){
                this.showError(error)
                return
              }

              let data ={
                source:sessionStorage.getItem('source'),//内部渠道		String	N	需场传入
                activity:sessionStorage.getItem('activity'),//外部渠道		String	N	需场传入
                productId:getUrlParam("productId") ,//产品Id		String	Y
                productCode:getUrlParam("productCode"),//产品代码		String	Y	如果是套餐 可以填产品详情中套餐的productInsuranceCode
                insurancePeriod:product.insurancePriod,//保险期限		String	Y	保险期限
                insurancePriodUnit:product.insurancePriodUnit,//保险期限单位		String	Y	Y年，M月，D天
                insurantUseProvinceNo:'000',//投保人常住省编码		String	Y
                insurantUseCityNo:'000',//投保人常住市编码		String	Y
                insurantUseRegionNo:'000',//投保人常住区编码		String	Y
                insurantUseContactAdrress:address,//投保人常用联系地址		String	Y	以中划线“-”拼接。如安徽省-蚌埠市-龙湖区
                annualPremium:sessionStorage.getItem("amount"),//标准保费		Number	Y
                insuranceEndTime:product.insurancePriod,//保险止期		String	Y	为详情接口：insurancePriod（保障期限）
                email:email_v,//投保人邮箱		String	Y
                transactionCode:'WNX04'//交易报文类型		String	Y	此处请填：
              }
              this.props.submitOrder(data)
            }}>确认投保</button></div>
        </div>
        { !!this.state.showKeyBoard && <KeyBoard increment={::this.incrementPayPassword} decrement={::this.decrementPayPassword}
           hide={::this.hideKeyboard}/>
        }
        { !!this.state.showCity && <City increment={::this.incrementCity}  hide={::this.hideCity}/>
        }

        {
          /*
          <!-- 遮罩层  点击改变金额和城市选择是显示 -->
          */
        (!!this.state.showCity || !! this.state.showKeyBoard) &&  <div className="mask">
          </div>
        }
        {
            <ReactCSSTransitionGroup transitionName="error" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
                {errorView}
            </ReactCSSTransitionGroup>
        }
        { this.state.isHandle && <Handle /> }
      </div>
    );
  }

}

export default Submit
