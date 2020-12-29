<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="close"
    cancelText="关闭"
  >
    <!-- "url": "jdbc:mysql://127.0.0.1:3306/projectName?characterEncoding=UTF-8&useUnicode=true&useSSL=false",//数据源地址
  "driverClassName": "com.mysql.jdbc.Driver",//驱动类
  "pollName": "",//数据库名称
  "username": "",//用户名
  "password": "",//密码
  "remark": "",//备注 -->
    <a-spin :spinning="confirmLoading">
      <a-form-model ref="formModel" :model="form" :rules="rules">
        <a-form-model-item
          label="数据源地址"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="url"
        >
          <a-input placeholder="请输入数据源地址" v-model="form.url" />
        </a-form-model-item>

        <a-form-model-item
          label="驱动类"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="driverClassName"
        >
          <a-input placeholder="请输入驱动类" v-model="form.driverClassName" />
        </a-form-model-item>

        <a-form-model-item
          label="数据库名称"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="pollName"
        >
          <a-input placeholder="请输入数据库名称" v-model="form.pollName" />
        </a-form-model-item>

        <a-form-model-item
          label="数据库类型"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="dbType"
        >
          <a-select v-model="form.dbType" placeholder="请选择数据库类型">
            <a-select-option
              v-for="item in dbTypeList"
              :key="item.value"
              :value="item.value"
              >{{ item.text }}</a-select-option
            >
          </a-select>
        </a-form-model-item>

        <a-form-model-item
          label="用户名"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="username"
        >
          <a-input
            autocomplete="false"
            placeholder="请输入用户名"
            v-model="form.username"
          />
        </a-form-model-item>

        <a-form-model-item
          label="密码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="password"
        >
          <a-input
            type="password"
            autocomplete="false"
            placeholder="请输入密码"
            v-model="form.password"
          />
        </a-form-model-item>

        <a-form-model-item
          label="备注"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="remark"
        >
          <a-textarea v-model="form.remark" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
let Oform = {
  id: '',
  url:
    'jdbc:mysql://127.0.0.1:3306/projectName?characterEncoding=UTF-8&useUnicode=true&useSSL=false', //数据源地址
  driverClassName: 'com.mysql.jdbc.Driver', //驱动类
  pollName: '', //数据库名称
  username: '', //用户名
  password: '', //密码
  remark: '', //备注
  dbType: '', //数据库类型
}
export default {
  name: 'modalForm',
  data() {
    return {
      title: '操作',
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
        url:
          'jdbc:mysql://127.0.0.1:3306/projectName?characterEncoding=UTF-8&useUnicode=true&useSSL=false', //数据源地址
        driverClassName: 'com.mysql.jdbc.Driver', //驱动类
        pollName: '', //数据库名称
        username: '', //用户名
        password: '', //密码
        remark: '', //备注
        dbType: '', //数据库类型
      },
      dbTypeList: this.$dict('dbType'),
      roleList: [],
    }
  },
  created() {
    console.log(this.$dict('dbType'))
  },
  computed: {
    rules() {
      let result = {
        url: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        driverClassName: [
          { required: true, message: '不能为空~', trigger: 'blur' },
        ],
        pollName: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        username: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        password: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        dbType: [{ required: true, message: '不能为空~', trigger: 'blur' }],
      }
      return result
    },
  },
  methods: {
    initForm(data, parmas) {
      parmas && Object.assign(this.form, parmas)
    },
    close() {
      this.visible = false
      // 值还原
      this.form = JSON.parse(JSON.stringify(Oform))
      //取消验证状态
      this.$refs.formModel.clearValidate()
    },
    handleOk() {
      // 触发表单验证
      this.$refs.formModel.validate(async (valid) => {
        if (!valid) return
        this.confirmLoading = true
        //字典
        let res = this.form.id
          ? ''
          : await this.$http.post('/generator/datasources/addDruid', this.form)

        this.confirmLoading = false
        if (res.success) {
          this.close()
          this.$emit('refresh')
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
</style>