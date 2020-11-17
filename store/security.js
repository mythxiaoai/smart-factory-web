import Vue from 'vue'
import "@/plugins/vue-ls.js"
//需要是函数
let securityDefault = {
  token: Vue.ls.get("token"),
  //这三个直接存在local里面了
  // buttonAuth: null,
  // menu: null,
  // userInfo: null
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
    Vue.ls.remove('token');
    state.token = '';
  }
}

export const actions = {
  saveToken({ commit, getters }, params) {
    commit('saveToken', params);
    console.log(this);
    //登陆后获取用户
    this.dispatch('security/userInfo');
    //获取数据字典
    this.dispatch('security/currentUserPermission');
    //获取权限信息
    this.dispatch('security/getAlldict');
  },
  async loginout({ commit, dispatch, getters }, u) {
    let res = await this.$api.login.loginout();
    res.success && commit('celar');
  },
  async userInfo({commit}, u) {
    let res = await this.$api.app.userInfo();
    Vue.ls.set('userInfo', res.result, 7 * 24 * 60 * 60 * 1000);
  },
  async currentUserPermission({commit}, u) {
    let res = await this.$api.app.currentUserPermission();
    Vue.ls.set('permission', res.result, 7 * 24 * 60 * 60 * 1000);
  },
  async getAlldict({commit}, u) {
    let res = await this.$api.app.getAlldict();
    Vue.ls.set('dict', res.result, 7 * 24 * 60 * 60 * 1000);
  }
}

export const getters = {
  isLogin(state) {
    return !!state.token
  }
}
