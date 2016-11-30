import React from 'react'

class Handle extends React.Component {

  render() {
    return (
      <div className="loadingPopup">
        <div className="loadingPopup-default">
          <div className="loadingPopup-icon">
            <span className="handle-img"></span>
          </div>
          <div className="loadingPopup-loader">
            <span></span>
          </div>
        </div>
    </div>
    )
  }
}

export default Handle
