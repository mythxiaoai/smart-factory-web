import Vue from 'vue'
//需要是函数

export const state = function () {
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
          blankFlag: 1,
          blankFlagShow:false,
          defaultValue: '',
          columnType: '',
          id: '',
          tableId: '',
          pkFlag: 1,
          pkFlagShow:true,
          columnLength: '',
          columnName: '',
          place: ''
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
          editFlag: 1,
          businessId: '',
          queryFlag: 0,
          createTime: '1971-09-30T10:50:21.599Z',
          columnName: '',
          sort: -9166199,
          checkRule: '',
          fromType: '',
          displayFlag: 1,
          scriptId: 'cb613727355c509f284e3035501db371',
          checkRuleList: '',
          indexList: [
            {
              indexColumn: '',
              indexName: ''
            }
          ],
        },
        {
          id: '',
          queryMode: '',
          subAttribute: '',
          columnNameCn: '',
          fromData: '',
          subType: '',
          editFlag: 1,
          businessId: '',
          queryFlag: 0,
          createTime: '1971-09-30T10:50:21.599Z',
          columnName: '',
          sort: -9166199,
          checkRule: '',
          fromType: '',
          displayFlag: 1,
          scriptId: '',
          checkRuleList: '',
          indexList: [
            {
              indexColumn: '',
              indexName: ''
            }
          ],
        },
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
    rules: {
      //全局
      table: {
        businessName: [
          { required: true, message: '不能为空~', trigger: 'blur' },
        ],
      },

      //列表
      formList: [
        { columnNameCn: [{ required: true, message: '不能为空~', trigger: 'blur' }], }
      ],

      //数据库
      columnList: [
        {
          columnName: [
            {
              required: true,
              pattern: /[a-z]{2,}(_[a-z]+)*/,
              message: '请输入符合数据库字段命名规则',
              trigger: 'blur',
            },
          ],
          columnType: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        }
      ]
    }
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
