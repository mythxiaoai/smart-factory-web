<template>
<a-row :gutter="10">
    <a-col :md="showUser ? 12 : 24" :sm="24">
      <a-card :bordered="false">
        <table-page v-bind="tablePageConfig">
          <template #table-operator>
            <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
          </template>

          <!--序号-->
          <template #index="{ index }">
            {{ index + 1 }}
          </template>

          <span slot="operation" slot-scope="{ text }">
            <a @click="handleUpdate(text)"> <a-icon type="edit" /> 修改 </a>
            <a-divider type="vertical" />

            <a @click="handleAddUser(text)">
              <a-icon type="user-add" /> 设置管理员
            </a>
            <a-divider type="vertical" />

            <a-popconfirm
              title="确定删除吗?"
              @confirm="() => handleDelete(text.id)"
            >
              <a><a-icon type="delete" /> 删除 </a>
            </a-popconfirm>
          </span>
        </table-page>
        <modal-form ref="modalForm" @refresh="list"></modal-form>
      </a-card>
    </a-col>
    <a-col v-show="showUser" :md="12" :sm="24">
      <user ref="user" @hide="showUser=false"> </user>
    </a-col>
  </a-row>


  
</template>

<script>
import modalForm from './modalForm.vue'
import user from './rightList.vue'
export default {
  async asyncData({ $api }) {},
  fetch({ store, params }) {},
  created() {
    this.list()
  },
  mounted() {},
  data: function () {
    return {
      showUser:false,
      tablePageConfig: {
        getAsyncDate: null,
        columns: [
          {
            title: '序号',
            dataIndex: 'clientName',
            key: 'id',
            scopedSlots: { customRender: 'index' },
          },
          { title: '应用名称', dataIndex: 'clientName', key: 'clientName' },
          { title: '应用id', dataIndex: 'clientId', key: 'clientId' },
          { title: '应用密码', dataIndex: 'clientSecret', key: 'clientSecret' },
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
    },
    handleAddUser(parmas) {
      this.showUser = true;
      console.log(parmas);
      this.$refs.user.tablePageConfig.setHTTParams.clientId = parmas.clientId;
      this.$refs.user.list();
    },
    handleUpdate(data) {
      this.$refs.modalForm.visible = true
      let result = JSON.parse(JSON.stringify(data))
      this.$refs.modalForm.initForm(null, result)
    },
    async handleDelete(id) {
      await this.$api.sys.user.del([id])
      this.list()
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$api.sys.application.list(params)
        next(result.records, result.total)
      }
    },
  },
  computed: {},
  watch: {},
  components: {
    modalForm,user
  },
}
</script>
<style scoped lang="less">
</style>
