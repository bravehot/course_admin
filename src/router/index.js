import VueRouter from 'vue-router'
import { Loading } from 'element-ui'
var loadingInstance
// 课表中心
const myClass = () => import('../pages/myClass/index.vue')
const addClass = () => import('../pages/myClass/addClass.vue')
const setInfo = () => import('../pages/myClass/setInfo.vue')
const addMemo = () => import('../pages/memo/addMemo.vue')
const myMemo = () => import('../pages/memo/index.vue')
const setClassInfo = () => import('../pages/myClass/setClassInfo.vue')
// 登录
const login = () => import('../pages/login/index.vue')
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login',
      component: login
    },
    {
      path: '/class',
      name: 'myClass',
      component: myClass,
    },
    {
      path: '/addClass',
      name: 'addClass',
      component: addClass,
    },
    {
      path: '/setInfo',
      name: 'setInfo',
      component: setInfo,
    },
    {
      path: '/setClassInfo',
      name: 'setClassInfo',
      component: setClassInfo,
    },
    {
      path: '/addMemo',
      name: 'addMemo',
      component: addMemo
    },
    {
      path: '/myMemo',
      name: 'myMemo',
      component: myMemo
    }

  ]
})
router.beforeEach((to, from, next) => {
  loadingInstance = Loading.service({ fullscreen: true });
  next()
})
router.afterEach(to => {
  loadingInstance.close()
  window.scrollTo(0, 0)
})
export default router