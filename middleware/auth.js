import Vue from 'vue'
import { LONGINPATH, HOMEPATH } from '@/assets/config/appConfig.js'

const whiteRoute = ['/login'] //不转发的白名单路由
export default function(content) {
  const fromRoute = content.from
  const currRoute = content.route
  const router = content.app.router
  return new Promise((resolve, reject) => {
    //如果是登陆或者是白名单内  是否登陆都去跳转
    const isLogin = !!Vue.ls.get('token')
    if (~whiteRoute.indexOf(currRoute.path)) {
      content.next();
      resolve();
      return;
    }
    
    //没有登陆
    if (isLogin) {
      //菜单权限的加载
      resolve();
      return;
    } else {
      currRoute.path == HOMEPATH
        ? router.push({ path: LONGINPATH })
        : router.push({ path: LONGINPATH, query: { redirect: currRoute.path } })
      resolve();
      return;
    }
  })
  reject()
  //   Vue.mixin({
  //    mounted() {
  //       this.$nuxt.setLayout('home')
  //     }
  //   })
}

//设置默认布局为home layout
//Vue.prototype.layout=()=>"home"
// Vue.mixin({
//   beforeMount() {
//     console.log(this);
//      window.$nuxt.setLayout('home');
//   }
// })

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/user/login', '/user/register', '/user/register-result','/user/alteration'] // no redirect whitelist

// router.beforeEach((to, from, next) => {
//   NProgress.start() // start progress bar

//   if (Vue.ls.get(ACCESS_TOKEN)) {
//     /* has token */
//     if (to.path === '/user/login') {
//       next({ path: INDEX_MAIN_PAGE_PATH })
//       NProgress.done()
//     } else {
//       if (store.getters.permissionList.length === 0) {
//         store.dispatch('GetPermissionList').then(res => {
//               const menuData = res.result.menu;
//               if (menuData === null || menuData === "" || menuData === undefined) {
//                 return;
//               }
//               let constRoutes = [];
//               constRoutes = generateIndexRouter(menuData);
//               // 添加主界面路由
//               store.dispatch('UpdateAppRouter',  { constRoutes }).then(() => {
//                 // 根据roles权限生成可访问的路由表
//                 // 动态添加可访问路由表
//                 router.addRoutes(store.getters.addRouters)
//                 const redirect = decodeURIComponent(from.query.redirect || to.path)
//                 if (to.path === redirect) {
//                   // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
//                   next({ ...to, replace: true })
//                 } else {
//                   // 跳转到目的路由
//                   next({ path: redirect })
//                 }
//               })
//             })
//           .catch(msg => {
//             notification.error({
//               message: '系统提示',
//               description: msg
//             })
//             store.dispatch('Logout').then(() => {
//               next({ path: '/user/login', query: { redirect: to.fullPath } })
//             })
//           })
//       } else {
//         next()
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       // 在免登录白名单，直接进入
//       next()
//     } else {
//       next({ path: '/user/login', query: { redirect: to.fullPath } })
//       NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
//     }
//   }
// })

// router.afterEach(() => {
//   NProgress.done() // finish progress bar
// })
