import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import * as api from 'api'
import incinerator from 'hooks/incinerator'
import Utils from 'lodash/core'
import Loading from 'components/loading'
import { getUrlParam } from 'utils/getUrlParams'
import {App, YztApp} from 'utils/native'
import { getProductDetail} from 'actions'
@connect(
    state => ({
        productDetail: state.productDetail
    }),
    {
        getProductDetail
    }
)

class GuaranteeList extends React.Component {
  state =  {
    isHandle:false
  }

  static propTypes = {
      history: PropTypes.object.isRequired,
      route: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired
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

  }

  onClickBack() {
    history.go(-1)
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

  renderAnouncement(detail){
    return (
      <div className="page-container supermarket_page">
              <header className="brand-title1" >
                      更多详情
              </header>
              <ul className="details">
                  <li>
                      <a onTouchTap={
                        ()=>{
                          if (typeof (pa_sdcajax) === 'function') {
                           pa_sdcajax('WT.ti', '更多详情页_点击_保障范围' ,true)
                          }
                          this.onClickGuarantee( 8 , detail.insuranceScope)
                      }}>保障范围</a>
                  </li>
                  <li>
                      <a onTouchTap={
                        ()=>{
                          if (typeof (pa_sdcajax) === 'function') {
                           pa_sdcajax('WT.ti', '更多详情页_点击_投保声明' ,true)
                          }
                          this.onClickGuarantee( 3,detail.insuranceStatement)
                      }
                        }>投保声明</a>
                  </li>
                  <li>
                      <a onTouchTap={
                        ()=>{
                          if (typeof (pa_sdcajax) === 'function') {
                           pa_sdcajax('WT.ti', '更多详情页_点击_投保声明' ,true)
                          }
                          this.onClickGuarantee( 6 , detail.urlCommonIssue)
                      }
                        }>常见问题</a>
                  </li>
                  <li>
                      <a onTouchTap={
                        ()=>{
                          if (typeof (pa_sdcajax) === 'function') {
                           pa_sdcajax('WT.ti', '更多详情页_点击_理赔服务' ,true)
                          }
                        this.onClickGuarantee( 7,detail.urlLiPeiFuWu)
                      }
                        }  >理赔服务</a>
                  </li>
                  {/*<li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 1,detail.insuranceClauseList)}>保险条款</a>
                  </li>
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 2,detail.productDescUrl)}>产品说明书</a>
                  </li>

                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 4 , detail.insuranceNotice)}>保险须知</a>
                  </li>
                  <li>
                      <a onTouchTap={this.onClickGuarantee.bind(this, 5 , detail.insuranceTips)}>人身投保揭示书</a>
                  </li>*/}


              </ul>
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
                !! productDetail.isSuccess && this.renderAnouncement(productDetail.result)

            }
        </div>)
  }
}

export default GuaranteeList
