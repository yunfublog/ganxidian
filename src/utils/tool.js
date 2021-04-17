export default {

  // 上传的时候，删除无用的key
  deleteEmptyKey(object) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const element = object[key]
        if (!element) {
          delete object[key]
        }
      }
    }
  },

  // 日期转字符串
  dateToString(time, cFormat) {
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
  },

  // 格式化金额
  formatAmount(amount) {
    if (amount == null || amount == undefined) { return 0.00 }
    return '¥' + (amount / 10000).toFixed(2)
  }
}
