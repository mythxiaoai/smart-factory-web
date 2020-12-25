<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <a-spin :spinning="confirmLoading">
      <a-form-model ref="formModel" :model="form" :rules="rules">
        <a-form-model-item label="" hasFeedback style="text-align: center">
          <a-radio-group v-model="form.menuType">
            <a-radio-button :value="0"> 一级部门 </a-radio-button>
            <a-radio-button :value="1"> 子部门 </a-radio-button>
          </a-radio-group>
        </a-form-model-item>

        <div v-show="form.menuType == 0 || form.menuType == 1">
          <a-form-model-item
            label="上级部门"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="parentId"
            v-show="form.menuType === 1"
          >
            <a-tree-select
              v-model="form.parentId"
              :tree-data="menuList"
              placeholder="请选择上级部门"
              :replaceFields="{ title: 'departName', value: 'id', key: 'id' }"
            >
            </a-tree-select>
          </a-form-model-item>

          <a-form-model-item
            label="部门名称"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="departName"
          >
            <a-input placeholder="请输入部门名称" v-model="form.departName" />
          </a-form-model-item>

          <a-form-model-item
            label="机构类别"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="orgCategory"
          >
            <a-select v-model="form.orgCategory" placeholder="请选择机构类别">
              <a-select-option value="1"> 组织机构 </a-select-option>
              <a-select-option value="2"> 岗位 </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            label="排序"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="departOrder"
          >
            <a-input
              placeholder="请输入部门排序"
              v-model.number="form.departOrder"
            />
          </a-form-model-item>

          <a-form-model-item
            label="地址"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="address"
          >
            <a-input placeholder="请输入地址" v-model="form.address" />
          </a-form-model-item>
          <a-form-model-item
            label="手机号"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="mobile"
          >
            <a-input placeholder="请输入手机号" v-model="form.mobile" />
          </a-form-model-item>
          <a-form-model-item
            label="备注"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="memo	"
          >
            <a-textarea placeholder="请输入备注信息" v-model="form.memo" />
          </a-form-model-item>

          <a-form-model-item
            label="状态"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="status"
          >
            <a-switch
              @change="form.status = statusShow ? 1 : 0"
              v-model="statusShow"
              checked-children="启用"
              un-checked-children="不启用"
            />
          </a-form-model-item>
        </div>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
let Oform = {
  menuType: 0,
  address: '',
  departName: '',
  departNameAbbr: '',
  departNameEn: '',
  departOrder: '',
  description: null,
  fax: '',
  memo: '',
  mobile: '',
  //机构类别  1组织机构  2岗位
  orgCategory: '',
  parentId: null,
  //状态 0 不启用 1启用
  status: 1,
}
export default {
  name: 'modalForm',
  props:['title'],
  data() {
    let unique1 = async (rule, value, callback) => {
      let res = await this.$api.system.sys.depart.checkDepartName.get({
        departId: this.form.id,
        departName: value,
      })
      !res.result ? callback() : callback(new Error(res.message))
    }
    return {
      unique1,
      visible: false,
      model: {},
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      selectList: {
        menuList: [],
      },
      form: {
        menuType: 0,
        address: '',
        departName: '',
        departNameAbbr: '',
        departNameEn: '',
        departOrder: '',
        description: null,
        fax: '',
        memo: '',
        mobile: '',
        //机构类别  1组织机构  2岗位
        orgCategory: '',
        parentId: null,
        //状态 0 不启用 1启用
        status: 1,
      },
      statusShow: true,
      multiterm: {
        label: ['键', '值', '排序'],
        visible: [false, false],
        showKey: ['itemText', 'itemValue', 'sortOrder'],
      },
    }
  },
  created() {},
  computed: {
    rules() {
      //一级菜单
      let result = {
        departName: [
          { required: true, message: '不能为空~', trigger: 'blur' },
          { validator: this.unique1, trigger: 'blur' },
        ],
        orgCategory: [
          { required: true, message: '不能为空~', trigger: 'blur' },
        ],
        departOrder: [
          {
            required: true,
            pattern: /^[0-9]*$/,
            message: '不能为空~',
            trigger: 'blur',
          },
        ],
        mobile: [
          {
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '请输入正确手机号~',
            trigger: 'blur',
          },
        ],
      }
      //子菜单
      if (this.form.menuType == 1) {
        result.parentId = [
          { required: true, message: '不能为空~', trigger: 'change' },
        ]
      }
      return result
    },
    menuList() {
      //过滤出按钮权限
      function filterNode(data) {
        data = data.filter((val) => {
          if (val.children?.length > 0) {
            val.children = filterNode(val.children)
          } else if (val.children?.length == 0 || !val.children) {
            delete val.children
          }
          // if (val.menuType == 0 || val.menuType == 1) return true
          if (val) return true
        })
        return data
      }
      //过滤出不是叶子节点
      return filterNode(this.selectList.menuList)
    },
  },
  methods: {
    initForm(data, parmas) {
      //回显赋值
      if (this.form.id) {
        this.statusShow = +this.form.status ? true : false
      }
      //上级菜单的下拉
      this.selectList = data
      parmas && Object.assign(this.form, parmas)
    },
    add() {
      this.edit({})
    },
    update(record) {
      this.visible = true
    },
    close() {
      this.visible = false
      // 值还原
      this.form = JSON.parse(JSON.stringify(Oform))
      //取消验证状态
      this.$refs.formModel.clearValidate()
      //this.$utils.fromReset(this.form);
    },
    handleOk() {
      // 触发表单验证
      this.$refs.formModel.validate(async (valid) => {
        if (!valid) return
        this.confirmLoading = true
        //字典
        const http = this.form.id
          ? this.$api.system.sys.depart.edit.put
          : this.$api.system.sys.depart.add.post
        await http(this.form)
        this.confirmLoading = false
        this.close()
        this.$emit('refresh')
      })
    },
    handleCancel() {
      this.close()
    },
  },
}
</script>

<style scoped lang="less">
</style>