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
            <a-radio-button :value="0"> 一级菜单 </a-radio-button>
            <a-radio-button :value="1"> 子菜单 </a-radio-button>
            <a-radio-button :value="2"> 按钮权限 </a-radio-button>
          </a-radio-group>
        </a-form-model-item>

        <div v-show="form.menuType == 0 || form.menuType == 1">
          <a-form-model-item
            label="上级菜单"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="parentId"
            v-show="form.menuType === 1"
          >
            <a-tree-select
              v-model="form.parentId"
              :tree-data="menuList"
              placeholder="请选择上级菜单"
              :replaceFields="{ title: 'name', value: 'id', key: 'id' }"
            >
            </a-tree-select>
          </a-form-model-item>

          <a-form-model-item
            label="菜单名称"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="name"
          >
            <a-input placeholder="请输入菜单名称" v-model="form.name" />
          </a-form-model-item>

          <a-form-model-item
            label="菜单路径"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="url"
          >
            <a-input placeholder="请输入菜单路径" v-model="form.url" />
          </a-form-model-item>

          <a-form-model-item
            label="菜单图标"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="icon"
            v-show="form.menuType === 0"
          >
            <a-input placeholder="请输入菜单图标" v-model="form.icon" />
          </a-form-model-item>

          <a-form-model-item
            label="排序"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="sortNo"
          >
            <a-input
              placeholder="请输入菜单排序"
              v-model.number="form.sortNo"
            />
          </a-form-model-item>

          <a-form-model-item
            label="是否是主菜单"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="routeFlag"
          >
            <a-switch
              @change="form.routeFlag = form.routeFlagShow ? 1 : 0"
              v-model="form.routeFlagShow"
              checked-children="是"
              un-checked-children="否"
            />
          </a-form-model-item>

          <a-form-model-item
            label="是否启用"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="status"
          >
            <a-switch
              @change="form.status = form.statusShow ? 1 : 0"
              v-model="form.statusShow"
              checked-children="是"
              un-checked-children="否"
            />
          </a-form-model-item>

          <a-form-model-item
            label="打开方式"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="internalOrExternal"
          >
            <a-switch
              @change="
                form.internalOrExternal = form.internalOrExternalShow ? 0 : 1
              "
              v-model="form.internalOrExternalShow"
              checked-children="内部"
              un-checked-children="外部"
            />
          </a-form-model-item>
        </div>
        <div v-show="form.menuType == 2">
          <a-form-model-item
            label="上级菜单"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="parentId"
          >
            <a-tree-select
              v-model="form.parentId"
              :tree-data="menuList"
              placeholder="请选择上级菜单"
              :replaceFields="{ title: 'name', value: 'id', key: 'id' }"
            >
            </a-tree-select>
          </a-form-model-item>

          <a-form-model-item
            label="功能名称"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="name"
          >
            <a-input placeholder="请输入功能名称" v-model="form.name" />
          </a-form-model-item>

          <a-form-model-item
            label="授权标识"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="perms"
          >
            <a-input
              placeholder="多个用逗号分隔, 如: user:list,user:create"
              v-model="form.perms"
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
  parentId: null,
  name: '',
  url: '',
  icon: null,
  sortNo: 1,
  routeFlag: 1,
  routeFlagShow: true,
  //是否内部打开 0 内部  1外部
  internalOrExternal: 0,
  internalOrExternalShow: true,
  status: 1,
  statusShow: true,
  perms: '',
  ruleFlag: 0,
  leafFlag: null,
  description: null,
}
export default {
  name: 'modalForm',
  data() {
    let unique1 = async (rule, value, callback) => {
      if(!this.form.parentId){
        callback(new Error('请先选择上级菜单~'));
        return;
      }
      
      //parentPermissionId perName permissionId
      let res = await this.$api.sys.menu.checkSubName({
        parentPermissionId: this.form.parentId,
        perName: value,
        permissionId: this.form.id,
      })
      !res.result ? callback() : callback(new Error('需要保证值唯一'))
    }
    return {
      unique1,
      title: '操作',
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
      selectList:{
        menuList:[]
      },
      form: {
        menuType: 0,
        parentId: null,
        name: '',
        url: '',
        icon: null,
        sortNo: 1,
        perms: '',
        routeFlag: 1,
        routeFlagShow: true,
        //是否内部打开 0 内部  1外部
        internalOrExternal: 0,
        internalOrExternalShow: true,
        status: 1,
        statusShow: true,
        ruleFlag: 0,
        leafFlag: null,
        description: null,
      },

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
        name: [{ required: true, message: '不能为空~', trigger: 'blur' }]
      }
      //子菜单
      if (this.form.menuType == 1) {
        result.parentId = [
          { required: true, message: '不能为空~', trigger: 'change' },
        ]
      }
      //按钮权限
      if (this.form.menuType == 2) {
        result = {
          name: [
            { required: true, message: '不能为空~', trigger: 'blur' },
            { validator: this.unique1, trigger: 'blur' },
          ],
          parentId: [{ required: true, message: '不能为空~', trigger: 'change' }],
        }
      }
      return result
    },
    menuList() {
      //过滤出按钮权限
      function filterNode(data) {
        data = data.filter((val) => {
          if (val.children?.length > 0) {
            val.children = filterNode(val.children)
          } else if (val.children?.length == 0) {
            delete val.children
          }
          if (val.menuType == 0 || val.menuType == 1) return true
        })
        return data
      }

      //过滤出不是叶子节点
      return filterNode(this.selectList.menuList)
    },
  },
  methods: {
    initForm(data,parmas) {
      //回显赋值
      if (this.form.id) {
        this.form.routeFlagShow = this.form.routeFlag ? true : false
        this.form.statusShow = this.form.status ? true : false
        this.form.internalOrExternalShow = this.form.internalOrExternal
          ? false
          : true
      }
      //上级菜单的下拉
      this.selectList = data;
      parmas && Object.assign(this.form,parmas);
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
      /*
        menuType: 0,
        parentId: null,
        name: '',
        url: '',
        icon: null,
        sortNo: 1,
        perms:"",
        routeFlag: 1,
        routeFlagShow: true,
        //是否内部打开 0 内部  1外部
        internalOrExternal: 0,
        internalOrExternalShow: true,
        status: 1,
        statusShow: true,
        ruleFlag: 0,
        leafFlag: null,
        description: null,
       */
      // 触发表单验证
      this.$refs.formModel.validate(async (valid) => {
        if (!valid) return
        this.confirmLoading = true
        //字典
        const http = this.form.id
          ? this.$api.sys.menu.edit
          : this.$api.sys.menu.add
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