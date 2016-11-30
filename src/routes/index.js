import React from 'react'
import { Route, IndexRoute } from 'react-router';
import CoreLayout from '../layouts/CoreLayout'
// views must async load
// Product
import Detail from 'bundle?lazy!../views/Product/Detail'
import Buy from 'bundle?lazy!../views/Product/Buy'
import OrderLimit from 'bundle?lazy!../views/Product/limit'
import Submit from 'bundle?lazy!../views/Product/Submit'
import GuaranteeList from 'bundle?lazy!../views/Product/GuaranteeList'
import Guarantee from 'bundle?lazy!../views/Product/Guarantee'
import DetailWelding from 'bundle?lazy!views/Authentication/index'
import ProductResult from 'bundle?lazy!../views/Product/Result'
//退保
import Surrender from 'bundle?lazy!../views/surrender/Surrender'
import Result from 'bundle?lazy!../views/surrender/Result'

const loadContainerAsync = bundle => (location, cb) => {
    bundle(component => {
        cb(null, component)
    })
}

export default (
    <Route        component={CoreLayout} path='/' title='产品详情'>
        <IndexRoute getComponent={loadContainerAsync(Detail)} title='产品详情'/>
        <Route      getComponent={loadContainerAsync(Detail)} path='/product/detail/(:page)' title='产品详情'/>
        <Route      getComponent={loadContainerAsync(Buy)} path='/product/buy' title='填写投保金额' backPath='/product/detail'/>
        <Route      getComponent={loadContainerAsync(OrderLimit)} path='/limit' title='银行限额'/>
        <Route      getComponent={loadContainerAsync(Submit)} path='/product/submit' title='保单信息填写' backPath='/product/detail'/>
        <Route      getComponent={loadContainerAsync(Surrender)} path='/surrender/surrender' title='退保' backPath='/product/detail'/>
        <Route      getComponent={loadContainerAsync(Result)} path='/surrender/result' title='退保结果' backPath='/product/detail'/>
        <Route      getComponent={loadContainerAsync(GuaranteeList)} path='/guaranteeList' title="更多详情" backPath='/product/detail'/>
        <Route      getComponent={loadContainerAsync(Guarantee)} path='/guarantee/(:productId/:productCode/):category' title="条款"/>
        <Route      getComponent={loadContainerAsync(DetailWelding)} path='/product/welding/(:isback)' title='处理中' backPath="/product/detail"/>
        <Route      getComponent={loadContainerAsync(ProductResult)} path='/product/result' title='投保结果' backPath="/product/detail"/>
    </Route>
);
