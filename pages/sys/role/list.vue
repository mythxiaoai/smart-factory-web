<template>
  <a-row :gutter="10">
    <a-col :md="showUser ? 12 : 24" :sm="24">
      <a-card :bordered="false" :md="12">
        <table-page
          v-bind="tablePageConfig"
          :customRow="customRow"
          :rowClassName="rowSetClass"
          :scroll="{ x: true }"
        >
          <template #table-operator>
            <a-button @click="handleAdd" type="primary" icon="plus"
              >添加</a-button
            >
          </template>

          <span slot="operation" slot-scope="{ text }" @click.stop="">
            <a href="javascript:;" @click="handleUserConfig(text.id)">
              <a-icon type="user-add" /> 授权用户</a
            >
            <a-divider type="vertical" />
            <a href="javascript:;" @click="handlePermissionConfig(text.id)">
              <a-icon type="setting" /> 授权菜单</a
            >
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="handleUpdate(text)">修改 </a>
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
        <!-- <dict-modal ref="modalForm" @ok="modalFormOk"></dict-modal> -->
        <modal-form ref="modalForm" :title="title" @refresh="list"></modal-form>
        <right-modal ref="rightModal"></right-modal>
      </a-card>
    </a-col>
    <a-col v-show="showUser" :md="12" :sm="24">
      <user ref="user" @hide="rightClose"> </user>
    </a-col>
  </a-row>
</template>

<script>
import modalForm from './modalForm.vue'
import rightModal from './rightModal.vue'
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
      title: '操作',
      showUser: false,
      tablePageConfig: {
        formItem: [
          {
            component: 'a-input',
            options: {
              label: '角色名称',
              prop: 'roleName',
            },
            attrs: {
              placeholder: '角色名称',
            },
          },
        ],
        getAsyncDate: null,
        columns: [
          { title: '角色编号', dataIndex: 'roleCode', key: 'roleCode' },
          { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
          { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            scopedSlots: { customRender: 'operation' },
          },
        ],
      },
      innerColumns: [
        { title: '键', dataIndex: 'itemText', key: 'itemText' },
        { title: '值', dataIndex: 'itemValue', key: 'itemValue' },
      ],
      rowId: '',
      delId: '',
    }
  },
  methods: {
    customRow(record, index) {
      return {
        on: {
          click: (event) => {
            this.showUser && this.handleUserConfig(record.id)
          },
        },
      }
    },
    rowSetClass(record, index) {
      return record.id === this.rowId ? 'clickRowStyl' : ''
    },
    rightClose() {
      this.showUser = false
      this.rowId = ''
    },
    handleAdd() {
      this.title = '添加角色'
      this.$refs.modalForm.visible = true
    },
    handleUpdate(data) {
      this.title = '修改角色'
      this.$refs.modalForm.visible = true
      let result = JSON.parse(JSON.stringify(data))
      this.$refs.modalForm.form = result
    },
    handleUserConfig(id) {
      this.showUser = true
      this.rowId = id
      this.$refs.user.tablePageConfig.setHTTParams.roleId = id
      this.$refs.user.list()
    },
    handlePermissionConfig(id) {
      this.$refs.rightModal.show(id)
    },
    async handleDelete(id) {
      await this.$api.system.sys.role.deleteBatch.delete([id])
      this.delId = id
      this.list()
      //刷新全局菜单
      this.$store.dispatch('security/currentUserPermission')
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$api.system.sys.role.list.get(params)
        this.delId === this.rowId &&
          this.showUser &&
          this.handleUserConfig(result.records[0].id)
        next(result.records, result.total)
      }
    },
  },
  computed: {},
  watch: {},
  components: {
    modalForm,
    rightModal,
    user,
  },
}
</script>
<style scoped lang="less">
</style>
<style>
.global-content {
  background-color: transparent !important;
}
.clickRowStyl {
  background-color: #e6f7ff;
}
</style>
