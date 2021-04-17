import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/manager/customer',
    method: 'get',
    params
  })
}

export function update(id, data) {
  return request({
    url: `/manager/customer/${id}`,
    method: 'put',
    data
  })
}

export function resetPwd(id) {
  return request({
    url: `/manager/customer/resetPwd/${id}`,
    method: 'put'
  })
}
