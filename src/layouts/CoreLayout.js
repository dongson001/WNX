import React from 'react'
import { connect } from 'react-redux'
import app from 'utils/native'
import {userLogin} from 'actions'
import Spinner from 'components/spinner'

const EXCLUDE = [''];

@connect(state => ({
  login: state.login
}), {
  userLogin
})
//对非入口的处理
export default class CoreLayout extends React.Component {
  static propTypes = {
    children : React.PropTypes.element
  }
  state = {
    pending:false
  }
  componentDidMount(){
    let path = this.props.location.pathname;
    this.common(path);
  }
  componentWillReceiveProps(nextProps){
    let path = nextProps.location.pathname
    if(!EXCLUDE.some((item)=>item==path)){
      if(this.props.location.pathname != path){
        this.setState({pending:true});
      }
      else{
        !nextProps.login.pending && this.setState({pending:false});
      }
    }
    if(nextProps.login.pending){
      return;
    }
    if(!EXCLUDE.some((item)=>item==path)){
      this.common(path);
    }
  }
  common(path){
    let {isLogin,sso,pending,error} = this.props.login;
    //如果接口没有失败且没有登录态
    if(!error && !pending && !EXCLUDE.some((item)=>item==path)){
      console.log(path);
      this.props.userLogin();
    }
  }
  render () {
    if(App.IS_IOS){
      YztApp.configureShare({},false);
    }
    let {isLogin,sso,error,pending} = this.props.login,children = this.props.children;
    let {routes} = this.props;
    if(routes && routes[1]){
      YztApp.setTitle(routes[1].title||'');
    }
    if(error){
      return <div className="kb-tips">{error}</div>
    }
    if( App.IS_YZT && !sso && routes[1] && !EXCLUDE.some((item)=>item==routes[1].path)){
    //if( !sso && routes[1] && !EXCLUDE.some((item)=>item==routes[1].path)){
      return <Spinner/>;
    }

    if(this.state.pending){
      //return <Spinner/>;
    }

    return (
      <div className='page-container'>
        <div className={App.IS_YZT?'':'view-container'}>
          {children}
        </div>
      </div>
    );
  }
}
