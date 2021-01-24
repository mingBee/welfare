import request from '@/axios/request'

/**
 * 支付接口，传递金额等信息
 * @param {} data 
 */
export function donationMoney(data) {
  return request({
    url: 'api/bofc/B2CAPPPayRecvOrder',
    method: 'post',
    data
  })
}

/**
 * 获取支付状态
 * @param {} data 
 */
export function getPayType(data) {
  return request({
    url: 'api/bofc/B2CAPPPayRecvOrder',
    method: 'post',
    data
  })
}
