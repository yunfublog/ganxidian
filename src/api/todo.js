import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/manager/todo',
    method: 'get',
    params
  })
}

export function create(data) {
  return request({
    url: '/manager/todo',
    method: 'post',
    data
  })
}

export function update(id,data) {
  return request({
    url: `/manager/todo/${id}`,
    method: 'put',
    data
  })
}


export function remove(id) {
  return request({
    url: `/manager/todo/${id}`,
    method: 'delete',
  })
}
