import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {getSurrenderCharge,surrenderAction} from 'actions'
import Utils from 'lodash/core'
import Loading from 'components/loading'
import {App, YztApp} from 'utils/native'
import Modal from 'components/modal'
import Handle from 'components/handle'
import Pay from 'components/pay'
import KeyBoard from 'components/keyBoard'
import { getUrlParam } from 'utils/getUrlParams'
import {webtrends} from 'utils/webtrends'
import 'styles/surrender.less'
@connect(
  state => ({
    surrenderCharge:state.surrenderCharge,
    surrender:state.surrender
  }), {
    getSurrenderCharge,
    surrenderAction
  }
)

export default class Surrender extends React.Component {

  state =  {
    isHandle:false,
    isModalVisible: false,
    showHintsState:'',
    payPassword: ['', '', '', '', '', '']
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
  openPaySuite() {
    this.setState({
      showHintsState:4,
    })
  }
  cancelPaySuite() {
    this.setState({
      showHintsState:'',
      payPassword: ['', '', '', '', '', '']
    })
    webtrends("退保输入交易密码_点击_取消")
  }
  payOrder(){
      let surrenderChargeResult = this.props.surrenderCharge.result,
       param= {
        source:sessionStorage.getItem('source'),
        activity:sessionStorage.getItem('activity'),
        drawAmount:surrenderChargeResult.totalAmount,
        orderNo:getUrlParam("orderNo"),
        productId:getUrlParam("productId"),
        productCode:getUrlParam("productCode"),
        pwd:this.state.payPassword.join(''),
        transactionCode:'WNX06'
      }
      this.props.surrenderAction(param)
    webtrends("退保输入交易密码页_点击_确认支付")
  }
  componentWillMount(){
    YztApp.setTitle(this.props.route.title)
    App.nativeCallbacks.goback = function (){
        this.onClickBack()
    }.bind(this)

    let param ={
      productId : getUrlParam("productId"),
      productCode : getUrlParam("productCode"),
      amount : getUrlParam("amount"),
      orderNo : getUrlParam("orderNo"),
      unit : getUrlParam("unit")
    }
    this.props.getSurrenderCharge(param)
  }

  componentWillReceiveProps(nextProps){
    const { surrender, history } = nextProps
    if(surrender.isBegin){
      this.setState({
        isHandle: true
      })
    }
    if(surrender.isFinish)  {
      this.goResult()
    }
  }
  goResult(){
    this.props.history.pushState(null,"/surrender/result/")
  }
  onClickBack() {
      history.go(-1)
  }

  showPage(state){
    state = (state===0||state) ? state : ""
    this.setState({
      showHintsState:state
    })
  }

  render(){
    const { surrenderCharge, history,surrender } = this.props
    const { title } = this.props.route
    const state = this.state

    return (
        <div>
          {
              !! surrenderCharge.isBegin && <Loading />
          }
          {
              !! surrenderCharge.error && <div style={{
                  marginTop: '50px',
                  textAlign: 'center',
                  lineHeight: '30px'
                }}>{ surrenderCharge.errorMessage }</div>
          }
          {
              !! surrenderCharge.isSuccess &&
              this.renderContent()
          }
        </div>
    )
  }
  renderContent() {
    let surrenderChargeResult = this.props.surrenderCharge.result
    let unit = getUrlParam("unit")
    return (
        <div>
          <div className="page-container supermarket_page" style={{'paddingBottom': '328px'}}>

              <div className="surrender">
                  <table><tbody>
                      <tr>
                          <td className="label" style={{'width':'40%'}}><p className="one-title" onTouchTap={
                            ()=>{
                              if (typeof (pa_sdcajax) === 'function') {
                               pa_sdcajax('WT.ti', '退保页_点击_可退金额' ,true)
                              }
                              this.showPage(0)
                            }
                          }>可退金额({unit=='0'?"":"万"}元)</p></td>
                          <td><p className="element">￥{surrenderChargeResult.totalAmount}</p></td>
                      </tr>
                      <tr>
                          <td className="label" style={{'width':'40%'}}><p className="two-title"  onTouchTap={
                            ()=>{
                              if (typeof (pa_sdcajax) === 'function') {
                               pa_sdcajax('WT.ti', '退保页_点击_手续费' ,true)
                              }
                              this.showPage(1)
                            }

                          }>手续费({unit=='0'?"":"万"}元)</p></td>
                          <td><p className="element">￥{surrenderChargeResult.surrenderCharge}</p></td>
                      </tr>

                      {/*<tr>
                          <td colSpan="2" className="surrender-text"><p>**日退保，将按照**日的净值计算金额，并收取相关费用。</p></td>
                      </tr>*/}
                      <tr>
                          <td className="label" style={{'width':'40%'}}><p className="one-title" onTouchTap={
                            ()=>{
                              if (typeof (pa_sdcajax) === 'function') {
                               pa_sdcajax('WT.ti', '退保页_点击_退保须知' ,true)
                              }
                              this.showPage(2)
                            }
                          }>退保须知</p></td>
                          <td></td>
                      </tr>
                  </tbody></table>
              </div>
              <div className="surrender_btn"><button onTouchTap={
                ()=>{
                  if (typeof (pa_sdcajax) === 'function') {
                   pa_sdcajax('WT.ti', '退保页_点击_确认退保' ,true)
                  }
                  surrenderChargeResult.surrenderCharge != '0.00'
                  ?
                    this.showPage(3)
                  :
                  this.showPage(4)
                }

              }>确认退保</button></div>
              {
                surrenderChargeResult.surrenderCharge !=0 &&
                this.state.showHintsState === 3 &&
                <div>
                  <div className="popup">
                    <div className="prompt">
                        <p className="popup-prompt">提示</p>
                        <p className="popup-prompt prompt-text">现在退保需收取退保费用，请问是否继续？</p>
                        <div className="surrender_btn"><button className="prompt-btn"    onTouchTap={
                          ()=>{
                            if (typeof (pa_sdcajax) === 'function') {
                             pa_sdcajax('WT.ti', '退保页_收取保费提示弹框_点击_继续退保' ,true)
                            }
                            this.showPage(4)
                          }


                        }>继续退保</button></div>
                        <p className="popup-cancel" onTouchTap={
                          ()=>{
                            if (typeof (pa_sdcajax) === 'function') {
                             pa_sdcajax('WT.ti', '退保页_收取保费提示弹框_点击_取消' ,true)
                            }
                            this.showPage()
                          }
                        }>取消</p>
                    </div>
                  </div>
                  <div className="mask"></div>
                </div>
              }

                  {
                    /*
                      <!-- 退保手续费说明弹窗 -->
                    */
                  }
                  {
                    this.state.showHintsState === 1 &&
                    <div>
                      <div className="popup">
                        <div className="renew">
                            <p className="popup-title">退保手续费说明</p>
                            <p className="popup-text prompt-text">
                              本产品犹豫期15天，犹豫期内退保将无息退还您全部保费。犹豫期过后且在第一个保险单年度退保， 退保手续费为保单价值的5%，第二个保险单年度退保，退保手续费为保单价值的3%，第三个保险单年度退保退保手续费为保单价值的2%，满三年后退保无手续费用；
                            </p>
                            <button className="renew-btn" onTouchTap={

                              ()=>{
                                if (typeof (pa_sdcajax) === 'function') {
                                 pa_sdcajax('WT.ti', '退保页_退保手续费说明弹框_点击_知道了' ,true)
                                }
                                this.showPage()
                              }
                            }>知道了</button>
                        </div>
                      </div>
                      <div className="mask"></div>
                    </div>
                  }

                  {
                    /*
                      <!-- 退保须知弹窗 -->
                    */
                  }{
                    this.state.showHintsState === 2 &&
                    <div>
                      <div className="popup">
                        <div className="renew-know">
                            <p className="popup-title">退保须知</p>
                            <p className="popup-text prompt-text">退保申请提交后，长生人寿将进行退保审核，审核期一般为2个工作日，审核通过后，退保金额一般将于3个工作日内退至您的账户；</p>
                            <button className="renew-btn" onTouchTap={
                              ()=>{
                                if (typeof (pa_sdcajax) === 'function') {
                                 pa_sdcajax('WT.ti', '退保页_退保须知弹框_点击_知道了' ,true)
                                }
                                this.showPage()
                              }
                            }>知道了</button>
                        </div>
                      </div>
                      <div className="mask"></div>
                    </div>
                  }

                  {
                    /*
                      <!-- 退保金额说明弹窗 -->
                    */
                  }
                  {
                    this.state.showHintsState === 0 &&
                    <div>
                      <div className="popup">
                        <div className="renew-jine">
                            <p className="popup-title">退保金额说明</p>
                            <p className="popup-text prompt-text">本产品犹豫期15天，犹豫期内退保将无息退还您全部保费。犹豫期过后且在一年内退保，长生人寿将按合同约定收取5%的退保费用，一年后退保无手续费用；（鑫得益一号）</p>
                            <button className="renew-btn" onTouchTap={
                              ()=>{
                                if (typeof (pa_sdcajax) === 'function') {
                                 pa_sdcajax('WT.ti', '退保页_退保金额说明弹框_点击_知道了' ,true)
                                }
                                this.showPage()
                              }
                            }>知道了</button>
                        </div>
                      </div>
                      <div className="mask"></div>
                    </div>
                  }


              {
                /*
                  <!-- 继续退保 键盘显示 遮罩层显示 -->
                */
              }{
                this.state.showHintsState === 4 &&
                <div className=" surrender-keyboards">

                  <Pay password={this.state.payPassword} cancel={::this.cancelPaySuite} confirm={::this.payOrder}/>
                    <KeyBoard increment={::this.incrementPayPassword} decrement={::this.decrementPayPassword}
                       hide={this.showPage.bind(this,'')}/>
                    <div className="mask"></div>
                </div>
              }
          </div>
      </div>
    )
  }

}
