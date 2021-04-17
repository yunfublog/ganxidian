function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if ((time + '').length === 10) {
    time = +time * 1000
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function parseDate(time) {
  if (arguments.length === 0 || time == null) {
    return ''
  }
  const date = new Date(parseInt(time))
  const y = date.getFullYear()
  const m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return y + '-' + m + '-' + d
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function formatPMDate(time) {
  if (arguments.length === 0 || !time || time == undefined) {
    return ''
  }
  const today = new Date()
  const tY = today.getFullYear()
  const date = new Date(parseInt(time))
  const y = date.getFullYear()
  const m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
  const d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let result = ''
  if (tY != y) {
    result = y + '-' + m + '-' + d
  } else {
    result = +m + '-' + d
  }
  return result
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

// 价钱格式化
export function formatAmount(amount) {
  if (amount == '' || amount == null || amount == undefined || amount == 0) {
    return '¥0.00'
  } else {
    return '¥' + (amount / 10000).toFixed(2)
  }
}
// 金额格式化,三位一撇
export function formatMoney(amount) {
  if (amount == '' || amount == null || amount == undefined) { return '¥' + 0.00 }
  const n = 2
  let s = amount / 10000
  s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''
  let l = s.split('.')[0].split('').reverse()
  let r = s.split('.')[1]
  let t = ''
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '')
  }
  return '¥' + t.split('').reverse().join('') + '.' + r
}

// 格式化身份证号码
export function formatIdentity(identity) {
  if (identity == null || identity == undefined || identity.length <= 7) { return identity || '暂无' }
  const arr = identity.split('')
  let replaceStr = ''
  for (let i = 0; i < identity.length - 7; i++) {
    replaceStr += '*'
  }
  arr.splice(3, identity.length - 7, replaceStr)
  return arr.join('')
}
