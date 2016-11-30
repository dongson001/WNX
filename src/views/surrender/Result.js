import React from 'react'
import {App, YztApp} from 'utils/native'
import { connect } from 'react-redux'
import{resetSurrender} from 'actions'
import * as api from 'api'
import 'styles/submitStatus.less'

@connect(
  state => ({
    surrender : state.surrender
  }), {
    resetSurrender
  }
)
export default class Result extends React.Component {
    componentWillMount() {
        YztApp.setTitle(this.props.route.title)
        App.nativeCallbacks.goback = function (){
            this.onClickBack()
        }.bind(this)
    }
    onClickBack() {
        history.go(-1)
    }

    render() {
      return (
        <div>
          {this.renderResult()}
        </div>
      )
    }
    renderResult(){
      const result = this.props.surrender
      // const result = {
      //   error:false,
      //   isBegin:false,
      //   isFinish:true,
      //   isSuccess:true,
      //   responseCode:'000000',
      //   result:{
      //     dateCreated:"2016-11-01 16:12:02",
      //     drawOrderNo:"20161101012498391",
      //     orderAmount:1000,
      //     orderStatus:"3003",
      //     productId:"10017920",
      //     productName:"长生人寿鑫得益三号"
      //   }
      // }
      return(
        <div>
          <div className="page-container supermarket_page">

            {
              (result.responseCode == '000000') &&
              <div>
                <div className="status_banner">
                    <p>退保申请已提交</p>
                </div>
                <div className="status_btn"><button onTouchTap={
                  ()=>{
                    if (typeof (pa_sdcajax) === 'function') {
                     pa_sdcajax('WT.ti', '退保成功页_点击_确定' ,true)
                    }
                    location.href = api.ZICHAN + `?productId=${getUrlParam('productId')}&orderNo=${getUrlParam('orderNo')}`
                    //YztApp.accessNativeModule('patoa://pingan.com/user/order', ()=> {  })
                  }
                }>确定</button></div>
                {/*<div className="submit_state status_state">
                    <table><tbody>
                        <tr>

                            <td rowSpan="3" className="line"><div><ul><li className="other_line"></li><li style={{'top':'65px;'}}></li></ul></div></td>

                            <td><p className="other_color">提交申请，资金冻结</p><span>{result.result.dateCreated}</span></td>
                        </tr>
                        <tr>
                            <td><p className="other_color">退保成功</p><span>T+1日</span></td>
                        </tr>
                    </tbody></table>
                </div>*/}
              </div>
            }
            {
              (result.error) &&
              <div>
                <div className="failstatus_banner">
                  <p>{result.errorMessage || "系统繁忙，请稍后再试"}</p>
                </div>
                <div className="failstatus_btn"><button onTouchTap={
                  ()=>{
                    if (typeof (pa_sdcajax) === 'function') {
                     pa_sdcajax('WT.ti', '退保失败页_点击_再试一次' ,true)
                    }
                    this.props.resetSurrender()
                    this.props.history.pushState(null, '/surrender/surrender/')
                  }
                }>再试一次</button>

                </div>
              </div>
            }
          </div>
        </div>
      )
    }

}
