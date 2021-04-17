import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/manager/booking',
    method: 'get',
    params
  })
}

export function update(id,data) {
  return request({
    url: `/manager/booking/${id}`,
    method: 'put',
    data
  })
}
