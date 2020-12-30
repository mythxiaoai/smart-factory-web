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
          label="生成包路径"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="packageName"
        >
          <a-input placeholder="请输入部门名称" v-model="form.packageName" />
        </a-form-model-item>

        <a-form-model-item
          label="生成模块名"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="moduleName"
        >
          <a-input placeholder="请输入地址" v-model="form.moduleName" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
let Oform = {
  packageName: '',
  moduleName: '',
  tableIds: '',
}
export default {
  name: 'modalForm',
  data() {
    return {
      title: '批量修改',
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
      form: {
        packageName: '',
        moduleName: '',
        tableIds: '',
      },
    }
  },
  created() {},
  computed: {
    rules() {
      //一级菜单
      let result = {
        moduleName: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        packageName: [
          { required: true, message: '不能为空~', trigger: 'blur' },
        ],
      }
      return result
    },
  },
  methods: {
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
        console.log(this.form)
        if (!valid) return
        this.confirmLoading = true
        this.$http.put('/generator/gen/batch/update/package', this.form)

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