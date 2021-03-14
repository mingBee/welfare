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

/**
 * 获取我的捐赠称号
 * @param {*} 
 * userId 
 */
export function getMeTitle(params) {
  return request({
    url: 'api/bofc/getChTotal',
    method: 'get',
    params
  })
}

/**
 * 获取客户名称
 * @param {*} 
 * userId 
 */
export function getCustomerName(params) {
  return request({
    url: 'api/bofc/getCustomerName',
    method: 'get',
    params
  })
}

/**
 * 更新客户名称
 * @param {*} 
 * userId 
 */
export function updateCustomerName(params) {
  return request({
    url: 'api/bofc/updateCustomerName',
    method: 'put',
    params
  })
}