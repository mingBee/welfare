import request from '@/axios/request'

/**
 * 获取捐赠排行榜
 * @param {*} subName 
 */
export function getRankList() {
  return request({
    url: 'api/bofc/getTotalByUserId',
    method: 'get'
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
// export function getOrderList(params) {
//   return request({
//     url: 'api/bofc/getOrderList',
//     method: 'get',
//     params
//   })
// }
