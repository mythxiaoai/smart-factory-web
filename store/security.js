import Vue from "vue";
//需要是函数
let securityDefault = {
    token:"",
    buttonAuth:null,
    menu:null,
    userInfo:null
};
export const state = () => {
  return Vue.ls.get('security')||securityDefault;
}

export const mutations = {
  save(state, params) {
    state=params;
  }
}

export const actions = {
  save({ commit, getters }, params) {
    commit('save', params)
  },
  loginout({ commit, dispatch, getters }, u) {
    console.log("执行loginout");
    
    commit('save', securityDefault)
  }
}

export const getters = {
  isLogin(state) {
    console.log('getters',this)
    return !!state.token
  }
}



