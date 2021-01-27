import Vue from 'vue'
import {api,http} from "@/plugins/http.js"

let businessNameUnique = async (rule, value, callback) => {
  let res = await http.get("/generator/dev/business/check/business/name",{
    businessName: value,
  })
  !res.result ? callback() : callback(new Error(res.message))
}


export const state = function() {
  return {
    //1：全局  2:表单   3：列表   4：数据库
    action: 1,
    //1:表单预览  2 表格预览
    preAction: 1,
    //正在拖拽
    draging:false,
    //选中的是哪个
    itemActive:-1,
    //脚本列表
    scriptList:[],
    //显示弹框显示和隐藏
    visible:false,
    form: {
      //索引信息
      indexList: [
        {
          tableId: '',
          indexColumn: '',//索引字段
          indexColumnShow: [],
          indexType: '',//索引类型
          indexName: ''//索引名称
        }
      ],
      //表格
      table: {
        tableName: '',//表名
        businessName: '业务名称',//业务名称
        id: '',
        parentId: ''
      },
      business: {
        businessName: '',//业务名称
        pageFlag: 1,//是否分页 0/1
        pageFlagShow: true,//是否分页
        editStatus: '',//编辑状态
        url: '',
        id: '',
      },
      //字段信息
      columnList: [
        // {
        //   columnName: '',//字段名称
        //   columnDescribe: '',//描述
        //   columnType: '',//字段类型
        //   defaultValue: '',//默认值
        //   columnLength: 255,//字段长度
        //   place: '',//小数点位数
        //   blankFlag: 1,//是否运行空值
        //   id: '',
        //   pkFlag: 0,
        // }
      ],
      //表单
      formList: [
        // {
        //   editFlag: 1,//修改是否显示
        //   columnNameCn: '',//字段显示名
        //   columnName: '',  //数据库字段名
        //   subAttribute: '',//组件属性
        //   checkRule: '', //验证规则
        //   fromType: '',//数据来源类型
        //   fromData: '', //数据来源
        
        //   queryFlag: 0,//查询是否显示
        //   queryMode: '',//查询方式
        //   displayFlag: 1,//列表是否显示
        //   scriptId: '',//过滤id
        //   id: '', 
        //   subType: '',//组件类型
        //   businessId: '',//业务ID
        //   sort: 1, //排序
        // },

      ]
    },
    rules: {
      //全局
      table: {
        businessName: [
          { required: true, message: '不能为空~', trigger: 'blur' },
          { validator: businessNameUnique,trigger: 'blur', }
        ]
      },

      //列表
      formList: [
        {
          columnNameCn: [
            { required: true, message: '不能为空~', trigger: 'blur' }
          ]
        }
      ],

      //数据库
      columnList: [
        {
          columnName: [
            {
              required: true,
              pattern: /[a-z]{2,}(_[a-z]+)*/,
              message: '请输入符合数据库字段命名规则',
              trigger: 'blur'
            }
          ],
          columnType: [
            { required: true, message: '不能为空~', trigger: 'blur' }
          ]
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

export const getters = {
  hasData(state) {
    return state.form.formList.filter(v=>!v.hide).length >0;
  },
  isUpdate(state) {
    return !!state.form.business.id;
  },
  formList(state){
    return state.form.formList.filter(v=>!v.hide);
  }
}
