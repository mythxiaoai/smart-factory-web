<template>
  <a-card :bordered="false">
    <table-page v-bind="tablePageConfig">
      <template #table-operator>
        <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
        <a-button @click="handleRefresh" type="primary">更新字典</a-button>
      </template>

      <template #status="val">
        {{ val == null ? '' : val ? '启用' : '停用' }}
      </template>

      <span slot="operation" slot-scope="{ text }">
        <a @click="handleUpdate(text)"> <a-icon type="edit" />修改 </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除吗?"
          @confirm="() => handleDelete(text.id)"
        >
          <a> <a-icon type="delete" />删除 </a>
        </a-popconfirm>
      </span>

      <a-table
        slot="expandedRowRender"
        slot-scope="{ text }"
        :columns="innerColumns"
        :dataSource="text.dictItemList"
        :pagination="false"
      >
      </a-table>
    </table-page>
    <!-- <dict-modal ref="modalForm" @ok="modalFormOk"></dict-modal> -->
    <modal-form ref="modalForm" :title="title" @refresh="list"></modal-form>
  </a-card>
</template>

<script>
import modalForm from './modalForm.vue'
export default {
  async asyncData({ $http }) {},
  fetch({ store, params }) {},
  created() {
    this.list()
  },
  mounted() {},
  data: function () {
    return {
      tablePageConfig: {
        formItem: [
          {
            component: 'a-input',
            options: {
              label: '字典名称',
              prop: 'dictName',
            },
            attrs: {
              placeholder: '请输入字典名称',
            },
          },
          {
            component: 'a-input',
            options: {
              label: '字典编号',
              prop: 'dictCode',
            },
            attrs: {
              placeholder: '请输入字典编号',
            },
          },
        ],
        getAsyncDate: null,
        columns: [
          { title: '字典名称', dataIndex: 'dictName', key: 'dictName' },
          { title: '字典编号', dataIndex: 'dictCode', key: 'dictCode' },
          {
            title: '是否启用',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: { customRender: 'status' },
          },
          { title: '备注', dataIndex: 'description', key: 'description' },
          {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ],
      },
      innerColumns: [
        { title: '键', dataIndex: 'itemText', key: 'itemText' },
        { title: '值', dataIndex: 'itemValue', key: 'itemValue' },
      ],
      title: '操作',
    }
  },
  methods: {
    handleAdd() {
      this.title = '添加字典'
      this.$refs.modalForm.visible = true
    },
    handleUpdate(data) {
      console.log(data)
      this.title = '修改字典'
      this.$refs.modalForm.visible = true
      let result = JSON.parse(JSON.stringify(data))
      //添加一个标记值
      result.statusShow = true
      //修正null数据，如果不是0那么默认都是启动的
      result.status = result.status === 0 ? 0 : 1
      this.$refs.modalForm.form = result
    },
    async handleDelete(id) {
      await this.$api.system.sys.dict.deleteBatch.delete([id])
      this.list()
      //刷新全局字典表
      this.$store.dispatch('security/getAlldict')
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$http.get('/system/sys/dict/list', params)
        next(result.records, result.total)
      }
    },
    handleRefresh() {
      this.$api.system.sys.dict.refresh.cache.put()
    },
  },
  computed: {},
  watch: {},
  components: {
    modalForm,
  },
}
</script>
<style scoped lang="less">
</style>

