<template>
  <a-card :bordered="false">
    <table-page v-bind="tablePageConfig">
      <template #url="{ text }">
        {{ text }}
      </template>

      <template #table-operator>
        <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
      </template>

      <span slot="operation" slot-scope="{ text }">
        <a @click="handleUpdate(text)"> <a-icon type="edit" />修改 </a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;" @click="handleTest(text.id)">功能测试</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="handleSendOrdisabled(text.id)"
                >发布/禁用</a
              >
            </a-menu-item>

            <a-menu-item>
              <a href="javascript:;" @click="handleGenerate(text)">生成代码</a>
            </a-menu-item>

            <a-menu-item>
              <a-popconfirm
                title="确定删除吗?"
                @confirm="() => handleDelete(text.id)"
              >
                <a>删除</a>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </table-page>
    <modal-form ref="modalForm" @refresh="list"></modal-form>
  </a-card>
</template>

<script>
import modalForm from './modalForm.vue'
export default {
  fetch({ store, params }) {},
  created() {
    this.list()
  },
  mounted() {},
  data: function () {
    return {
      tablePageConfig: {
        // formItem: [
        //   {
        //     component: 'a-input',
        //     options: {
        //       label: '业务名称',
        //       prop: 'username',
        //     },
        //     attrs: {
        //       placeholder: '请输入业务名称',
        //     },
        //   },
        //   {
        //     component: 'a-select',
        //     options: {
        //       label: '是否启用',
        //       prop: 'status',
        //     },
        //     attrs: {},
        //     children: {
        //       component: 'a-select-option',
        //       options: {
        //         data: [
        //           { label: '全部', value: '' },
        //           { label: '已发布', value: '1' },
        //           { label: '禁用', value: '2' },
        //         ],
        //         titleKey: 'label',
        //         valueKey: 'value',
        //       },
        //       attrs: {},
        //     },
        //   },
        // ],
        getAsyncDate: null,
        columns: [
          { title: '业务名称', dataIndex: 'businessName', key: 'businessName' },
          {
            title: '编辑状态',
            dataIndex: 'editStatus',
            key: 'editStatus',
            customRender(v) {
              return v == 'complete' ? '已完成' : '编辑中'
            },
          },
          { title: '版本', dataIndex: 'edition', key: 'edition' },
          {
            title: 'URL',
            dataIndex: 'url',
            key: 'url',
            scopedSlots: { customRender: 'url' },
          },
          { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
          { title: '手机号', dataIndex: 'phone', key: 'phone' },
          { title: '邮箱', dataIndex: 'email', key: 'email' },
          //{title: '负责部门',dataIndex: 'createTime', key: 'createTime'},
          //{title: '角色',dataIndex: 'roleIds', key: 'roleIds'},
          {
            title: '状态',
            dataIndex: 'releaseStatus',
            key: 'releaseStatus',
            customRender(v) {
              return v == 'published ' ? '已发布' : '未发布'
            },
          },
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
      this.$store.state.online.visible = true
      this.$refs.modalForm.initForm()
    },
    handleUpdate(data) {
      this.$store.state.online.visible = true
      let result = JSON.parse(JSON.stringify(data))
      this.$refs.modalForm.initForm(null, result)
    },
    async handleDelete(id) {
      // await this.$api.system.sys.deleteBatch.delete([id])
      // this.list()
    },
    async handleTest(id) {
      // handleTest
      this.$router.push({ path: '/dev/online/test', query: { id } })
    },
    async handleSendOrdisabled(id) {
      // handleSendOrdisabled
    },
    async handleGenerate(id) {
      // handleSendOrdisabled
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$http.get(
          '/generator/dev/business/list',
          params
        )
        next(result.records, result.total)
      }
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
