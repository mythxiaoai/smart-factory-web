<template>
  <a-row :gutter="10">
    <a-col :md="showUser ? 12 : 24" :sm="24">
      <a-card :bordered="false">
        <table-page
          v-bind="tablePageConfig"
          :customRow="customRow"
          :rowClassName="rowSetClass"
          :scroll="{ x: true}"
        >
          <template #table-operator>
            <a-button @click="handleAdd" type="primary" icon="plus"
              >添加</a-button
            >
          </template>

          <!--序号-->
          <template #index="{ index }">
            {{ index + 1 }}
          </template>

          <span slot="operation" slot-scope="{ text }" @click.stop="">
            <a @click="handleUpdate(text)"> <a-icon type="edit" /> 修改 </a>
            <a-divider type="vertical" />

            <a @click="handleAddUser(text)">
              <a-icon type="user-add" /> 设置管理员
            </a>
            <a-divider type="vertical" />

            <a-popconfirm
              title="确定删除吗?"
              @confirm="() => handleDelete(text.clientId)"
            >
              <a><a-icon type="delete" /> 删除 </a>
            </a-popconfirm>
          </span>
        </table-page>
        <modal-form ref="modalForm" :title="title" @refresh="list"></modal-form>
      </a-card>
    </a-col>
    <a-col v-show="showUser" :md="12" :sm="24">
      <user ref="user" @hide="rightClose"> </user>
    </a-col>
  </a-row>
</template>

<script>
import modalForm from './modalForm.vue'
import user from './rightList.vue'
export default {
  async asyncData({ $http }) {},
  fetch({ store, params }) {},
  created() {
    this.list()
  },
  mounted() {},
  data: function () {
    return {
      showUser: false,
      tablePageConfig: {
        formItem: [
          {
            component: 'a-input',
            options: {
              label: '应用名称',
              prop: 'clientName',
            },
            attrs: {
              placeholder: '请输入应用名称',
            },
          },
        ],
        getAsyncDate: null,
        columns: [
          {
            title: '序号',
            dataIndex: 'clientName',
            key: 'id',
            scopedSlots: { customRender: 'index' },
          },
          { title: '应用名称', dataIndex: 'clientName', key: 'clientName' },
          { title: '应用ID', dataIndex: 'clientId', key: 'clientId' },
          { title: '应用密码', dataIndex: 'clientSecret', key: 'clientSecret' },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'operation' },
          },
        ],
      },
      title: '操作',
      rowId: '',
      delId: '',
    }
  },
  methods: {
    customRow(record, index) {
      return {
        on: {
          click: (event) => {
            this.showUser && this.handleAddUser(record)
          },
        },
      }
    },
    rowSetClass(record, index) {
      return record.clientId === this.rowId ? 'clickRowStyl' : ''
    },
    rightClose() {
      this.showUser = false
      this.rowId = ''
    },
    handleAdd() {
      this.title = '添加应用'
      this.$refs.modalForm.visible = true
    },
    handleAddUser(parmas) {
      this.showUser = true
      this.rowId = parmas.clientId
      this.$refs.user.tablePageConfig.setHTTParams.clientId = parmas.clientId
      this.$refs.user.list()
    },
    handleUpdate(data) {
      this.title = '修改应用'
      this.$refs.modalForm.visible = true
      let result = JSON.parse(JSON.stringify(data))
      this.$refs.modalForm.initForm(null, result)
    },
    async handleDelete(id) {
      await this.$http.delete('/system/sys/client/deleteBatch', [id])
      this.delId = id
      this.list()
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$http.get('/system/sys/client/list', params)
        this.delId === this.rowId &&
          this.showUser &&
          this.handleAddUser(result.records[0])
        next(result.records, result.total)
      }
    },
  },
  computed: {},
  watch: {},
  components: {
    modalForm,
    user,
  },
}
</script>
<style lang="less">
.global-content {
  background-color: transparent !important;
}
</style>
<style>
.global-content {
  background-color: transparent !important;
}
.clickRowStyl {
  background-color: #e6f7ff;
}
</style>