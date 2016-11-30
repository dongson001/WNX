/**
 * Created by apple on 16/6/13.
 */
export function errorDetection(errorCode) {
  if(!errorCode){
    return ''
  }
  const errorObj = {
    6001205: '对不起，您的银行卡余额不足。',
    600204: '您本次的支付金额已超过该银行的单笔支付额度上限，请在填写投资金额页面查看”查看银行卡限额“，也可联系该银行修改您的单笔网银支付上限。',
    600215: '您本次的支付金额已超过该银行的单日支付额度上限，请在填写投资金额页面查看”查看银行卡限额“，也可联系该银行修改您的单日网银支付上限。',
    '' : ''
  }
  return errorObj[errorCode]
}
