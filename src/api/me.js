import request from '@/axios/request'

/**
 * 获取我的捐赠信息
 * @param {*} subName 
 */
export function getMeDonationInfo(params) {
  return request({
    url: 'api/bofc/getUserAmount',
    method: 'get',
    params
  })
}

/**
 * 获取我的捐赠历史
 * @param {*} subName 
 */
export function getMeHistory(params) {
  return request({
    url: 'api/bofc/getOrderListByUserId',
    method: 'get',
    params
  })
}
