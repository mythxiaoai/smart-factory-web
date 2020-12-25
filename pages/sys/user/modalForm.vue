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
            :disabled="disabled"
            v-model="form.username"
          />
        </a-form-model-item>
        <div v-show="!form.id">
          <a-form-model-item
            label="登陆密码"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            hasFeedback
            prop="password"
          >
            <a-input
              type="password"
              autocomplete="false"
              placeholder="请输入登陆密码"
              v-model="form.password"
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
        </div>

        <a-form-model-item
          label="用户姓名"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="realname"
        >
          <a-input placeholder="请输入用户姓名" v-model="form.realname" />
        </a-form-model-item>

        <a-form-model-item
          label="工号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="workNo"
        >
          <a-input placeholder="请输入工号" v-model="form.workNo" />
        </a-form-model-item>

        <a-form-model-item
          label="部门分配"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="departIdList"
        >
          <a-tree-select
            v-model="form.departIdList"
            :tree-data="depList"
            placeholder="请选择部门"
            multiple
            tree-checkable
            :replaceFields="{ title: 'departName', value: 'id', key: 'id' }"
          >
          </a-tree-select>
        </a-form-model-item>

        <a-form-model-item
          label="角色"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="roleIds"
        >
          <a-select
            mode="multiple"
            v-model="form.roleIds"
            placeholder="请输入角色"
          >
            <a-select-option
              v-for="item in roleList"
              :key="item.id"
              :value="item.id"
            >
              {{ item.roleName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
          label="生日"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="birthday"
        >
          <a-date-picker
            placeholder="请输入生日"
            v-model="form.birthday"
            valueFormat="YYYY-MM-DD"
          />
        </a-form-model-item>

        <a-form-model-item
          label="性别"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="sex"
        >
          <a-radio-group name="sex" v-model="form.sex">
            <a-radio :value="1"> 男 </a-radio>
            <a-radio :value="2"> 女 </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item
          label="邮箱"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="email"
        >
          <a-input placeholder="请输入邮箱" v-model="form.email" />
        </a-form-model-item>

        <a-form-model-item
          label="手机号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="phone"
        >
          <a-input placeholder="请输入手机号" v-model="form.phone" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
let Oform = {
  id: '',
  username: '',
  password: '',
  rePassword: '',
  realname: '',
  workNo: '',
  roleIds: [],
  departIdList: [],
  birthday: '',
  sex: 1, //1 男 2女
  email: '',
  phone: '',
  status: 1,
}
export default {
  name: 'modalForm',
  data() {
    let unique1 = async (rule, value, callback) => {
      let res = await this.$api.system.sys.user.checkUsername.get({
        userId: this.form.id,
        username: value,
      })
      !res.result ? callback() : callback(new Error(res.message))
    }
    let unique3 = async (rule, value, callback) => {
      let res = await this.$api.system.sys.user.checkWorkNo.get({
        userId: this.form.id,
        workNo: value,
      })
      !res.result ? callback() : callback(new Error(res.message))
    }
    let unique2 = (rule, value, callback) => {
      value == this.form.password
        ? callback()
        : callback(new Error('密码输入不一致'))
    }
    return {
      unique1,
      unique2,
      unique3,
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
        username: '',
        password: '',
        rePassword: '',
        realname: '',
        workNo: '',
        roleIds: [],
        departIdList: [],
        birthday: '',
        sex: 1, //1 男 2女
        email: '',
        phone: '',
        status: 1,
      },
      roleList: [],
      depList: [],
      disabled: false,
    }
  },
  created() {},
  computed: {
    rules() {
      let result = {
        username: [
          { required: true, message: '不能为空~', trigger: 'blur' },
          { validator: this.unique1, trigger: 'blur' },
        ],
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
        realname: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        workNo: [
          { required: true, message: '不能为空~', trigger: 'blur' },
          { validator: this.unique3, trigger: 'blur' },
        ],
        email: [{ type: 'email', message: '邮箱不合法~', trigger: 'blur' }],
        phone: [
          {
            pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
            message: '请输入正确手机号~',
            trigger: 'blur',
          },
        ],
      }
      if (this.form.id) {
        delete result.password
        delete result.rePassword
      }
      return result
    },
  },
  methods: {
    initForm(data, parmas) {
      //角色下拉的初始化
      this.$api.system.sys.role.queryall.get().then((res) => {
        this.roleList = res.result
      })
      this.$api.system.sys.depart.queryTreeList.get().then((res) => {
        this.depList = res.result
      })
      // parmas && Object.assign(this.form, parmas)
      this.disabled = false
      this.title = '添加用户'
      parmas &&
        this.$http
          .get(`/system/sys/user/queryById/${parmas.id}`)
          .then((res) => {
            res.result.departIdList = res.result.departList?.split(',')
            this.form = res.result
            this.form.roleIds = res.result.roleIds?.split(',')
            this.visible = true
            this.disabled = true
             this.title = '修改用户'
          })
    },
    close() {
      this.visible = false
      // 值还原
      this.form = JSON.parse(JSON.stringify(Oform))
      //取消验证状态
      this.$refs.formModel.clearValidate()
    },
    handleOk() {
      /*
				"id": "",
				"username": "",
				"password": "",
				"realname": "",
				"workNo": ""
        "roleIds": [],
				"birthday": "",
				"sex": 0,//1 男 2女
				"email": "",
				"phone": "",
				"status": 1,
        
	      "avatar": "",
				"createBy": "",
				"createTime": "",
				"delFlag": 0,
				"departIdList": [],
				"departIds": "",
				"departNameList": [],
				"orgCode": "",
				"phone": "",
				"post": "",
				"updateBy": "",
				"updateTime": "",
				"userIdentity": 0,
			}
       */
      // 触发表单验证
      this.$refs.formModel.validate(async (valid) => {
        if (!valid) return
        this.confirmLoading = true
        //字典
        const http = this.form.id
          ? this.$api.system.sys.user.edit.put
          : this.$api.system.sys.user.add.post

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