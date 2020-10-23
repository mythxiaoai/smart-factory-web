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
      <a-form-model :model="form" :rules="rules">
        <a-form-model-item
          label="字典名称"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          props="name"
        >
          <a-input placeholder="请输入字典名称" v-model="form.name" />
        </a-form-model-item>
        <a-form-model-item
          label="字典编号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          props="keyWord"
        >
          <a-input placeholder="请输入字典编号" v-model="form.keyWord" />
        </a-form-model-item>
        <a-form-model-item
          label="是否启用"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          props="status"
        >
          <a-switch checked v-model="form.status" />
        </a-form-model-item>
        <a-form-model-item
          label="备注"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          props="description"
        >
          <a-input placeholder="请输入关键词" v-model="form.description" />
        </a-form-model-item>
        <a-divider class="fz12">子项</a-divider>

        <a-row type="flex" class="m-b" justify="center" :gutter="15">
          <a-col
            v-for="(item,index) in multiterm.label"
            :key="index"
            :flex="1"
            class="text-c"
          >{{item}}</a-col>
          <a-col flex="0 1 100px" class="text-c">操作</a-col>
        </a-row>
        <a-row
          type="flex"
          justify="center"
          :gutter="15"
          v-for="(item,index) in multitermData"
          :key="index"
        >
          <a-col :flex="1" v-for="(key) in Object.keys(item)" :key="key">
            <a-form-model-item hasFeedback>
              <a-input v-model="form.sub[index][key]" />
            </a-form-model-item>
          </a-col>

          <a-col flex="0 1 100px" class="text-c">
            <a-form-model-item hasFeedback>
              <a-button-group>
                <a-popconfirm v-if="hasValue(index)" title="确定删除吗?" @confirm="minus(index)">
                  <a-button icon="minus" v-show="multitermData.length>1"></a-button>
                </a-popconfirm>
                <a-button v-else icon="minus" v-show="multitermData.length>1" @click="minus(index)"></a-button>
                <a-button icon="plus" @click="plus(index)"></a-button>
              </a-button-group>
            </a-form-model-item>
          </a-col>
        </a-row>
        <!-- <a-row type="flex" class="m-b" justify="center" :gutter="15">
          <a-col :flex="1" class="text-c">键</a-col>
          <a-col :flex="1" class="text-c">值</a-col>
          <a-col flex="0 1 100px" class="text-c">操作</a-col>
        </a-row>
        <a-row type="flex" class="m-b" justify="center" :gutter="15">
          <a-col :flex="1">
            <a-input placeholder="请输入字典名称" v-decorator="['name', {}]" />
          </a-col>
          <a-col :flex="1">
            <a-input placeholder="请输入字典名称" v-decorator="['name', {}]" />
          </a-col>
          <a-col flex="0 1 100px" class="text-c">
            <a-button-group>
              <a-button icon="minus"></a-button>
              <a-button icon="plus"></a-button>
            </a-button-group>
          </a-col>
        </a-row>
        <a-row type="flex" class="m-b" justify="center" :gutter="15">
          <a-col :flex="1">
            <a-input placeholder="请输入字典名称" v-decorator="['name', {}]" />
          </a-col>
          <a-col :flex="1">
            <a-input placeholder="请输入字典名称" v-decorator="['name', {}]" />
          </a-col>
          <a-col flex="0 1 100px" class="text-c">
            <a-button-group>
              <a-button icon="minus"></a-button>
              <a-button icon="plus"></a-button>
            </a-button-group>
          </a-col>
        </a-row>-->
      </a-form-model>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  name: 'modalForm',
  data() {
    return {
      title: '操作',
      visible: true,
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
        name: '',
        keyWord: '',
        status: '',
        description: '',
        sub: [
          { id: 1, key: '1', value: '男' },
          { id: 2, key: '2', value: '女' },
        ],
      },
      rules: {},
      validatorRules: {},
      multiterm: {
        label: ['键', '值'],
        visible: [false, false],
        showKey: ['key', 'value'],
      },
    }
  },
  created() {},
  computed: {
    multitermData() {
      return this.form.sub.map((v) => {
        let json = {}
        this.multiterm.showKey.forEach((key) => {
          json[key] = v[key]
        })
        return json
      })
    },
  },
  methods: {
    disableSubmit() {},
    add() {
      this.edit({})
    },
    update(record) {
      this.visible = true
      this.title = '修改'
      // this.form.resetFields();
      // this.model = Object.assign({}, record);
      // this.visible = true;
      // this.$nextTick(() => {
      //   this.form.setFieldsValue(pick(this.model, "name", "keyWord", "sex", "age", "email", "content"));
      //   //时间格式化
      //   this.form.setFieldsValue({ punchTime: this.model.punchTime ? moment(this.model.punchTime, "YYYY-MM-DD HH:mm:ss") : null });
      //   this.form.setFieldsValue({ birthday: this.model.birthday ? moment(this.model.birthday) : null });
      // });
    },
    close() {
      this.$emit('close')
      this.visible = false
    },
    handleOk() {
      const that = this
      // 触发表单验证
      this.form.validateFields((err, values) => {
        console.log(values)
        return
        if (!err) {
          that.confirmLoading = true
          let httpurl = ''
          let method = ''
          if (!this.model.id) {
            httpurl += this.url.add
            method = 'post'
          } else {
            httpurl += this.url.edit
            method = 'put'
          }
          let formData = Object.assign(this.model, values)
          //时间格式化
          formData.punchTime = formData.punchTime
            ? formData.punchTime.format('YYYY-MM-DD HH:mm:ss')
            : null
          formData.birthday = formData.birthday
            ? formData.birthday.format()
            : null

          console.log(formData)
          httpAction(httpurl, formData, method)
            .then((res) => {
              if (res.success) {
                that.$message.success(res.message)
                that.$emit('ok')
              } else {
                that.$message.warning(res.message)
              }
            })
            .finally(() => {
              that.confirmLoading = false
              that.close()
            })
        }
      })
    },
    handleCancel() {
      this.close()
    },
    handleVisibleChange(index) {
      console.log(index)
      let value = this.form.getFieldValue(`sub`)[index]
      value = Object.values(value).join('')
      if (value) {
        this.showPop(index)
      } else {
        this.hidePop(index)
        this.minus(index)
      }
    },
    hidePop(index) {
      this.multiterm.visible.splice(index, 1, false)
    },
    showPop(index) {
      this.multiterm.visible.splice(index, 1, true)
    },
    minus(index) {
      console.log(this.form)
      this.form.sub.splice(index, 1)
      this.multiterm.visible.splice(index, 1)
      // this.form.setFieldsValue({ sub: this.multiterm.data })
    },
    plus(index) {
      console.log(index)
      console.log(this.form)
      //split长度为0会插入当前值的前面
      this.form.sub.splice(index + 1, 0, { key: '', value: '' })
      this.multiterm.visible.splice(index + 1, 0, false)
      // this.form.setFieldsValue({ sub: this.multiterm.data });
    },
    hasValue: function (index) {
      return this.form.sub[index].key + this.form.sub[index].value
    },
  },
}
</script>

<style scoped lang="less">
.text-r {
  text-align: right;
}
.text-c {
  text-align: center;
}
.weight700 {
  font-weight: 700;
}
.fz12 {
  font-size: 12px;
}
.m-b {
  margin-bottom: 15px;
}
</style>