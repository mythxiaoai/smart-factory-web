import app from '~/assets/config/appConfig.js'
import {baseURL} from '@/assets/config/appConfig.js'
/**
 * 初始化系统配置信息  全局配置文件
 * 1.初始化app.js的各项属性
 */
export default {
    state:() => ({
        ...app,
        production: process.env.NUXT_ENV_MODE === 'build',
        //desktop tablet mobile
        device: 'desktop',
        baseURL:baseURL
      }),
      mutations:{
        setDevice(state, type) {
          state.device = type
        }
      },
      actions:{
        //登陆
        login({ commit, getters }, u) {
          console.log('actions', this)
          commit('init', u)
        },
        //退出
        loginout({ commit, dispatch, getters }, u) {
          commit('init', null)
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
