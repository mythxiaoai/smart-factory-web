import Vue from 'vue'
import {convert} from "~/assets/utils/index.js"
//需要是函数
export const state = () => {
  return {
    token: Vue.ls.get("token"),
    permission: Vue.ls.get("permission"),
    userInfo: Vue.ls.get("userInfo"),
  }
}

export const mutations = {
  saveToken(state, params) {
    Vue.ls.set('token', params, 7 * 24 * 60 * 60 * 1000)
    state.token = params
  },
  celar(state){
    //登陆失效
    Vue.ls.remove('token');
    state.token = '';
    //tabs清空
    this.dispatch('tab/init');
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
  }
}

export const actions = {
  saveToken({ commit, getters }, params) {
    commit('saveToken', params);
    //登陆后获取用户
    let promise1 = this.dispatch('security/userInfo');
    //获取数据字典
    let promise2 = this.dispatch('security/currentUserPermission');
    //获取权限信息
    let promise3 = this.dispatch('security/getAlldict');

    return Promise.all([promise1,promise2,promise3]);
  },
  async loginout({ commit, dispatch, getters }, u) {
    let res = await this.$http.post("/system/captchaLogout",{$msg:"none"});
    res.success && commit('celar');
  },
  async userInfo({commit}, u) {
    let res = await this.$http.get("/system/userInfo");
    commit('userInfo', res.result);
    return Promise.resolve(res);
  },
  async currentUserPermission({commit}, u) {
    let res = await this.$http.get("/system/currentUserPermission");
    commit('permission', res.result);
    return Promise.resolve(res);
  },
  async getAlldict({commit}, u) {
    let res = await this.$http.get("/system/getAlldict");
    commit('dict', res.result);
    return Promise.resolve(res);
  }
}

export const getters = {
  isLogin(state) {
    return !!state.token
  },
  menu(state){
    if(!state.permission)return [];
    //过滤出是主路由并且启用的
    let menu = state.permission.menu.filter(v =>{
      return v.routeFlag == 1 && v.status == 1;
    })
    //转化成树结构
    menu = convert(menu);
    return menu;
  },
  button(state){
    if(!state.permission)return [];
    return state.permission.auth;
  },
}
