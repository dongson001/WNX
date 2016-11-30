import React, {
    PropTypes
} from 'react'
import {
    connect
} from 'react-redux'
import {
    loginAccountFail
} from 'actions'
import Loading from 'components/loading'
import Modal from 'components/modal'
import {App, YztApp} from 'utils/native'
import * as api from 'api/index'
import { getUrlParam } from 'utils/getUrlParams'
import incinerator from 'hooks/incinerator'


const CHANNEL = 1982;
const CHANNELSECOND = 1982003;
@connect(
    state => ({
        clientNo: state.account.clientNo
    }),
    {
        loginAccountFail
    }
)
class Welding extends React.Component {
    state = {
        isLoadingVisible:true,
        isModalVisible:false,
        error:null
    }

    componentWillMount() {
      let isBack = this.props.routeParams.isback
      if(isBack === 'toDetail'){//跳转
        this.props.history.pushState(null,"/product/detail/")
      }
        YztApp.setTitle(this.props.route.title)
        App.nativeCallbacks.goback = function (){
            this.onClickBack()
        }.bind(this)
    }

    componentWillReceiveProps(nextProps) {

    }
    onClickBack() {
        history.go(-1)
    }
    renderModal() {
        return (
            <Modal content = { this.state.content } goto = { this.state.goto } mutil = "true" />
        )
    }
    handlerFail(errMessage){
        this.setState({
            isLoadingVisible:false,
            isModalVisible: true,
            content: `${errMessage}，点击确认返回详情页`,
            goto: () => {
                this.setState({isModalVisible: false})
                let productId = getUrlParam('productId',atob(sessionStorage.getItem('params')))
                this.props.history.pushState(null,'')
            }})
    }
    componentDidMount() {
        (async function(){
            try{
                let auditRes = await api.checkIfAdult()//查看是否满足购买条件
                if(auditRes.responseCode !== '000000'){
                    this.handlerFail(auditRes.responseMessage)
                    return
                }
                let hash = location.hash
                let res = await api.orangeAccount({clientNo: sessionStorage.getItem('clientNo'),
                                                   channel:CHANNEL,
                                                   channelSecond:CHANNELSECOND,
                                                   orangeCallBackUrl:api.NEXTLINK,
                                                   orange:getUrlParam('resultCode',hash.replace(/^.*\?/,''))})
                incinerator('orangeAccount', res.responseCode, {
                    submit:()=>{
                        //去购买页面
                        //location.href = `${api.GLOBAL_ROUTE}#/product/buy/`
                        this.props.history.pushState(null,"/product/buy/" )
                    },
                    orange:()=>{
                        //去橙子开户
                        location.href = res.responseData.orangeURL
                        return
                    },
                    authenticate:()=>{
                        //去鉴权
                        let oxygen = `${api.OXYGEN}#/?nextLink=${encodeURIComponent(api.NEXTLINK)}`
                        location.href = oxygen
                        return;
                    },
                    unlogin:()=>{
                        this.props.loginAccountFail()
                    },
                    fail:()=>{
                        this.handlerFail(res.responseMessage)
                    }
                })
            }
            catch(err){
                console.log(err)
                this.setState({error:'当前网络异常，请检查您的网络设置'})
            }
        }).bind(this)()

    }
    render() {
        const {
            title
            } = this.props.route
        return (
            <div>
                {
                    !App.isHighVersion &&
                    <header className = "brand-title">
                      //  <span className = "brand-title-back" onTouchTap = {::this.onClickBack} ></span>
                        { title }
                    </header>
                }
                {
                    !!this.state.error && <div style={{
                    marginTop: '50px',
                    textAlign: 'center',
                    lineHeight: '30px'
                  }}>{this.state.error}</div>
                }
                {
                    !this.state.error && !!this.state.isLoadingVisible && < Loading></Loading>
                    }
                {
                    !this.state.error && !!this.state.isModalVisible && this.renderModal()
                }

            </div>
        )
    }
}

export default Welding
