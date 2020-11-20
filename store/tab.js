import { HOMEPATH } from '@/assets/config/appConfig.js'
import Vue from 'vue'
//需要是函数

let defaultValue = [HOMEPATH]
export const state = () => {
  return {
    tabs: Vue.ls.get('tabs') || defaultValue
  }
}

export const mutations = {
  add(state, params) {
    let tabs = Vue.ls.get('tabs') || defaultValue
    tabs.push(params)
    //去重
    tabs = Array.from(new Set(tabs));
    state.tabs = tabs
    Vue.ls.set('tabs', tabs, 7 * 24 * 60 * 60 * 1000)
  },
  save(state, params) {
    //去重
    let tabs = Array.from(new Set(params));
    state.tabs = tabs;
    Vue.ls.set('tabs', tabs, 7 * 24 * 60 * 60 * 1000);
  }
}

export const actions = {
  add({ commit }, u) {
    commit('add', u)
  },
  save({ commit }, u) {
    commit('save', u)
  },
}

export const getters = {}
