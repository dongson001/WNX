import React, { PropTypes } from 'react'
import {App, YztApp} from 'utils/native'
import { getUrlParam } from 'utils/getUrlParams'

export default class Guarantee extends React.Component {
  state={
    error:false,
    errorMessage:'',
    loading:false,
    category:''
  }
  componentWillMount() {
    App.nativeCallbacks.goback = function () {
      this.onClickBack()
    }.bind(this)
    YztApp.setTitle(this.props.route.title)
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      category:nextProps.routeParams.category
    })
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
      '8':'insuranceScope',
      '9':'avoid',
      '10':'insuranceClauseListItems'
    }
  }
  getItemFsession(arrayCB){
    let ar ={}
    if(Object.prototype.toString.call(arrayCB) === '[object Function]')
      ar = arrayCB.call()
    return function(index){
      if(ar[index]) {
        return sessionStorage.getItem(ar[index])
      }
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
  renderList(commonIssue) {
    if(Object.prototype.toString.call(commonIssue) !== ['object Array']){
      return (<div></div>)
    }
    return(
        commonIssue.map((val, index) => {
          return(
            <div key={index}>
              <div className="guarantee-con-tit">
                Q:{val['Q']}
              </div>
              <div className="guarantee-con-info">
                A:{val['A']}
              </div>
            </div>
          )
      })
    )
  }
  renderClauseList(list){
    list = JSON.parse(list)
    if(Object.prototype.toString.call(list) !== '[object Array]'){
      return (<div></div>)
    }
    return(
        list.map((val, index) => {
          return(
            <div data-url={val.downloadUrl} onTouchTap={ (e)=>{
              this.saveItem2session(this.detailArray)("10",e.currentTarget.attributes.getNamedItem("data-url").nodeValue)
              let productId = getUrlParam("productId"),productCode = getUrlParam("productCode")
              this.props.history.pushState(null, `/guarantee/${productId}/${productCode}/10`)
            }} >
              《{val.name}》
            </div>
          )
      })
    )
  }
  renderString(insuranceNotice) {
    if(!insuranceNotice) return(<div className="guarantee-content">  </div>)
    else return(
      <div className="guarantee-content">
        {insuranceNotice}
      </div>
    )
  }
  renderUrl(url){
    if(!url) return
    return(
      <div>
        <section className="protocol-text">
          <iframe
            width="100%"
            height={window.screen.height + 'px'}
            style={{border: 'none'}}
            src={decodeURIComponent(url)}
          >
          </iframe>
        </section>
      </div>
    )
  }
  renderContent(category,value) {
    return(
      <div>
        {
          (category === '2'  || category === '6' || category === "10") ?
          this.renderUrl(value) :
          (category === '1' ) ?
          this.renderClauseList(value) :
          this.renderString(value)
        }
      </div>
    )
  }

  render() {
    const { history } = this.props
    const { title } = this.props.route
    const state = this.state
     //get value from sessionStorage
    let value = this.getItemFsession(this.detailArray)(this.props.routeParams.category)
    return (
      <div className="bg-fff" style={{"paddingBottom":"20px","background":"#fff"}}>
        {
          <header className="brand-title">
            {title}
          </header>
        }
        {
            !! this.state.error && <div style={{
                marginTop: '50px',
                textAlign: 'center',
                lineHeight: '30px'
              }}>{ this.state.errorMessage }</div>
        }
        {
            !this.state.error &&
              this.renderContent( this.props.routeParams.category,value)
        }
      </div>
    )
  }
}
export default Guarantee
