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
        <a-form-model-item
          label="角色编码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="roleCode"
        >
          <a-input placeholder="请输入角色编码" v-model="form.roleCode" />
        </a-form-model-item>

        <a-form-model-item
          label="角色名称"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="roleName"
        >
          <a-input placeholder="请输入角色名称" v-model="form.roleName" />
        </a-form-model-item>

        <a-form-model-item
          label="备注"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="description"
        >
          <a-textarea placeholder="请输入备注信息" v-model="form.description" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: 'modalForm',
  props:['title'],
  data() {
    let unique1 = async (rule, value, callback) => {
      let res = await this.$http.get("/system/sys/role/checkRoleCode",{
        roleId: this.form.id,
        roleCode: value,
      })
      !res.result ? callback() : callback(new Error('需要保证值唯一'))
    }
    return {
      //title: '操作',
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      confirmLoading: false,
      form: {
        id: '',
        roleCode: '',
        roleName: '',
        description: '',
      },
      rules: {
        roleCode: [
          { required: true, message: '不能为空~', trigger: 'blur' },
          { validator:unique1, trigger: 'blur' },
        ],
        roleName: [{ required: true, message: '不能为空~', trigger: 'blur' }],
      },
    }
  },
  methods: {
    initForm(data, parmas) {
      //上级菜单的下拉
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
      this.$utils.fromReset(this.form)
      //取消验证状态
      this.$refs.formModel.clearValidate()
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
          ? this.$api.system.sys.role.edit.put
          : this.$api.system.sys.role.add.get

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