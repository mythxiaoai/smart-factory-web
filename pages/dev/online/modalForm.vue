<template>
  <a-modal
    :title="$store.state.online.form.table.businessName || ' '"
    width="100%"
    :visible="$store.state.online.visible"
    :confirmLoading="confirmLoading"
    @cancel="cancel"
    class="full_screen"
  >
    <template #footer>
      <div>
        <a-button @click="tempSave"> 临时保存 </a-button>
        <a-button type="primary" @click="save"> 保存 </a-button>
      </div>
    </template>
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
              <confGlobal ref="globalConfig"></confGlobal>
            </div>
          </a-tab-pane>
          <a-tab-pane
            v-if="$store.getters['online/hasData']"
            :key="2"
            tab="表单"
            force-render
          >
            <div class="scoll"><confFrom ref="formConfig"></confFrom></div>
          </a-tab-pane>
          <a-tab-pane
            v-if="$store.getters['online/hasData']"
            :key="3"
            tab="列表"
          >
            <div class="scoll"><confTable></confTable></div>
          </a-tab-pane>
          <a-tab-pane
            v-if="$store.getters['online/hasData']"
            :key="4"
            tab="数据库"
            force-render
          >
            <div class="scoll"><confDb></confDb></div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </div>
  </a-modal>
</template>

<script>
import componentSelect from './components/componentSelect'
import confDb from './components/confDb'
import confFrom from './components/confFrom'
import confGlobal from './components/confGlobal'
import confTable from './components/confTable'
import preview from './components/preview'
import Vue from 'vue'
let Ofrom
export default {
  components: {
    componentSelect,
    confDb,
    confFrom,
    confGlobal,
    confTable,
    preview,
  },
  name: 'modalForm',
  created() {
    Ofrom = JSON.parse(JSON.stringify(this.$store.state.online.form));
    console.log(this.$store.state.online);
    console.log(this);
  },
  data() {
    return {
      confirmLoading: false,
    }
  },
  computed: {},
  methods: {
    initForm() {},
    async save() {
      let form = this.$store.state.online.form
      // 触发表单验证
      this.$store.state.online.action = 1
      await this.$refs.globalConfig.$refs.globalConfig.validate()

      this.$store.state.online.action = 2

      await this.$refs.formConfig.$refs.formConfig.validate()

      this.$store.state.online.action = 4
      await this.$refs.dbConfig.$refs.dbConfig.validate()
    },
    async tempSave() {
      let res = await this.$http.post(
        '/generator/dev/business/temp/save',
        this.$store.state.online.form
      )
      if (res.success) {
        this.$store.state.online.visible = false
        this.$emit('refresh')
      }
    },
    cancel() {
      this.$store.state.online.visible = false;
      this.$store.state.online.form =JSON.parse(JSON.stringify(Ofrom));
    },
  },
  watch: {
    '$store.state.online.action'(val) {
      if (this.$store.state.online.action == 2) {
        this.$store.state.online.preAction = 1
      } else if (this.$store.state.online.action == 3) {
        this.$store.state.online.preAction = 2
      }
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
.full_screen >>> .ant-modal-title {
  height: 22px;
}
>>> .ant-modal-body {
  padding: 0;
}
>>> .online .ant-form-item {
  margin-bottom: 0;
}

>>> .online .ant-tabs {
  height: 100%;
}

>>> .online .config .ant-form-item-label {
  text-align: left;
  padding-left: 16px;
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
  float: none;
}
</style>