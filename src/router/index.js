import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/login'
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/list',
    meta: {
      title: '订单管理',
      icon: 'excel'
    },
    children: [{
        path: 'list',
        name: 'OrderList',
        component: () => import('@/views/order/list'),
        meta: {
          title: '订单管理',
          icon: 'excel'
        }
      },
      {
        path: 'create',
        name: 'OrderCreate',
        component: () => import('@/views/order/create'),
        meta: {
          title: '创建订单',
          icon: 'excel'
        },
        hidden: true
      },
      {
        path: 'info',
        name: 'OrderInfo',
        component: () => import('@/views/order/info'),
        meta: {
          title: '订单信息',
          icon: 'excel'
        },
        hidden: true
      },
      {
        path: 'edit',
        name: 'OrderEdit',
        component: () => import('@/views/order/edit'),
        meta: {
          title: '编辑订单',
          icon: 'excel'
        },
        hidden: true
      }
    ]
  },

  {
    path: '/process',
    component: Layout,
    redirect: '/process/list',
    meta: {
      title: '生产管理',
      icon: 'dashboard'
    },
    children: [{
      path: 'list',
      name: 'ProcessList',
      component: () => import('@/views/process/list'),
      meta: {
        title: '生产管理',
        icon: 'dashboard'
      }
    }]
  },

  {
    path: '/book',
    component: Layout,
    redirect: '/book/list',
    meta: {
      title: '预约管理',
      icon: 'example'
    },
    children: [{
      path: 'list',
      name: 'BookList',
      component: () => import('@/views/book/list'),
      meta: {
        title: '预约管理',
        icon: 'table'
      }
    }]
  },

  {
    path: '/todo',
    component: Layout,
    redirect: '/todo/list',
    meta: {
      title: '便签管理',
      icon: 'list'
    },
    children: [{
      path: 'list',
      name: 'TodoList',
      component: () => import('@/views/todo/list'),
      meta: {
        title: '便签管理',
        icon: 'list'
      }
    }]
  },

  {
    path: '/staff',
    component: Layout,
    redirect: '/staff/list',
    meta: {
      title: '员工管理',
      icon: 'peoples'
    },
    children: [{
        path: 'list',
        name: 'StaffList',
        component: () => import('@/views/staff/list'),
        meta: {
          title: '员工管理',
          icon: 'peoples'
        }
      },
      {
        path: 'create',
        name: 'StaffCreate',
        component: () => import('@/views/staff/create'),
        meta: {
          title: '添加员工',
          icon: 'peoples'
        },
        hidden: true
      },
      {
        path: 'edit',
        name: 'StaffEdit',
        component: () => import('@/views/staff/edit'),
        meta: {
          title: '编辑员工',
          icon: 'peoples'
        },
        hidden: true
      }
    ]
  },

  {
    path: '/store',
    component: Layout,
    redirect: '/store/list',
    meta: {
      title: '门店管理',
      icon: 'component'
    },
    children: [{
        path: 'list',
        name: 'StoreList',
        component: () => import('@/views/store/list'),
        meta: {
          title: '门店管理',
          icon: 'component'
        }
      },
      {
        path: 'create',
        name: 'StoreCreate',
        component: () => import('@/views/store/create'),
        meta: {
          title: '添加门店',
          icon: 'component'
        },
        hidden: true
      },
      {
        path: 'edit',
        name: 'StoreEdit',
        component: () => import('@/views/store/edit'),
        meta: {
          title: '编辑门店',
          icon: 'component'
        },
        hidden: true
      }
    ]
  },

  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    meta: {
      title: '会员管理',
      icon: 'user'
    },
    children: [{
      path: 'list',
      name: 'CustomerList',
      component: () => import('@/views/customer/list'),
      meta: {
        title: '会员管理',
        icon: 'user'
      }
    }]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/system/list',
    meta: {
      title: '系统管理',
      icon: 'user'
    },
    children: [{
      path: 'userlist',
      name: 'CustomerList',
      component: () => import('@/views/system/userlist'),
      meta: {
        title: '用户管理',
        icon: 'user'
      }
    }, {
      path: 'syslist',
      name: 'CustomerList',
      component: () => import('@/views/system/syslist'),
      meta: {
        title: '菜单管理',
        icon: 'user'
      }
    }, {
      path: 'deplist',
      name: 'CustomerList',
      component: () => import('@/views/system/deplist'),
      meta: {
        title: '部门管理',
        icon: 'user'
      }
    }, {
      path: 'rolelist',
      name: 'CustomerList',
      component: () => import('@/views/system/rolelist'),
      meta: {
        title: '角色管理',
        icon: 'user'
      }
    }, {
      path: 'joblist',
      name: 'CustomerList',
      component: () => import('@/views/system/joblist'),
      meta: {
        title: '岗位管理',
        icon: 'user'
      }
    }]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router