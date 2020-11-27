//数据源管理
<template>
  <a-card :bordered="false">
    <table-page v-bind="tablePageConfig">
      <template #table-operator>
        <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
      </template>

      <span slot="operation" slot-scope="{ text }">
        <a @click="handleUpdate(text)"> <a-icon type="edit" />修改 </a>
        <a-divider type="vertical" />
        <a>
          <a-icon type="delete" />
          <a-popconfirm
            title="确定删除吗?"
            @confirm="() => handleDelete(text.pollName)"
          >
            删除
          </a-popconfirm>
        </a>
      </span>
    </table-page>
    <modal-form ref="modalForm" @refresh="list"></modal-form>
  </a-card>
</template>

<script>
import modalForm from './modalForm.vue'
export default {
  created() {
    this.list()
  },
  mounted() {},
  data: function () {
    return {
      tablePageConfig: {
        getAsyncDate: null,
        columns: [
          { title: '数据源地址', dataIndex: 'url', key: 'url' },
          { title: '驱动类', dataIndex: 'driverClassName', key: 'driverClassName' },
          { title: '数据库名称', dataIndex: 'pollName', key: 'pollName' },
          { title: '用户名', dataIndex: 'username', key: 'username' },
          { title: '密码', dataIndex: 'password', key: 'password' },
          {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ],
      },
    }
  },
  methods: {
    handleAdd() {
      this.$refs.modalForm.visible = true
      this.$refs.modalForm.initForm()
    },
    handleUpdate(data) {
      // this.$refs.modalForm.visible = true
      // let result = JSON.parse(JSON.stringify(data))
      // this.$refs.modalForm.initForm(null, result)
    },
    async handleDelete(name) {
      await this.$http.delete('/generator/datasources',[name])
      this.list()
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$http.get('/generator/datasource/list',params)
        next(result.records, result.total)
      }
    },
  },
  computed: {},
  watch: {},
  components: {
    modalForm
  },
}
</script>
<style scoped lang="less">
</style>
