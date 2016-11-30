import React from 'react'
import {App, YztApp} from 'utils/native'

export default class Limit extends React.Component {

  componentWillMount() {
    YztApp.setTitle(this.props.route.title)
    App.nativeCallbacks.goback = function () {
      this.onClickBack()
    }.bind(this)
  }
  onClickBack() {
    history.go(-1)
  }
  renderTbody() {
    const obj = [
      {
        num: '1',
        bankName: '平安银行',
        single: '1000W',
        dayLimit: '无'
      },
      {
        num: '2',
        bankName: '中国建设银行',
        single: '500W',
        dayLimit: '无'
      },
      {
        num: '3',
        bankName: '中国银行',
        single: '15W',
        dayLimit: '无'
      },
      {
        num: '4',
        bankName: '中国工商银行',
        single: '5W',
        dayLimit: '无'
      },
      {
        num: '5',
        bankName: '浦东发展银行',
        single: '5W',
        dayLimit: '无'
      },
      {
        num: '6',
        bankName: '中国民生银行',
        single: '15W',
        dayLimit: '无'
      },
      {
        num: '7',
        bankName: '中国农业银行',
        single: '15W',
        dayLimit: '无'
      },
      {
        num: '8',
        bankName: '招商银行',
        single: '5W',
        dayLimit: '5W'
      },
      {
        num: '9',
        bankName: '中信银行',
        single: '15W',
        dayLimit: '无'
      },
      {
        num: '10',
        bankName: '邮政储蓄银行',
        single: '15W',
        dayLimit: '无'
      },
      {
        num: '11',
        bankName: '中国光大银行',
        single: '100W',
        dayLimit: '无'
      },
      {
        num: '12',
        bankName: '交通银行',
        single: '5W',
        dayLimit: '无'
      },
      {
        num: '13',
        bankName: '广发银行',
        single: '15W',
        dayLimit: '无'
      },
      {
        num: '14',
        bankName: '兴业银行',
        single: '15W',
        dayLimit: '无'
      },
      {
        num: '15',
        bankName: '华夏银行',
        single: '15W',
        dayLimit: '无'
      },
      {
        num: '16',
        bankName: '江苏银行',
        single: '5W',
        dayLimit: '无'
      },
      {
        num: '17',
        bankName: '上海银行',
        single: '100W',
        dayLimit: '无'
      },
      {
        num: '18',
        bankName: '北京银行',
        single: '100W',
        dayLimit: '无'
      }
    ]
    return obj.map((item, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{item.bankName}</td>
          <td>{item.single}</td>
          <td>{item.dayLimit}</td>
        </tr>
      )
    })
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
        <section className="bank-limit">
          <table>
            <thead>
              <tr>
                <td>序号</td>
                <td>银行名</td>
                <td>单笔</td>
                <td>单日</td>
              </tr>
            </thead>
            <tbody>
              {
                this.renderTbody()
              }
            </tbody>
          </table>
        </section>
      </div>
    )
  }
}
