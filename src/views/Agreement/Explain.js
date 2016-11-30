import React from 'react'
import {App, YztApp} from 'utils/native'

export default class Explain extends React.Component {

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
    const { title } = this.props.route
    return (
      <div>
        {
          !App.isHighVersion &&
          <header className="brand-title">
            <span className="brand-title-back" onTouchTap={::this.onClickBack}></span>
            {title}
          </header>
        }

        <section className="protocol-text">
          <iframe
            width="100%"
            height={window.screen.height + 'px'}
            style={{border: 'none'}}
            src={decodeURIComponent(this.props.location.query.url)}
          >
          </iframe>
        </section>
      </div>
    )
  }
}
