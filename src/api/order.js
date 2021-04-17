
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/manager/order',
    method: 'get',
    params
  })
}

export function getInfo(id) {
  return request({
    url: `/manager/order/${id}`,
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: `/manager/order`,
    method: 'post',
    data
  })
}

export function update(id, data) {
  return request({
    url: `/manager/order/${id}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return request({
    url: `/manager/order/${id}`,
    method: 'delete'
  })
}

export function getExcel(params) {
  return request({
    url: `/manager/export/order`,
    method: 'get',
    params
  })
}
