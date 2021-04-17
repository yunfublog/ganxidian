export function configStates(list) {
  const tabs = generateTabs()
  for (const item of list) {
    const ret = tabs.find(tab => {
      return tab.status == item.status
    })
    if (ret) {
      ret.label = `${ret.label}(${item.total})`
    }
  }
  return tabs
}

export function generateTabs() {
  return [
    { label: '全部', status: '0' },
    { label: '待处理', status: '1000' },
    { label: '检查', status: '2000' },
    { label: '去渍', status: '3000' },
    { label: '洗涤', status: '4000' },
    { label: '熨烫', status: '5000' },
    { label: '烘干', status: '6000' },
    { label: '检查', status: '7000' },
    { label: '包装上架', status: '8000' },
    { label: '已完成', status: '10000' }
  ]
}
