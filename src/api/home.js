import request from '@/axios/request'

export function testMidcache(params) {
  return request({
    url: 'api/bofc/midcache',
    method: 'get',
    params
  })
}

export function getUserInfo(params) {
  return request({
    url: 'api/bofc/userinfo',
    method: 'get',
    params
  })
}

// export function allList(params) {
//   return request({
//     url: 'project/meal/allList',
//     method: 'get',
//     params
//   })
// }

/**
 * 获取用户慈善份数
 * @param {*} userId 
 */
//
export function getPipByUserId(params) {
  return request({
    url: 'api/bofc/getPipByUserId',
    method: 'get',
    params
  })
}

/**
 * 获取排行榜
 */
//
export function getTopSum() {
  return request({
    url: 'api/bofc/getTopSum',
    method: 'get'
  })
}

/**
 * 首页的子项目捐款份数
 */

export function getAllBySubname() {
  return request({
    url: 'api/bofc/getAllBySubname',
    method: 'get'
  })
}