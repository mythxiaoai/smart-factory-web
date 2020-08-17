import app from '~/assets/config/appConfig.js'
/**
 * 初始化系统配置信息
 * 1.初始化app.js的各项属性
 */
export default {
    state:() => ({
        ...app,
        production: process.env.NUXT_ENV_MODE === 'build',
        //desktop tablet mobile
        device: 'desktop'
      }),
      mutations:{
        setDevice(state, type) {
          state.device = type
        }
      },
      actions:{
        login({ commit, getters }, u) {
          console.log('actions', this)
          commit('init', u)
        },
        loginout({ commit, dispatch, getters }, u) {
          commit('init', null)
        }
      },
      getters: {
        isLogin(state) {
          console.log('getters', this)
          return !!state.token
        }
      }
}

// export const state = () => ({
//   ...app,
//   production: process.env.NUXT_ENV_MODE === 'build',
//   //desktop tablet mobile
//   device: 'desktop'
// })
// export const mutations = {
//   setDevice(state, type) {
//     state.device = type
//   }
// }

// export const actions = {
//   login({ commit, getters }, u) {
//     console.log('actions', this)
//     commit('init', u)
//   },
//   loginout({ commit, dispatch, getters }, u) {
//     commit('init', null)
//   }
// }

// export const getters = {
//   isLogin(state) {
//     console.log('getters', this)
//     return !!state.token
//   }
// }
