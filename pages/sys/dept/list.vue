<template>
  <a-row :gutter="10">
    <a-col :md="showUser ? 12 : 24" :sm="24">
      <a-card :bordered="false" :md="12">
        <table-page v-bind="tablePageConfig">
          <template #table-operator>
            <a-button @click="handleAdd" type="primary" icon="plus"
              >添加</a-button
            >
            <!-- <a-button @click="handleGlobData" type="primary" icon="plus">全局数据权限</a-button> -->
          </template>
          <span slot="orgCategory" slot-scope="{ text }">
            {{ orgCategory[text.orgCategory] }}
          </span>
          <span slot="operation" slot-scope="{ text }">
            <a @click="handleUserConfig(text.id)">用户信息</a>
            <a-divider type="vertical" />
            <a @click="handleUpdate(text)">编辑 </a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="handleNextAdd(text.id)"
                    >添加下级</a
                  >
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
        <!-- <right-modal ref="rightModal"></right-modal> -->
      </a-card>
    </a-col>
    <a-col v-show="showUser" :md="12" :sm="24">
      <user ref="user" @hide="showUser = false"> </user>
    </a-col>
  </a-row>
</template>

<script>
import modalForm from './modalForm.vue'
// import rightModal from './rightModal.vue'
import user from './rightList.vue'
let menuList = null
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
        getAsyncDate: null,
        columns: [
          { title: '部门名称', dataIndex: 'departName', key: 'departName' },
          {
            title: '机构类别',
            key: 'orgCategory',
            scopedSlots: { customRender: 'orgCategory' },
          },
          { title: '机构编码', dataIndex: 'orgCode', key: 'orgCode' },
          { title: '手机号', dataIndex: 'mobile', key: 'mobile' },
          { title: '地址', dataIndex: 'address', key: 'address' },
          { title: '备注', dataIndex: 'memo', key: 'memo' },
          { title: '排序', dataIndex: 'departOrder', key: 'departOrder' },
          {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ],
        pagination: false,
      },
      orgCategory: { 1: '组织机构', 2: '岗位' },
    }
  },
  methods: {
    handleAdd() {
      this.$refs.modalForm.visible = true
      this.$refs.modalForm.initForm({ menuList })
    },
    handleUpdate(data) {
      this.$refs.modalForm.visible = true
      let result = JSON.parse(JSON.stringify(data))
      result.menuType = 0
      this.$refs.modalForm.form = result
      //数据初始化
      this.$refs.modalForm.initForm({ menuList })
    },
    handleNextAdd(id) {
      this.$refs.modalForm.visible = true
      //初始化下拉
      this.$refs.modalForm.initForm({ menuList }, { menuType: 1, parentId: id })
    },
    handleUserConfig(id) {
      this.showUser = true
      this.$refs.user.tablePageConfig.setHTTParams.depId = id
      this.$refs.user.list()
    },
    handlePermissionConfig(id) {
      // this.$refs.rightModal.show(id)
    },
    async handleDelete(id) {
      await this.$api.system.sys.depart.deleteBatch.delete([id])
      this.list()
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$api.system.sys.depart.queryTreeList.get(
          params
        )
        //做接收 表格弹框下拉用
        menuList = JSON.parse(JSON.stringify(result))
        next(result)
      }
    },
  },
  computed: {},
  watch: {},
  components: {
    modalForm,
    // rightModal,
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
</style>
