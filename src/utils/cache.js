const cache = {
  saveSelectOrderStatus(status) {
    localStorage.setItem('exikuai-selectOrderStatus', status)
  },

  fetchSelectOrderStatus() {
    return localStorage.getItem('exikuai-selectOrderStatus')
  },

  storeMenus(menus) {
    localStorage.setItem('exikuai-admin-menus', JSON.stringify(menus))
  },

  fetchMenus() {
    const ret = localStorage.getItem('exikuai-admin-menus') || ''
    return JSON.parse(ret)
  }
}

export default cache
