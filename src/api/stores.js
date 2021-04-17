
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/manager/store',
    method: 'get',
    params
  })
}

export function getInfo(id) {
  return request({
    url: `/manager/store/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: `/manager/store`,
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `/manager/store/${id}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return request({
    url: `/manager/store/${id}`,
    method: 'delete'
  })
}

export function resetPwd(id) {
  return request({
    url: `/manager/store/resetPwd/${id}`,
    method: 'put'
  })
}
