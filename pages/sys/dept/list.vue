<template>
  <a-row :gutter="10">
    <a-col :md="showUser ? 12 : 24" :sm="24">
      <a-card :bordered="false" :md="12">
        <a-form layout="inline" :form="queryParm">
          <a-form-item label="部门名称">
            <a-input
              placeholder="请输入部门名称"
              v-model="queryParm.departName"
            />
          </a-form-item>
          <a-form-item label="手机号">
            <a-input placeholder="请输入手机号" v-model="queryParm.phone" />
          </a-form-item>
          <a-form-item label="机构类型">
            <a-select
              style="width: 100px"
              v-model="queryParm.orgCategory"
              placeholder="请选择机构类型"
            >
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">组织机构</a-select-option>
              <a-select-option value="2">岗位</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSubmit">查询</a-button>
            <a-button @click="reset" style="margin-left: 8px">重置</a-button>
          </a-form-item>
        </a-form>
        <a-button
          @click="handleAdd"
          type="primary"
          icon="plus"
          style="margin: 10px 0"
          >添加</a-button
        >
        <a-table
          :columns="columns"
          :data-source="tableData"
          :rowClassName="rowSetClass"
          :loading="tableLoading"
          :pagination="{
            current: current,
          }"
          @change="change"
          :customRow="customRow"
        >
          <span slot="operation" slot-scope="text, record" @click.stop="">
            <a @click="handleUserConfig(record.id)">用户信息</a>
            <a-divider type="vertical" />
            <a @click="handleUpdate(record)">编辑 </a>
            <a-divider type="vertical" />
            <a-dropdown>
              <a class="ant-dropdown-link"> 更多 <a-icon type="down" /> </a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a href="javascript:;" @click="handleNextAdd(record.id)"
                    >添加下级</a
                  >
                </a-menu-item>
                <a-menu-item>
                  <a-popconfirm
                    title="确定删除吗?"
                    @confirm="() => handleDelete(record.id)"
                  >
                    <a>删除</a>
                  </a-popconfirm>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </a-table>
        <modal-form ref="modalForm" :title="title" @refresh="list"></modal-form>
        <!-- <right-modal ref="rightModal"></right-modal> -->
      </a-card>
    </a-col>
    <a-col v-show="showUser" :md="12" :sm="24">
      <user ref="user" @hide="rightClose"> </user>
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
      orgCategory: { 1: '组织机构', 2: '岗位' },
      title: '操作',
      columns: [
        { title: '部门名称', dataIndex: 'departName', key: 'departName' },
        {
          title: '机构类别',
          key: 'orgCategory',
          dataIndex: 'orgCategory',
          customRender: this.orgCategoryFmt,
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
      tableData: [],
      queryParm: {
        orgCategory: '',
        phone: '',
        departName: '',
      },
      rowId: '',
      tableLoading: false,
      current: 1,
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
    change(val) {
      this.current = val.current
    },
    rightClose() {
      this.showUser = false
      this.rowId = ''
    },
    rowSetClass(record, index) {
      return record.id === this.rowId ? 'clickRowStyl' : ''
    },
    orgCategoryFmt(val) {
      return this.orgCategory[val]
    },
    handleAdd() {
      this.title = '添加部门'
      this.$refs.modalForm.visible = true
      this.$refs.modalForm.initForm({ menuList })
    },
    handleUpdate(data) {
      this.title = '修改部门'
      this.$refs.modalForm.visible = true
      let result = JSON.parse(JSON.stringify(data))
      result.menuType = 0
      this.$refs.modalForm.form = result
      //数据初始化
      this.$refs.modalForm.initForm({ menuList })
    },
    handleNextAdd(id) {
      this.title = '添加部门'
      this.$refs.modalForm.visible = true
      //初始化下拉
      this.$refs.modalForm.initForm({ menuList }, { menuType: 1, parentId: id })
    },
    handleUserConfig(id) {
      this.showUser = true
      this.rowId = id
      this.$refs.user.tablePageConfig.setHTTParams.depId = id
      this.$refs.user.list()
    },
    handlePermissionConfig(id) {
      // this.$refs.rightModal.show(id)
    },
    async handleDelete(id) {
      await this.$api.system.sys.depart.deleteBatch.delete([id])
      this.delId = id
      this.list()
    },
    reset() {
      this.queryParm = {
        phone: '',
        orgCategory: '',
        departName: '',
      }
      this.list()
    },
    handleSubmit() {
      this.list()
    },
    async list() {
      this.tableLoading = true
      this.current = 1
      let { result } = await this.$api.system.sys.depart.queryTreeList.get(
        this.queryParm
      )
      this.tableLoading = false
      this.tableData = result
      //做接收 表格弹框下拉用
      menuList = JSON.parse(JSON.stringify(result))
      this.delId === this.rowId &&
        this.showUser &&
        this.handleUserConfig(this.tableData[0].id)
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
.clickRowStyl {
  background-color: #e6f7ff;
}
</style>
