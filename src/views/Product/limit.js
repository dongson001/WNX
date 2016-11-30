import React from 'react'
import app from 'utils/native'

export default class OrderLimit extends React.Component {
    renderTbody() {
        const obj = [
            {
                num: '1',
                bankName: '中国工商银行',
                income: '5万(不含)，单日5万(不含)',
                pay: '1000万'
            },
            {
                num: '2',
                bankName: '中国建设银行',
                income: '单笔100万，单日200万，单月500万',
                pay: '1000万'
            },
            {
                num: '3',
                bankName: '中国银行',
                income: '15万',
                pay: '1000万'
            },
            {
                num: '4',
                bankName: '中国邮政储蓄银行',
                income: '15万',
                pay: '1000万'
            },
            {
                num: '5',
                bankName: '中信银行',
                income: '15万',
                pay: '1000万'
            },
            {
                num: '6',
                bankName: '兴业银行',
                income: '15万',
                pay: '1000万'
            },
            {
                num: '7',
                bankName: '交通银行',
                income: '5万',
                pay: '1000万'
            },
            {
                num: '8',
                bankName: '北京银行',
                income: '5万',
                pay: '1000万'
            },
            {
                num: '9',
                bankName: '上海浦东发展银行',
                income: '4.99万（单日限额4.99万）',
                pay: '1000万'
            },
            {
                num: '10',
                bankName: '中国光大银行',
                income: '100万',
                pay: '1000万'
            },
            {
                num: '11',
                bankName: '上海银行',
                income: '100万',
                pay: '1000万'
            },
            {
                num: '12',
                bankName: '平安银行',
                income: '1000万',
                pay: '1000万'
            },
            {
                num: '13',
                bankName: '中国农业银行',
                income: '15万',
                pay: '1000万'
            },
            {
                num: '14',
                bankName: '招商银行',
                income: '5万，单日5万',
                pay: '1000万'
            },
            {
                num: '15',
                bankName: '华夏银行',
                income: '15万',
                pay: '1000万'
            },
            {
                num: '16',
                bankName: '广发银行',
                income: '15万',
                pay: '1000万'
            },
            {
                num: '17',
                bankName: '民生银行',
                income: '15',
                pay: '1000万'
            }
        ]
        return obj.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.bankName}</td>
                    <td>{item.income}</td>
                    <td>{item.pay}</td>
                </tr>
            )
        })
    }
    componentWillMount() {
        App.nativeCallbacks.goback = function (){
            this.onClickBack()
        }.bind(this)
        YztApp.setTitle(this.props.route.title)
    }
    onClickBack() {
      history.go(-1)
      // let productId = this.props.routeParams.productId ,
      // productCode = this.props.routeParams.productCode,
      // page = '1'
      // this.props.history.pushState(null, `/product/detail/:${productId}/:${productCode}/:${page}`)
    }
    render() {
        const { title } = this.props.route
        return (
            <div>
                {
                    !App.IS_YZT &&
                    <header className="brand-title">
                        
                    </header>
                }
                <section className="bank-limit">
                    <table>
                        <thead>
                        <tr>
                            <td>编号</td>
                            <td>银行</td>
                            <td>对私代收付能力</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>代收</td>
                            <td>代付</td>
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
