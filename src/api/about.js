import request from '@/axios/request'

/**
 * 支付接口，传递金额等信息
 * @param {} data 
 */
export function donationMoney(data) {
  return request({
    headers: {
      'Content-Type': 'application/json'
    },
    url: 'api/bofc/B2CAPPPayRecvOrder',
    method: 'post',
    data:JSON.stringify(data)
  })
}

// /**
//  * 获取支付状态
//  * @param {} data 
//  */
// export function getPayType(data) {
//   return request({
//     url: 'api/bofc/B2CAPPPayRecvOrder',
//     method: 'post',
//     data
//   })
// }

/**
 * 获取子项目的慈善份数和捐款金额
 * @param {*} subName 
 */
export function getTatilBySubName(params) {
  return request({
    url: 'api/bofc/getTatilBySubName',
    method: 'get',
    params
  })
}

/**
 * 获取子项目的捐款列表
 * @param {*} subName 
| offset 	      | 是        | int        | 分页偏移量 
| limit 	      | 是        | int        | 每页大小   
| subName 	    | 是        | String     | 子项目名称 
| orderStatus 	| 是        | int        | 订单状态   1成功
 * 
 */
export function getOrderList(params) {
  return request({
    url: 'api/bofc/getOrderList',
    method: 'get',
    params
  })
}