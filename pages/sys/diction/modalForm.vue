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
          label="字典名称"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="dictName"
        >
          <a-input placeholder="请输入字典名称" v-model="form.dictName" />
        </a-form-model-item>

        <a-form-model-item
          label="字典编号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="dictCode"
        >
          <a-input placeholder="请输入字典编号" v-model="form.dictCode" />
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
            checked-children="启用"
            un-checked-children="禁用"
          />
        </a-form-model-item>
        <a-form-model-item
          label="备注"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          hasFeedback
          prop="description"
        >
          <a-textarea placeholder="请输入关键词" v-model="form.description" />
        </a-form-model-item>
        <a-divider class="fz12">子项</a-divider>

        <a-row type="flex" class="m-b" justify="center" :gutter="15">
          <a-col
            v-for="(item, index) in multiterm.label"
            :key="index"
            :flex="1"
            class="text-c"
            >{{ item }}</a-col
          >
          <a-col flex="0 1 100px" class="text-c">操作</a-col>
        </a-row>
        <a-row
          type="flex"
          justify="center"
          :gutter="15"
          v-for="(item, index) in multitermData"
          :key="index"
        >
          <a-col :flex="1" v-for="key in Object.keys(item)" :key="key">
            <a-form-model-item
              hasFeedback
              :prop="`dictItemList[${index}][${key}]`"
            >
              <a-input
                v-if="key === 'sortOrder'"
                v-model.number="form.dictItemList[index][key]"
              />
              <a-input v-else v-model="form.dictItemList[index][key]" />
            </a-form-model-item>
          </a-col>

          <a-col flex="0 1 100px" class="text-c">
            <a-form-model-item hasFeedback>
              <a-button-group>
                <a-popconfirm
                  v-if="hasValue(index)"
                  title="确定删除吗?"
                  @confirm="minus(index)"
                >
                  <a-button
                    icon="minus"
                    v-show="multitermData.length > 1"
                  ></a-button>
                </a-popconfirm>
                <a-button
                  v-else
                  icon="minus"
                  v-show="multitermData.length > 1"
                  @click="minus(index)"
                ></a-button>
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
let Oform = {
  dictName: '',
  dictCode: '',
  status: 1,
  delFlag: 0,
  statusShow: true,
  description: '',
  dictItemList: [{ itemText: '', itemValue: '', sortOrder: 1 }],
}
export default {
  name: 'modalForm',
  data() {
    let unique1 = async (rule, value, callback) => {
      let res = await this.$http.get('/system/sys/dict/checkDictCode',{
        dictId: this.form.id,
        dictCode: this.form.dictCode,
      })
      !res.result ? callback() : callback(new Error('需要保证值唯一'))
    }
    let unique2 = async (rule, value, callback) => {
      return new Promise((resolve, reject) =>{
        //本地输入校验
        let i = 0
        this.form.dictItemList.forEach((v) => {
          i = 0
          this.form.dictItemList.forEach((k) => {
            if (v.itemValue == k.itemValue) {
              i++
              if (i == 2) {
                reject("需要保证值唯一")
              }
            }
          })
        })
        resolve()
      })
    }

    let unique3 = async (rule, value, callback) => {
      //异步校验
      let res = await this.$http.get("/system/sys/dict/checkDictItemCode",{
        dictId: this.form.id || '',
        dictItemId: rule.id,
        dictItemCode: value,
      })
      if(!res.result){
          return Promise.resolve();
      }else{
          return Promise.reject("需要保证值唯一");
      }
    }
    return {
      unique2,
      unique3,
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
      form: {
        dictName: '',
        dictCode: '',
        status: 1,
        delFlag: 0,
        statusShow: true,
        description: '',
        dictItemList: [{ itemText: '', itemValue: '', sortOrder: 1 }],
      },
      rules: {
        dictName: [{ required: true, message: '不能为空~' }],
        dictCode: [
          { required: true, message: '不能为空~', trigger: 'blur' },
          { validator: unique1, trigger: 'blur' },
        ],
        nonEmpty: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        verify: [{ required: true, message: '不能为空~', trigger: 'blur' }],
        dictItemList: [
          {
            itemText: [{ required: true, message: '不能为空~' }],
            itemValue: [{ required: true, message: '不能为空~' }],
          },
        ],
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
    multitermData() {
      //rules的同步  id传入
      let len = this.form.dictItemList.length
      let arr = []
      for (let i = 0; i < len; i++) {
        arr.push({
          itemText: [{ required: true, message: '不能为空~', trigger: 'blur' }],
          itemValue: [
            { required: true, message: '不能为空~', trigger: 'blur' },
            {
              asyncValidator: this.unique2,
              trigger: 'blur',
            },
            {
              asyncValidator: this.unique3,
              trigger: 'blur',
              id: this.form.dictItemList[i].id || '',
            },
          ],
        })
      }
      this.rules.dictItemList = arr

      return this.form.dictItemList.map((v) => {
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
          ? this.$api.system.sys.dict.edit.put
          : this.$api.system.sys.dict.add.post
        this.form.$msg = 'none' //不弹通知
        let res = await http(this.form)
        //做新增  先添加父id  在搞事
        if (res.result) this.form.id = res.result.id
        //字典项
        let promiseArr = []
        this.form.dictItemList.map((v) => {
          const http = v.id
            ? this.$api.system.sys.dict.item.edit.put
            : this.$api.system.sys.dict.item.add.post
          //编辑和新增都加上字典的id
          v.dictId = this.form.id
          promiseArr.push(http(v))
        })
        res = await Promise.all(promiseArr)
        console.log(res)
        this.confirmLoading = false

        this.close()
        this.$emit('refresh');
        //刷新全局字典表
        this.$store.dispatch('security/getAlldict');
      })
    },
    handleCancel() {
      this.close()
    },
    handleVisibleChange(index) {
      let value = this.form.getFieldValue(`dictItemList`)[index]
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
    async minus(index) {
      console.log(this.form.dictItemList[index].id)
      if (this.form.dictItemList[index].id) {
        const res = await this.$http.delete("/system/sys/dict/item/deleteBatch",[
          this.form.dictItemList[index].id,
        ])
      }
      this.form.dictItemList.splice(index, 1)
      this.multiterm.visible.splice(index, 1)
    },
    plus(index) {
      //split长度为0会插入当前值的前面
      this.form.dictItemList.splice(index + 1, 0, {
        itemText: '',
        itemValue: '',
      })
      this.multiterm.visible.splice(index + 1, 0, false)
    },
    hasValue: function (index) {
      return this.form.dictItemList[index].id
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