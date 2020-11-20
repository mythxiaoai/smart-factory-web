import Vue from 'vue'
import {convert} from "~/assets/utils/index.js"
//需要是函数
export const state = () => {
  return {
    token: Vue.ls.get("token"),
    permission: Vue.ls.get("permission"),
    userInfo: Vue.ls.get("userInfo")
  }
}

export const mutations = {
  saveToken(state, params) {
    Vue.ls.set('token', params, 7 * 24 * 60 * 60 * 1000)
    state.token = params
  },
  celar(state){
    Vue.ls.remove('token');
    Vue.ls.remove('tabs');
    state.token = '';
  },
  userInfo(state, params) {
    Vue.ls.set('userInfo', params, 7 * 24 * 60 * 60 * 1000)
    state.userInfo = params
  },
  permission(state, params) {
    Vue.ls.set('permission', params, 7 * 24 * 60 * 60 * 1000)
    state.permission = params
  },
  dict(state, params) {
    Vue.ls.set('dict', params, 7 * 24 * 60 * 60 * 1000)
    state.dict = params
  },
}

export const actions = {
  saveToken({ commit, getters }, params) {
    commit('saveToken', params);
    //登陆后获取用户
    this.dispatch('security/userInfo');
    //获取数据字典
    this.dispatch('security/currentUserPermission');
    //获取权限信息
    this.dispatch('security/getAlldict');
  },
  async loginout({ commit, dispatch, getters }, u) {
    let res = await this.$api.login.loginout({$msg:"none"});
    res.success && commit('celar');
  },
  async userInfo({commit}, u) {
    let res = await this.$api.app.userInfo();
    commit('userInfo', res.result);
  },
  async currentUserPermission({commit}, u) {
    let res = await this.$api.app.currentUserPermission();
    commit('permission', res.result);
  },
  async getAlldict({commit}, u) {
    let res = await this.$api.app.getAlldict();
    commit('dict', res.result);
  }
}

export const getters = {
  isLogin(state) {
    return !!state.token
  },
  menu(state){
    if(!state.permission)return [];
    let menu = convert(state.permission.menu);
    console.log(state.permission);
    return menu;
  },
  button(state){
    if(!state.permission)return [];
    
  },
}
