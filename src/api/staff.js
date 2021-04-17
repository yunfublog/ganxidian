import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/manager/staff',
    method: 'get',
    params
  })
}

export function getInfo(id) {
  return request({
    url: `/manager/staff/${id}`,
    method: 'get',
  })
}

export function create(data) {
  return request({
    url: '/manager/staff',
    method: 'post',
    data
  })
}

export function update(id,data) {
  return request({
    url: `/manager/staff/${id}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return request({
    url: `/manager/staff/${id}`,
    method: 'delete',
  })
}