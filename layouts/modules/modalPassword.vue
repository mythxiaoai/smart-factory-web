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
          label="旧密码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="password"
        >
          <a-input
            type="password"
            autocomplete="false"
            placeholder="请输入旧密码"
            v-model="form.password"
          />
        </a-form-model-item>
        <a-form-model-item
          label="新密码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="newPassword"
        >
          <a-input
            type="password"
            autocomplete="false"
            placeholder="请输入新密码"
            v-model="form.newPassword"
          />
        </a-form-model-item>

        <a-form-model-item
          label="确认密码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="rePassword"
        >
          <a-input
            type="password"
            autocomplete="false"
            placeholder="请输入确认密码"
            v-model="form.rePassword"
          />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
let Oform = {
  password: '',
  newPassword: '',
  rePassword: '',
}
export default {
  name: 'modalForm',
  data() {
    let unique2 = (rule, value, callback) => {
      value == this.form.newPassword
        ? callback()
        : callback(new Error('密码输入不一致'))
    }
    return {
      unique2,
      title: '修改密码',
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
        password: '',
        newPassword: '',
        rePassword: '',
      },
      roleList: [],
    }
  },
  created() {},
  computed: {
    rules() {
      let result = {
        password: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        newPassword: [
          { required: true, message: '不能为空~', trigger: 'blur' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?!([^(0-9a-zA-Z)])+$).{6,20}$/,
            trigger: 'blur',
            message: '密码需要6位含有字母和数字~',
          },
        ],
        rePassword: [
          { required: true, message: '不能为空~', trigger: 'blur' },
          { validator: this.unique2, trigger: 'blur' },
        ],
      }
      return result
    },
  },
  methods: {
    initForm(data, parmas) {
    //   this.form.username = parmas.username
    },
    close() {
      this.visible = false
      // 值还原
      this.form = JSON.parse(JSON.stringify(Oform))
      //取消验证状态
      this.$refs.formModel.clearValidate()
    },
    handleOk() {
      this.$refs.formModel.validate(async (valid) => {
        if (!valid) return
        this.confirmLoading = true
        let res = await this.$http.put('/system/sys/user/updatePassword', {
          newPassword: this.form.rePassword,
          password: this.form.password,
        })

        this.confirmLoading = false
        this.close()
        // this.$emit('refresh')
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