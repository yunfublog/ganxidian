
import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/manager/process',
    method: 'get',
    params
  })
}

export function operate(id, data) {
  return request({
    url: `/manager/process/operate/${id}`,
    method: 'put',
    data
  })
}

export function getBadge() {
  return request({
    url: '/manager/process/state/badge',
    method: 'get'
  })
}

export function getLogs(id) {
  return request({
    url: `/manager/process/logs/${id}`,
    method: 'get'
  })
}

export function getExcel(params) {
  return request({
    url: '/manager/process/export',
    method: 'get',
    params
  })
}
