import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css
import '@/styles/public.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as filters from '@/utils/filter'
import Toast from '@/utils/toast'
import Cache from '@/utils/cache'
import Tool from '@/utils/tool'
import Print from '@/plugs/print/print'

import '@/icons' // icon

// 暂时不需要权限验证
// import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
// import { mockXHR } from '../mock'
// if (process.env.NODE_ENV === 'production') {
//   mockXHR()
// }

// 注册打印插件
Vue.use(Print)

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.prototype.toast = Toast
Vue.prototype.cache = Cache
Vue.prototype.tool = Tool

// set ElementUI lang to EN
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
