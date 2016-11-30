export default function (name, code, handlers) {
  const defaultSetting = {
    success: '000000',
    unlogin: '900002'
  }
  const apiMap = [{
    name: 'products',
    statusCode: defaultSetting
  }, {
    name: 'productDetail',//详情
    statusCode: defaultSetting
  }, {
    name: 'submitOrder',//提交保单
    statusCode: defaultSetting
  }, {
    name: 'checkAvailableCredit',
    statusCode: defaultSetting
  }, {
    name: 'createOrder',
    statusCode: defaultSetting
  }, {
    name: 'checkPlacingInfo',
    statusCode: defaultSetting
  }, {
    name: 'checkOrder',
    statusCode: defaultSetting
  }, {
    name: 'getCardsList',
    statusCode: defaultSetting
  }, {
    name: 'payOrder',
    statusCode: {
      ...defaultSetting,
      upgrade: '670100'
    }
  }, {
    name: 'updatePlacingInfo',
    statusCode: defaultSetting
  }, {
    name: 'getEvaluationProblem',
    statusCode: defaultSetting
  }, {
    name: 'checkEvalation',
    statusCode: defaultSetting
  }, {
    name: 'saveEvalation',
    statusCode: defaultSetting
  }, {
    name: 'getCardBinInfo',
    statusCode: defaultSetting
  }, {
    name: 'saveCard',
    statusCode: defaultSetting
  }, {
    name: 'createAccount',
    statusCode: defaultSetting
  }, {
    name: 'getAccountInfo',//用户信息回显
    statusCode: defaultSetting
  }, {
    name: 'sendOtp',
    statusCode: defaultSetting
  }, {
    name: 'getSupportBankList',
    statusCode: defaultSetting
  }, {
    name: 'getPayStatus',
    statusCode: defaultSetting
  },{
    name:'checkOrderPayCondition',
    statusCode:defaultSetting
  },{
    name:'checkIfAdult',
    statusCode:defaultSetting
  },{
    name:'getAccessTicket',
    statusCode:defaultSetting
  },{
    name:'orangeAccount',
    statusCode:{
      submit:'000001',
      authenticate:'000002',
      orange:'000003'
    }
  },{
      name:'surrenderCharge',//退保费用计算
      statusCode:defaultSetting
  },{
    name:'surrender',//退保
    statusCode:defaultSetting
  }]

  apiMap.forEach(api => {
    if (api.name === name) {
      const index = Object.values(api.statusCode).indexOf(code)
      if (index !== -1) {
        handlers[Object.keys(api.statusCode)[index]]()
      } else {
        handlers.fail()
      }
    }
  })
}
