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
          label="应用名称"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="clientName"
        >
          <a-input placeholder="请输入应用名称" v-model="form.clientName" />
        </a-form-model-item>

        <a-form-model-item
          label="应用账户"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="clientId"
        >
          <a-input
            placeholder="应用账户/应用标识"
            v-model="form.clientId"
            :read-only="isUpdate ? true : false"
          />
        </a-form-model-item>

        <a-form-model-item
          label="授权类型"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="authorizedGrantTypes"
        >
          <a-select
            mode="multiple"
            v-model="form.authorizedGrantTypesShow"
            placeholder="请选择授权类型"
          >
            <a-select-option
              v-for="item in select.authorizedGrantTypesList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.text }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
          label="资源表"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="resourceIdsShow"
        >
          <a-select
            mode="multiple"
            v-model="form.resourceIdsShow"
            placeholder="请选择资源表"
          >
            <a-select-option
              v-for="item in select.resourceIdsList"
              :key="item.value"
              :value="item.value"
            >
              {{ item.text }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item
          label="显示授权"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="autoapprove"
        >
          <a-radio-group name="sex" v-model="form.autoapprove">
            <a-radio value="Y"> 显示 </a-radio>
            <a-radio value="N"> 隐藏 </a-radio>
          </a-radio-group>
        </a-form-model-item>

        <a-form-model-item
          label="access_token有效时长"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
        >
          <div class="box">
            <a-input v-model.number="form.accessTokenValidityShow.month" /><span
              >月</span
            >
            <a-input v-model.number="form.accessTokenValidityShow.day" /><span
              >天</span
            >
            <a-input v-model.number="form.accessTokenValidityShow.hour" /><span
              >时</span
            >
            <a-input
              v-model.number="form.accessTokenValidityShow.minute"
            /><span>分</span>
          </div>
        </a-form-model-item>

        <a-form-model-item
          label="refresh_token有效时长"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
        >
          <div class="box">
            <a-input
              v-model.number="form.refreshTokenValidityShow.month"
            /><span>月</span>
            <a-input v-model.number="form.refreshTokenValidityShow.day" /><span
              >天</span
            >
            <a-input v-model.number="form.refreshTokenValidityShow.hour" /><span
              >时</span
            >
            <a-input
              v-model.number="form.refreshTokenValidityShow.minute"
            /><span>分</span>
          </div>
        </a-form-model-item>

        <a-form-model-item
          label="回调地址"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="webServerRedirectUri"
        >
          <a-input
            placeholder="请输入回调地址"
            v-model="form.webServerRedirectUri"
          />
        </a-form-model-item>

        <a-form-model-item
          label="备注"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="remark"
        >
          <a-textarea placeholder="请输入备注" v-model="form.remark" />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
let Oform = {
  id: '',
  clientName: '', //应用名称
  clientId: '', //应用账户  SF
  authorizedGrantTypes: '', //授权类型
  authorizedGrantTypesShow: [], //授权类型
  resourceIds: '', //资源表
  resourceIdsShow: [], //资源表
  autoapprove: 'N', //显示授权 Y/N
  accessTokenValidity: 0, //access_token 1天有效时间
  accessTokenValidityShow: {
    month: 0,
    day: 1,
    hour: 0,
    minute: 0,
  }, //access_token 1天有效时间
  refreshTokenValidity: 0, //refreshtoken  1个月有效时间
  refreshTokenValidityShow: {
    month: 1,
    day: 0,
    hour: 0,
    minute: 0,
  }, //access_token 1天有效时间
  webServerRedirectUri: '', //回调地址
  remark: '',
}
export default {
  name: 'modalForm',
  props: ['title'],
  data() {
    let unique1 = async (rule, value, callback) => {
      let res = await this.$http.get('/system/sys/client/checkClientId', {
        clientId: value,
      })
      !res.result ? callback() : callback(new Error('需要保证值唯一'))
    }

    return {
      unique1,
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
        clientName: '', //应用名称
        clientId: '', //应用账户  SF
        authorizedGrantTypes: '', //授权类型
        authorizedGrantTypesShow: [], //授权类型
        resourceIds: '', //资源表
        resourceIdsShow: [], //资源表
        autoapprove: 'N', //显示授权 Y/N
        accessTokenValidity: 0, //access_token 1天有效时间
        accessTokenValidityShow: {
          month: 0,
          day: 1,
          hour: 0,
          minute: 0,
        }, //access_token 1天有效时间
        refreshTokenValidity: 0, //refreshtoken  1个月有效时间
        refreshTokenValidityShow: {
          month: 1,
          day: 0,
          hour: 0,
          minute: 0,
        }, //access_token 1天有效时间
        webServerRedirectUri: '', //回调地址
        remark: '',
      },
      select: {
        authorizedGrantTypesList: this.$dict('authorizedGrantTypes'),
        resourceIdsList: this.$dict('resourceIds'),
      },
    }
  },
  created() {},
  computed: {
    isUpdate() {
      return !!this.form.clientSecret
    },
    rules() {
      let result = {
        clientId: [
          { required: true, message: '不能为空~', trigger: 'blur' },
          { validator: this.unique1, trigger: 'blur' },
        ],
        clientName: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        authorizedGrantTypes: [
          { required: true, message: '不能为空~', trigger: 'blur' },
        ],
        resourceIdsShow: [
          { required: true, message: '不能为空~', trigger: 'blur' },
        ],
      }
      this.isUpdate && delete result.clientId
      return result
    },
  },
  methods: {
    initForm(data, parmas) {
      //回显值
      parmas = backForm(parmas)
      this.form = parmas
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
 id:"",
        clientName: '', //应用名称
        clientId: '', //应用账户  SF
        authorizedGrantTypes: '', //授权类型
        authorizedGrantTypesShow: [], //授权类型
        resourceIds: '', //资源表
        resourceIdsShow: [], //资源表
        autoapprove: 'N', //显示授权 Y/N
        accessTokenValidity: 0, //access_token 1天有效时间
        accessTokenValidityShow: {
          month:0,
          day:1,
          hour:0,
          minute:0,
        }, //access_token 1天有效时间
        
        refreshTokenValidity: 0, //refreshtoken  1个月有效时间
        refreshTokenValidityShow: {
          month:1,
          day:0,
          hour:0,
          minute:0,
        }, //access_token 1天有效时间
        webServerRedirectUri: '', //回调地址
        remark: '',
       */
      // 触发表单验证
      this.$refs.formModel.validate(async (valid) => {
        if (!valid) return
        this.confirmLoading = true
        //字典
        const http = this.isUpdate
          ? this.$api.system.sys.client.edit.put
          : this.$api.system.sys.client.add.post
        //数据处理
        let result = dealForm(this.form)

        await http(result)

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

function dealForm(form) {
  form = Object.freeze(form)
  form.authorizedGrantTypes = form.authorizedGrantTypesShow.join(',')
  form.resourceIds = form.resourceIdsShow.join(',')
  form.accessTokenValidity =
    form.accessTokenValidityShow.month * 30 * 24 * 60 * 60 +
    form.accessTokenValidityShow.day * 24 * 60 * 60 +
    form.accessTokenValidityShow.hour * 60 * 60 +
    form.accessTokenValidityShow.minute * 60
  form.refreshTokenValidity =
    form.refreshTokenValidityShow.month * 30 * 24 * 60 * 60 +
    form.refreshTokenValidityShow.day * 24 * 60 * 60 +
    form.refreshTokenValidityShow.hour * 60 * 60 +
    form.refreshTokenValidityShow.minute * 60
  return form
}
function backForm(form) {
  form.authorizedGrantTypesShow = form.authorizedGrantTypes
    ? form.authorizedGrantTypes.split(',')
    : []
  form.resourceIdsShow = form.resourceIds ? form.resourceIds.split(',') : []
  form.accessTokenValidityShow = {}
  form.accessTokenValidityShow.month =
    (form.accessTokenValidity / 60 / 60 / 24 / 30) | 0
  form.accessTokenValidityShow.day =
    (form.accessTokenValidity / 60 / 60 / 24) % 30 | 0
  form.accessTokenValidityShow.hour =
    (form.accessTokenValidity / 60 / 60) % 24 | 0
  form.accessTokenValidityShow.minute = (form.accessTokenValidity / 60) % 60 | 0

  form.refreshTokenValidityShow = {}
  form.refreshTokenValidityShow.month =
    (form.refreshTokenValidity / 60 / 60 / 24 / 30) | 0
  form.refreshTokenValidityShow.day =
    (form.refreshTokenValidity / 60 / 60 / 24) % 30 | 0
  form.refreshTokenValidityShow.hour =
    (form.refreshTokenValidity / 60 / 60) % 24 | 0
  form.refreshTokenValidityShow.minute =
    (form.refreshTokenValidity / 60) % 60 | 0
  return form
}
</script>

<style scoped lang="less">
.box {
  display: flex;
  align-items: center;
  input {
    width: 80px;
  }
  span {
    margin: 0 10px 0 5px;
  }
}
</style>