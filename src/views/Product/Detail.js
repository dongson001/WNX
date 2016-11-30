import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { getProductDetail, getUpdateInfo, resetUpdateInfo,loginAccountFail ,resetProductDetail} from 'actions'
import * as api from 'api'
import incinerator from 'hooks/incinerator'
import Utils from 'lodash/core'
import Loading from 'components/loading'
import Modal from 'components/modal'
import Handle from 'components/handle'
import { getUrlParam } from 'utils/getUrlParams'
import {format,addDays,addWeeks,addMonths,addYears}  from "utils/date"
import {App, YztApp} from 'utils/native'
import dateformat from 'dateformat'


const FOR_SALE = '0';//正常销售中
const TO_BE_SALE ='1'//将售
const STOP_SALE = '2';//下架
const SOLD_OUT = '3';//售罄
const HALT_SALE = '4'//暂时停售

@connect(
    state => ({
        productDetail: state.productDetail,
        getUpdateInfoBegin: state.updateInfo.getUpdateInfoBegin,
        getUpdateInfoResult: state.updateInfo.getUpdateInfoResult,
        account: state.account,
        resetUpdateInfo:state.updateInfo.resetUpdateInfo,
        updateInfo: state.updateInfo
    }),
    {
        getProductDetail,
        getUpdateInfo,
        resetUpdateInfo,
        resetProductDetail,
        loginAccountFail
    }
)

class Detail extends React.Component {
  state =  {
    page : '0',
    isModalVisible:false,
    isHandle:false
  }

  static propTypes = {
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      params: PropTypes.object.isRequired,
      productDetail: PropTypes.object.isRequired,
      getProductDetail: PropTypes.func.isRequired,
      resetProductDetail: PropTypes.func.isRequired,
      getUpdateInfo: PropTypes.func.isRequired,
      resetUpdateInfo: PropTypes.func.isRequired
  }

  componentWillMount() {
      const [source, activity] = [getUrlParam("source"), getUrlParam("activity")]
      if (!!source) {
          sessionStorage.setItem('source', source)
      }
      if (activity) {
          sessionStorage.setItem('activity', activity)
      }
      //App.oldVersion.call('isShare', 'true')
      App.nativeCallbacks.goback = function (){
          this.onClickBack()
      }.bind(this)
      YztApp.setTitle(this.props.route.title)

      let productId = getUrlParam('productId') || this.props.routeParams.productId,
      productCode = getUrlParam('productCode') || this.props.routeParams.productCode
      this.props.getProductDetail(productId,productCode )

      this.setState({
        page:this.props.routeParams.page || '0'
      })
  }
  componentWillReceiveProps(nextProps) {
    const {
      history,
      checkResult,
      productDetail,
      resetUpdateInfo,
      getUpdateInfoBegin,
      updateInfo
    } = nextProps
    //console.log(updateInfo)
    if (updateInfo.getUpdateInfoBegin) {
        this.setState({
            isHandle: true
        })
    }
    if (!updateInfo.getUpdateInfoBegin) {
        this.setState({
            isHandle: false
        })
    }
    if (updateInfo.getUpdateInfoResult) {
        if(updateInfo.getUpdateInfoResult.errorMessage){ //获取升级跳转数据失败
            this.setState({
                isHandle:false,
                isModalVisible: true,
                content: `${nextProps.getUpdateInfoResult.errorMessage}，点击确认返回详情页`,
                goto: () => {
                    resetUpdateInfo()
                    this.setState({isModalVisible: false})
                }
            })
            return
        }
        //根据getUpdateInfoResult跳转升级  升级之后判断18岁
        this.goUpdate(nextProps.getUpdateInfoResult)
    }
  }
  componentWillUnmount(){console.log("----unmount----")
    this.props.resetUpdateInfo()
  }
  onClickBack() {
    if(this.state.page != "0"){
      this.setState({
        "page":"0"
      })
    }else{
      App.oldVersion.call('toFlagshipStore', 'invest')
      return
    }
  }
  //投资按钮点击
  goHandler(detail){
        // if(!App.IS_YZT ){
        //     return;
        // };
      // YztApp.getLoginStatus((status,data)=>{
      //     if(status==='success' && (!data.clientNo||(data.loginStatus == '0'))){//未登录先去登录
      //         YztApp.accessNativeModule('patoa://pingan.com/login')
      //         return;
      //     }
      //     YztApp.getSSOTicket((status,data)=>{
      //         if(status==='success' && data && data.signature){
      //             this.props.getUpdateInfo(data)
      //         }
      //     })
      // })
      this.props.getUpdateInfo()
  }
  goUpdate(data){
      //这时候需要存储下sso让购买页面能拿到
      if(!App.isNative){
          sessionStorage.setItem('sso',JSON.stringify({ssoTicket:data.SSOTicket,
              timestamp:data.timestamp,
              sign:data.signature}))
      }
      let detail = this.props.productDetail.result
      let submitParam = {
        productName : encodeURIComponent(detail.productName),
        unit : detail.unit || "0",
        investmentAmount : detail.investmentAmount || "1000",
        increaseAmount : detail.increaseAmount || "1000",
        sigleOrderQuota : detail.sigleOrderQuota || "190000",
        singlePersonQuota : detail.singlePersonQuota || "10000",
        residualAmount : detail.residualAmount|| "0"
      }
      //save params
      sessionStorage.removeItem('submitParam');
      sessionStorage.setItem('submitParam',JSON.stringify(submitParam));
      sessionStorage.setItem('clientNo',data.clientNo);

      let urlMap = api.getUpdateUrl(),
          symbol = data?data.targetURLSymbol:'';
      if(symbol && urlMap[symbol]){//跳转升级
          let productDetail = this.props.productDetail.result;
          let {origin,pathname,hash,href,search} = location;
          let pre  = encodeURIComponent(`${href}`),
              next = encodeURIComponent(`${origin}${pathname}${search}&updated=true${hash}`);

          location.href = urlMap[symbol]+`?preLink=${pre}&nextLink=${encodeURIComponent(next)}`
      }
      if(symbol && symbol==='04'){//查询是否满足18岁

        this.goSubmit();
      }
  }

  goSubmit(){
    //this.props.history.pushState(null, encodeURIComponent(api.NEXTLINK))
    this.props.history.pushState(null, api.NEXTLINK)
  }

  detailArray(){
    return {
      '1':'insuranceClauseList',
      '2':'productDescUrl',
      '3':'insuranceStatement',
      '4':'insuranceNotice',
      '5':'insuranceTips',
      '6':'urlCommonIssue',
      '7':'urlLiPeiFuWu',
      '8':'insuranceScope',
      '9':"avoid"
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

  renderContent(detail) {
    return(
      <div className="page-container supermarket_page">
        <div className="banner">
          <header className="brand-title">
              {detail.productName}
          </header>
          <div className="history">
                <div className="hisText">历史年化结算利率</div>
                <div className="hisNum">{detail.historicalYield}</div>
                <div className="hisList"><span className="one">{detail.productSlogan}</span></div>
                {
                  /*
                   在售状态 停售 下架状态此处隐藏
                  */
                  //detail.productStatus == FOR_SALE &&   <div className="balance_show">已售金额：{detail.salesAmount?detail.salesAmount:0}{detail.unit==='0'?'':'万'}元</div>
                }
                {
                  /*
                  // <div className="progress"><div className="progress1"></div></div>
                   <!-- 将售状态 添加hide是隐藏的状态 -->
                  */
                  detail.productStatus === TO_BE_SALE &&   <div className="balance_show">即将开售</div>
                }
                {
                  detail.productStatus === SOLD_OUT && <div className="balance_show">产品已被抢购一空，请期待下期</div>
                }
                {
                  detail.productStatus === SOLD_OUT && <div className="shouqing"></div>
                }
            </div>
        </div>
        {
          /*临时停售不显示*/
          detail.productStatus !== HALT_SALE && <div className="network">销售服务网点：京、沪、浙、苏、川地区</div>
        }
        {
          /*
          <!-- 停售状态 -->
          */
          detail.productStatus === HALT_SALE && <div className="updating red">系统升级中哟，再等等就能买了</div>
        }

        <table className="investment">
          <tbody>
            <tr className="title">
                <td >建议最低持有期</td>
                <td>起购金额</td>
            </tr>
            <tr className="content">
                <td>{detail.lockPeriod}{detail.lockPeriodUnit==='Y'?"年": detail.lockPeriodUnit==='M'?"月":"天"}</td>
                <td>{detail.investmentAmount}{detail.unit==='0'?'':'万'}元</td>
            </tr>
          </tbody>
        </table>

        <div className="qixi">
          <div className="qixidata">
            <ul>
              <li className="color"></li>
              <li className="color1"></li>
              <li className="color1"></li>
              <li className="color1"></li>
            </ul>
          </div>

        <table className="qixi_table">
          <tbody>
            <tr className="f-s13">
              <td className="qixi_color">投保日</td>
              <td className="qixi_color1">起息日</td>
              <td className="qixi_color1">免费领取日</td>
              <td className="qixi_color1">{detail.insurancePriod}{detail.insurancePriodUnit==='Y'?"年": detail.insurancePriodUnit==='M'?"月":"天"}</td>
            </tr>
            <tr className="f-s12">
              <td className="col-9d9d9d">{detail.systemTime || dateformat(new Date(), 'yyyy-mm-dd', true)}</td>
              <td className="col-9d9d9d">
              {

                 dateformat(addDays(detail.systemTime,1), 'yyyy-mm-dd', true)
              }
              </td>
              <td className="col-9d9d9d">
              {

                 dateformat(addYears(addDays(detail.systemTime,1),parseInt(detail.lockPeriod)), 'yyyy-mm-dd', true)
              }
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        </div>
        <ul className="details">

          <li>
            <p className="left">犹豫期</p>
            <p className="right" style={{"lineHeight":"15px"}}>{detail.hesitatePeriodDesc}</p>
          </li>

          <li>
            <p className="left">风险等级参考</p>

            <p className="right">
              {detail.riskLevel ==='00'?"不限":detail.riskLevel ==='01'?"极低风险":detail.riskLevel ==='02'?"低风险":detail.riskLevel ==='03'?"中等风险":detail.riskLevel ==='04'?"高风险":"极高风险"}
            </p>
          </li>

          {/*<li>
            <p className="left">投保年龄</p>
            <p className="right">持有第二代居民身份证</p>
          </li>*/}
          <li>
            <a onTouchTap={
               () => {
                 if (typeof (pa_sdcajax) === 'function') {
                  pa_sdcajax('WT.ti', '产品详情页_点击_投保须知' ,true)
                }
                this.onClickGuarantee(4,detail.insuranceNotice)
               }
             }>投保须知</a>
          </li>
          <li>
            <a onTouchTap={
               () => {
                 if (typeof (pa_sdcajax) === 'function') {
                  pa_sdcajax('WT.ti', '产品详情页_点击_保险条款' ,true)
                }
                this.onClickGuarantee(1,JSON.stringify(detail.insuranceClauseList))
               }
             }>保险条款</a>
          </li>
          <li>
            <a onTouchTap={
               () => {
                 if (typeof (pa_sdcajax) === 'function') {
                  pa_sdcajax('WT.ti', '产品详情页_点击_投保声明' ,true)
                }
                this.onClickGuarantee(3,detail.insuranceStatement)
               }
             }>投保声明</a>
          </li>
          <li>
            <a onTouchTap={
               () => {
                 if (typeof (pa_sdcajax) === 'function') {
                  pa_sdcajax('WT.ti', '产品详情页_点击_产品说明书' ,true)
                }
                this.onClickGuarantee(2,detail.productDescUrl)
               }
             }>产品说明书</a>
          </li>
          <li>
            <a onTouchTap={
               () => {
                 if (typeof (pa_sdcajax) === 'function') {
                  pa_sdcajax('WT.ti', '产品详情页_点击_更多详情' ,true)
                }
                 this.props.history.pushState(null, `/guaranteeList`)
               }
             }
            >更多详情</a>
          </li>

        </ul>
        <div className="csrenshou">
          <p className="text">长生人寿</p>
          <p className="text1">本产品由长生人寿保险有限公司提供</p>
          <p className="text1">客服电话：400-820-8599</p>
        </div>
        <div className="csrenshou">
          <p className="text1">特此声明：本页面相关产品系保险公司在一账通平台开设的直销网店，保险业务由保险公司提供，一账通不承担任何责任。</p>
        </div>
        {
          /*
          <!-- 停售 下架 btn 隐藏 -->
          */
        }

        <div className="btn">
            <div>
                <p>起投金额{detail.investmentAmount}{detail.unit==='0'?'':'万'}元</p>
                <p>按{detail.increaseAmount}{detail.unit==='0'?'':'万'}元的倍数递增</p>
            </div>

          {
            detail.productStatus === FOR_SALE && <button className="basic_btn" onTouchTap={
              ()=>{
                if (typeof (pa_sdcajax) === 'function') {
                 pa_sdcajax('WT.ti', '产品详情页_点击_立即投保' ,true)
               }
                //是否已登录//账户升级  //跳转到新的页面
                this.goHandler(detail)
              }
            }>立即投保</button>
          }
          {
            /*
            <!-- 将售状态 添加hide是隐藏状态-->
            */
            detail.productStatus === TO_BE_SALE && <button className="basic_btn1">敬请期待</button>
          }

          {
            /*
            <div>
              <p>抢购倒计时</p>
              <p className="time">300天22小时03分</p>
            </div>
            */
          }
          {
            /*
            <!-- 售罄状态的按钮 -->
            */
            detail.productStatus === SOLD_OUT && <button className="basic_btn2">抢购结束</button>
          }

          {this.state.loading && <div style={{position: 'fixed',top:'0px',width: '100%'}}><Loading /></div>}

        </div>
      </div>
    )
  }
  renderAnouncement(detail){
    return (
      <div className="page-container supermarket_page">
              <header className="brand-title1" >
                      更多详情
              </header>
              <ul className="details">
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 1,detail.insuranceClauseList)}>保险条款</a>
                  </li>
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 2,detail.productDescUrl)}>产品说明书</a>
                  </li>
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 3,detail.insuranceStatement)}>投保声明</a>
                  </li>
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 4 , detail.insuranceNotice)}>保险须知</a>
                  </li>
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 5 , detail.insuranceTips)}>人身投保揭示书</a>
                  </li>
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 6 , detail.urlCommonIssue)}>常见问题</a>
                  </li>
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 7,detail.urlLiPeiFuWu)}  >理赔服务</a>
                  </li>
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 8 , detail.insuranceScope)}>保障范围</a>
                  </li>
              </ul>
      </div>
    )
  }
  renderAvoid(detail){
    return (
      <div className="page-container supermarket_page">
              <header className="brand-title1" >
                      免责声明
              </header>
              <div className="brand-title-content">
                {detail.insuranceStatement}
              </div>
      </div>
    )
  }
  render() {
    const { productDetail, history } = this.props
    const { title } = this.props.route
    const state = this.state
    return (
        <div>
            {
                !! productDetail.isBegin && <Loading />
            }
            {
                !! productDetail.error && <div style={{
                    marginTop: '50px',
                    textAlign: 'center',
                    lineHeight: '30px'
                  }}>{ productDetail.errorMessage }</div>
            }
            {
                !! productDetail.isSuccess && (function(){
                  switch(state.page){
                    case '0'://详情
                      return (
                        <div>
                          {this.renderContent(productDetail.result)}
                        </div>
                      )
                      break;
                    case '1'://更多详情
                      return (
                        <div>
                          {this.renderAnouncement(productDetail.result)}
                        </div>
                      )
                      break;
                    case '2'://免责声明
                      return (
                        <div>
                          {this.renderAvoid(productDetail.result)}
                        </div>
                      )
                      break;
                    case '3'://
                      return (
                        <div>
                          {
                            //this.inputAmount(productDetail.result)
                          }
                        </div>
                      )
                      break;
                    default :
                      return (
                          <div>
                            {
                              this.renderContent(productDetail.result)
                            }
                          </div>
                      )
                      break;
                  }

                }.bind(this))()
            }
            {
                !!this.state.isModalVisible &&
                <Modal content = { this.state.content } goto = { this.state.goto } mutil = "true" />
            }
            { this.state.isHandle && <Handle /> }

        </div>)
  }
}

export default Detail
