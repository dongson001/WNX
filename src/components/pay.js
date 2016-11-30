import React from 'react'

export default class Pay extends React.Component {
  static propTypes = {
    password: React.PropTypes.array.isRequired
  }
  render() {
    const { password, cancel, confirm } = this.props
    const isOverflow = stack => {
        return stack[stack.length - 1] !== ''
    }
    return (
			<div className="dialog-containers">
				<div className="mask"></div>
				<div className="popup-box self-adaption">
					<div className="title trading">请输入交易密码</div>
					<div className="popup-password">
						<div className="passwordBox">
							{
								password.map((item, index) => {
									return (
										<span key={index}>
											{ item !== '' ? <i></i> : ''}
										</span>
									)
								})
							}
						</div>
					</div>
					<div className="popup-btns-box btn-box-both">
            <button style={{"height": "40px", "margin":" 0 5px","width":"40%","color": "#fff","lineHeight": "20px","background":"#d0a868"}}
              class="btn btn-hollow"
              onTouchTap={cancel}
              is
              otype="button"
              otitle="输入交易密码页_点击_取消"
            >
              取消
            </button>
						<button style={{"height": "40px", "marginLeft":" 40px","width":"40%","color": "#fff","lineHeight": "20px","background": "#d0a868"}}
              class={ isOverflow(password) ? 'btn btn-hollow' : 'btn btn-hollow btn-disable'}
              onTouchTap={() => {
							  isOverflow(password) ? confirm() : false
						  }}
              is
              otype="button"
              otitle="输入交易密码页_点击_确认支付"
            >确认</button>
					</div>
				</div>
			</div>
		)
  }
}

export default Pay
