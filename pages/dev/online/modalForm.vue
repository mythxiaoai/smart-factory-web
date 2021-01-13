<template>
  <a-modal
    :title="title"
    width="100%"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="临时保存"
    okText="保存"
    class="full_screen"
  >
    <div class="content online">
      <div class="componet">
        <div class="title">组件列表</div>
        <div class="scoll">
          <div class="lists">
            <componentSelect></componentSelect>
          </div>
        </div>
      </div>
      <div class="body">
        <preview></preview>
      </div>
      <div class="config">
        <a-tabs v-model="$store.state.online.action">
          <a-tab-pane :key="1" tab="全局">
            <div class="scoll">
              <globalConfig ref="globalConfig"></globalConfig>
            </div>
          </a-tab-pane>
          <a-tab-pane :key="2" tab="表单" force-render>
            <div class="scoll"><formConfig ref="formConfig"></formConfig></div>
          </a-tab-pane>
          <a-tab-pane :key="3" tab="列表">
            <div class="scoll"><tableConfig></tableConfig></div>
          </a-tab-pane>
          <a-tab-pane :key="4" tab="数据库" force-render>
            <div class="scoll"><dbConfig ref="dbConfig"></dbConfig></div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-modal>
</template>

<script>
import componentSelect from './components/componentSelect'
import dbConfig from './components/dbConfig'
import formConfig from './components/formConfig'
import globalConfig from './components/globalConfig'
import tableConfig from './components/tableConfig'
import preview from './components/preview'

export default {
  components: {
    componentSelect,
    dbConfig,
    formConfig,
    globalConfig,
    tableConfig,
    preview,
  },
  name: 'modalForm',
  created() {},
  data() {
    return {
      title: '业务名称',
      visible: false,
      confirmLoading: false,
    }
  },
  computed: {},
  methods: {
    initForm() {},
    async handleOk() {
      let form = this.$store.state.online.form
      // 触发表单验证
      this.$store.state.online.action = 1
      await this.$refs.globalConfig.$refs.globalConfig.validate()

      this.$store.state.online.action = 2
     
      await this.$refs.formConfig.$refs.formConfig.validate()

      this.$store.state.online.action = 4
      await this.$refs.dbConfig.$refs.dbConfig.validate()
    },
    handleCancel() {
      this.visible = false
      // 值还原
      //取消验证状态
      // this.close()
    },
  },
}
</script>

<style scoped lang="less">
.content {
  display: flex;
  height: 100%;
  .componet {
    flex-basis: 220px;
    overflow: hidden;
    background: #f5f5f5;
    > .title {
      padding: 5px 8px;
      border-bottom: 1px solid #e7e7e7;
      height: 30px;
    }
    .scoll {
      height: calc(100% - 30px);
      margin-right: -17px;
      overflow-y: auto;
    }
    .lists {
      height: 100%;
      width: 220px;
    }
  }
  .body {
    flex: 1;
  }
  .config {
    width: 350px;
    background: #f5f5f5;
    position: relative;
    font-size: 12px;
    .scoll {
      position: absolute;
      top: 45px;
      height: calc(100% - 45px);
      left: 0px;
      right: -17px;
      overflow-y: auto;
      > div {
        width: 350px;
      }
    }
  }
}
</style>
<style scoped>
>>> .ant-modal-body {
  padding: 0;
}
>>> .online .ant-form-item {
  margin-bottom: 0;
}

>>> .online .ant-tabs {
  height: 100%;
}
>>> .online .ant-form-item-label {
  text-align: left;
  padding-left: 16px;
}

>>> .online .ant-input-group .ant-input {
  float: none;
}
>>> .online .ant-collapse-content {
  background: #fff;
}

>>> .online .ant-collapse {
  font-size: 12px;
  background: transparent;
}
>>> .online .ant-collapse-header {
  padding: 9px 16px;
}
>>> .online .ant-collapse-borderless > .ant-collapse-item {
  border-color: #eaeaea;
}
>>> .online .ant-collapse-borderless {
  background: transparent;
}
>>> .online .ant-row-flex {
  width: 100%;
}

>>> .online form .ant-input-group .ant-select {
  width: 95%;
}
>>> .online form .ant-input-group .ant-input {
  width: 95%;
}
</style>