# STORE

**This directory is not required, you can delete it if you don't want to use it.**

This directory contains your Vuex Store files.
Vuex Store option is implemented in the Nuxt.js framework.

Creating a file in this directory automatically activates the option in the framework.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/guide/vuex-store).

> template
```
//必须是函数
export const state = () => ({
    token: ""
  });
  
  export const mutations = {
  init(state, token) {
      //this 只nuxt实例
    console.log('mutations',this)
    state.token = token
  }
}

export const actions = {

  login({ commit, getters }, u) {
    console.log('actions',this)
    commit('init', u)
  },
  loginout({ commit, dispatch, getters }, u) {
    commit('init', null)
  }
}

export const getters = {
  isLogin(state) {
    console.log('getters',this)
    return !!state.token
  }
}
  
```
