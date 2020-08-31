import Vue from 'vue'
import "@/plugins/vue-ls.js"
//需要是函数
let securityDefault = {
  token: Vue.ls.get("token"),
  buttonAuth: null,
  menu: null,
  userInfo: null
}
export const state = () => {
  return Vue.ls.get('security') || securityDefault
}

export const mutations = {
  saveToken(state, params) {
    Vue.ls.set('token', params, 7 * 24 * 60 * 60 * 1000)
    state.token = params
  },
  celar(state){
    Vue.ls.clear('token');
    state.token = '';
  }
}

export const actions = {
  saveToken({ commit, getters }, params) {
    commit('saveToken', params)
  },
  loginout({ commit, dispatch, getters }, u) {
    return new Promise((resolve) => {
      setTimeout(() => {
        commit('celar');
        resolve();
      }, 2000);
    })
  }
}

export const getters = {
  isLogin(state) {
    return !!state.token
  }
}
