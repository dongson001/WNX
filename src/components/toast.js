import React from 'react'

class Toast extends React.Component {

  render() {
    const { content } = this.props
    return (
      <div className="toast">
				<div className="toast-text">{ content }</div>
      </div>
  )
  }
}

export default Toast
