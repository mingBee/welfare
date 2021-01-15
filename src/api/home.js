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

export function allList(params) {
  return request({
    url: 'project/meal/allList',
    method: 'get',
    params
  })
}

