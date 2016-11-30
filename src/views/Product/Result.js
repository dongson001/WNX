import React from 'react'
import {App, YztApp} from 'utils/native'
import 'styles/submitStatus.less'
export default class ProductResult extends React.Component {

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
        <div style={{"position": "fixed","top": 0, "bottom": 0,  "left": 0,"right": 0,"background":"#fff"}}>
          <div className="page-container supermarket_page">
            <header className="brand-title1">
                投保结果
            </header>

            <div>
              <div className="status_banner">
                  <p>投保申请已受理</p>
              </div>
              <div className="status_btn"><button onTouchTap={
                ()=>{

                    if (typeof (pa_sdcajax) === 'function') {
                     pa_sdcajax('WT.ti', '投保结果页_点击_返回' ,true)
                    }

                  this.props.history.pushState(null, '')
                }.bind(this)
              }>返回</button></div>

            </div>
          </div>
        </div>
      )
    }


}
