import React from 'react'
import {webtrends} from 'utils/webtrends'
class Modal extends React.Component {

  goto() {
    webtrends(this.props.otitle)
    this.props.goto()
  }
  render() {
    const { title, content, mutil, composite, cancel, goto, gotoText, otitle, otype,spetialClass} = this.props
    return (
      <div className="mask">
        <div className="popup-box">
          <div className="title warning">{title || '提示'}</div>
          <p className={spetialClass?spetialClass:"popup-warning"}>{content || '默认内容'}</p>
          {
            mutil &&
            <div className="popup-btns-box">
              <button class="btn btn-hollow btn-block"
                otitle={ otitle || ''}
                otype={ otype || 'button'}
                is
                onTouchTap={this.goto.bind(this)}>{gotoText || '确认'}</button>
            </div>
          }
          {
            composite &&
            <div className="popup-btns-box btn-box-both">
              <button className="btn btn-hollow" onTouchTap={cancel}>取消</button>
              <button className="btn btn-hollow" onTouchTap={goto}>{gotoText}</button>
            </div>
          }

        </div>
      </div>
  )
  }
}

export default Modal
