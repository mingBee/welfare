import request from '@/axios/request'

export function list(params) {
  return request({
    url: 'project/meal/list',
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

export function add(data) {
  return request({
    url: 'project/meal/add',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: 'project/meal/update',
    method: 'put',
    data
  })
}

export function del(params) {
  return request({
    url: 'project/meal/del',
    method: 'delete',
    params
  })
}
