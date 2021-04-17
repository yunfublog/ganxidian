export function filterStatus(status) {
  const value = {
    '1000': '待处理',
    '2000': '检查',
    '3000': '去渍',
    '4000': '洗涤',
    '5000': '熨烫',
    '6000': '烘干',
    '7000': '检查',
    '8000': '包装上架',
    '10000': '已完成'
  }
  return value[status] || '未知'
}
