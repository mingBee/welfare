import request from '@/axios/request'

export function donationMoney(data) {
  return request({
    url: 'project/meal/list',
    method: 'post',
    data
  })
}
