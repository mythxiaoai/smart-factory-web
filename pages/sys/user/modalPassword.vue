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
          label="登陆账户"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="username"
        >
          <a-input
            placeholder="请输入登陆账户"
            v-model="form.username"
            read-only
          />
        </a-form-model-item>
        <a-form-model-item
          label="登陆密码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="password"
        >
          <a-input
            type="text"
            autocomplete="false"
            placeholder="请输入登陆密码"
            v-model="form.password"
          />
        </a-form-model-item>

        <!-- <a-form-model-item
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
        </a-form-model-item> -->
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
let Oform = {
  username: '',
  password: 'a123456',
  rePassword: '',
}
export default {
  name: 'modalForm',
  data() {
    let unique2 = (rule, value, callback) => {
      value == this.form.password
        ? callback()
        : callback(new Error('密码输入不一致'))
    }
    return {
      unique2,
      title: '重置密码',
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
        username: '',
        password: 'a123456',
        rePassword: '',
      },
      roleList: [],
    }
  },
  created() {},
  computed: {
    rules() {
      let result = {
        username: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        password: [
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
      this.form.username = parmas.username
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
        let res = await this.$http.put('/system/sys/user/resetPassword', {
          newPassword: this.form.password,
          username: this.form.username,
        })

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