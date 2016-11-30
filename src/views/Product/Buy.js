import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { createChecker, required, amount, minInteger, maxInteger, mod } from 'utils/checker'
import Modal from 'components/modal'
import Handle from 'components/handle'
import Utils from 'lodash/core'
import { getUrlParam } from 'utils/getUrlParams'
import {App, YztApp} from 'utils/native'
import * as api from 'api/index'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Toast from 'components/toast'

export default class Buy extends React.Component {

    constructor(props) {
        super(props);
        let queryObj = JSON.parse(sessionStorage.getItem("submitParam"))

        this.state = {
            amount: sessionStorage.getItem("amount"),
            error:'',
            showDialog: false,
            isHandle: false,
            queryObj :queryObj
        }
    }
    componentWillMount() {
        App.nativeCallbacks.goback = function (){
            this.onClickBack()
        }.bind(this)
        YztApp.setTitle(this.props.route.title)
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        })
    }
    validate(e){
        let {investmentAmount,increaseAmount,sigleOrderQuota} = this.state.queryObj

        investmentAmount = investmentAmount || 1000
        increaseAmount = increaseAmount  || 1000
        sigleOrderQuota = sigleOrderQuota || 199000
        const target = e.target?e.target:e;
        let error = ''

        if(target.checkValidity && !target.checkValidity()){
            error = '请输入整数';
        }
        else if(target.validity && !target.validity.valid){
            error = '请输入整数';
        }
        else if(target.value && (target.value<investmentAmount)){
            error = investmentAmount+'元起购';
        }
        else if(target.value && ((target.value-investmentAmount)%increaseAmount)!=0){
            error = "投保金额必须为"+increaseAmount+'元的整数倍';
        }
        else if(target.value && parseInt(target.value )> parseInt(sigleOrderQuota)){
            error = '单笔不能超过'+sigleOrderQuota+"元";
        }
        else if(!target.value){
            error = '金额不能为空';
        }
        if(error){
            return this.showError(error);
        }
        return false;
    }
    showError(error){
        this.setState({error:error})
        setTimeout(()=>{
            this.setState({error:null})
        },1500)
        return true;
    }
    onClickBack() {
      //this.props.history.pushState(null,"/product/welding/toDetail")
      this.props.history.pushState(null,"/product/detail/")
    }
    toWan(value,unit){
        if(unit == '1'){
          return value
        }
        else{
          return value/10000
        }
        return value
    }
    toggleDialog() {
        this.setState({
            showDialog: !this.state.showDialog
        })
    }
    getPlaceHolder(investment,increase,unit){
        //let investText = `${investment}${unit == '0'?"":"万"}元起购,`;
        let increaseText = `只能购买${increase}${unit == '0'?"":"万"}元整数倍`;
        //return investText+increaseText;
        return increaseText
    }
    submitOrder(){

        if (typeof (pa_sdcajax) === 'function') {
         pa_sdcajax('WT.ti', '投保金额填写页_点击_确定' ,true)
        }

      //校验
      let input = document.getElementsByTagName('input')[0],hasError;
      if(!input.checkValidity()||!input.validity.valid){
          this.showError('请输入整数');
          hasError = true;
      }else{
          hasError = this.validate({pattern:"^[1-9]\\d*00$",value:this.state.amount,notEmpty:true,title:'只能购买100元的整数倍'});
      }
      if(hasError){
          return;
      }
      //保存金额
      sessionStorage.setItem("amount",this.state.amount)
      //提交
      this.props.history.pushState(null,"/product/submit")
    }
    render() {
        const obj = this.state.queryObj
        const { title } = this.props.route
        let errorView = (()=>{
            if (this.state.error){
                return <Toast content={this.state.error} />
            }
            return null
        })();
        return (
            <div style={{"position": "fixed","top": 0, "bottom": 0,  "left": 0,"right": 0,"background":"#fff"}}>
                {
                    <header className="brand-title" style={{"background":"#cfa767"}}>
                        { title }
                    </header>
                }
                <section className="grid-box ma-t10">
                    <div className="row">
                        <div className="col-both">
                            <span>产品名称</span>
                        </div>
                        <div className="col-both" style={{"marginRight":'8px'}}>
                            <span>{ decodeURIComponent(obj.productName) }</span>
                        </div>
                    </div>
                </section>
                <section className="grid-box ma-t10">
                    <div className="row">
                        <div className="col-both">
                            <span>投保金额({obj.unit == '0'?"":"万"}元)</span>
                        </div>
                        <div className="col-both" style={{"marginRight":'8px'}}>
                            <input type="text" className="col-input col-input-right"
                                   style={{
                  fontSize: '12px',
                  width: '88%' }}
                                   pattern="[0-9]*"
                                   placeholder={::this.getPlaceHolder(parseFloat(obj.investmentAmount),parseFloat(obj.increaseAmount),obj.unit)}
                                   onChange={::this.onChangeAmount}
                                   value={this.state.amount}
                                   onBlur={
                                    (e)=>{
                                      sessionStorage.setItem("amount",e.currentTarget.value)
                                    }
                                   }
                            />
                        </div>
                    </div>
                </section>
                <div className="lastDiv">
                    <span className="limit">每笔最高{this.toWan(obj.sigleOrderQuota,obj.unit)}万元</span>

                </div>
                <div className="bankLimit-box"><a className="bankLimit" href="#/limit" style={{"color":'#cfa767'}}>银行限额</a></div>
                <div className="btn-box">
                    <button
                        class="buyBtn"
                        is
                        otype="button"
                        otitle="购买页_点击_提交订单"
                        onTouchTap={::this.submitOrder  }  >
                        确定
                    </button>
                </div>
                {/*<div className="buy-hint">
                    <p>温馨提示</p>
                    <p className="ma-t3">1.支付成功后不可撤单，存续期内不可提前赎回</p>
                    <p className="ma-t3">2.收益以实际到期回款为准</p>
                </div>*/}
                {
                    <ReactCSSTransitionGroup transitionName="error" transitionEnterTimeout={700} transitionLeaveTimeout={700}>
                        {errorView}
                    </ReactCSSTransitionGroup>
                }
                {this.state.isHandle && <Handle />}
            </div>
        )
    }
}
