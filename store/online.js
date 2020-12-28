import Vue from 'vue'
//需要是函数

export const state = function() {
  return {
    //1：全局  2:表单   3：列表   4：数据库
    action: 1,
    form: {
      indexList: [
        {
          tableId: '',
          indexColumn: '',
          indexType: '',
          indexName: ''
        }
      ],
      table: {
        tableName: '',
        businessName: '',
        id: '',
        parentId: ''
      },
      columnList: [
        {
          columnDescribe: '',
          blankFlag: -42557858,
          defaultValue: '',
          columnType: '',
          id: '',
          tableId: '',
          pkFlag: -21452288,
          columnLength: -94529250,
          columnName: 'a',
          place: -66502666
        }
      ],
      formList: [
        {
          id: '',
          queryMode: '',
          subAttribute: '',
          columnNameCn: '',
          fromData: '',
          subType: '',
          editFlag: 64813397,
          businessId: '',
          queryFlag: -36336035,
          createTime: '1971-09-30T10:50:21.599Z',
          columnName: '',
          sort: -9166199,
          checkRule: '',
          fromType: '',
          displayFlag: '',
          scriptId: ''
        }
      ],
      business: {
        editStatus: '',
        url: '',
        pageFlag: 1,
        pageFlagShow: true,
        id: '',
        createTime: '1972-09-14T20:13:10.783Z',
        releaseStatus: '',
        businessName: '',
        edition: -37794445
      }
    },
    rules: {}
  }
}

export const mutations = {
  setAction(state, params) {
    state.action = params
  }
}

export const actions = {
  setAction({ commit, dispatch, getters }, u) {
    commit('setAction', u)
  }
}

export const getters = {}
