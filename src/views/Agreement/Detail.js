import React from 'react'
import {App, YztApp} from 'utils/native'

export default class Detail extends React.Component {

  componentWillMount() {
    YztApp.setTitle(this.props.route.title)
    App.nativeCallbacks.goback = function (){
      this.onClickBack()
    }.bind(this)
  }
  componentDidMount() {
    const promotionContent = sessionStorage.getItem('productIntroduce')
    const content = promotionContent.match(/<\/span><br\/>(.+)/g)
    this.refs.content.innerHTML = content
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

        <section className="explainDetail" ref="content">
        </section>
      </div>
    )
  }
}
