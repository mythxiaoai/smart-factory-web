<template>
  <a-modal
    :title="title"
    :width="800"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    cancelText="关闭"
  >
    <table-page
      v-bind="tablePageConfig"
      ref="tablePage"
      :row-selection="{ selectedRowKeys, onChange }"
      :customRow="customRow"
    >
      <!--序号-->
      <template #index="{ index }">
        {{ index + 1 }}
      </template>
      <!--状态-->
      <template #status="{ text }">
        {{ text == 1 ? '正常' : '冻结' }}
      </template>
      <!--性别-->
      <template #sex="{ text }">
        {{ text == 1 ? '男' : '女' }}
      </template>
    </table-page>
  </a-modal>
</template>

<script>
export default {
  async asyncData({ $http }) {},
  fetch({ store, params }) {},
  created() {
    //this.list()
  },
  mounted() {},
  data: function () {
    return {
      visible: false,
      title: '绑定已有用户',
      selectedRowKeys: [],
      tablePageConfig: {
        formItem: [
          {
            component: 'a-input',
            options: {
              label: '登陆账户',
              prop: 'username',
            },
            attrs: {
              placeholder: '请输入登陆账户',
            },
          },
        ],
        setHTTParams: {
          pageNo: 1,
          pageSize: 10,
          username: '',
          depId: '',
        },
        getAsyncDate: null,
        columns: [
          {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            scopedSlots: { customRender: 'index' },
          },
          { title: '登陆账户', dataIndex: 'username', key: 'username' },
          { title: '用户姓名', dataIndex: 'realname', key: 'realname' },
          { title: '工号', dataIndex: 'workNo', key: 'workNo' },
          //{ title: '部门', dataIndex: 'roleName', key: 'roleName' },
          {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            scopedSlots: { customRender: 'sex' },
          },
          { title: '手机号', dataIndex: 'phone', key: 'phone' },
          //{title: '负责部门',dataIndex: 'createTime', key: 'createTime'},
          {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            scopedSlots: { customRender: 'status' },
          },
        ],
      },
    }
  },
  methods: {
    handleCancel() {
      this.visible = false
      this.tablePageConfig.getAsyncDate = null
      this.selectedRowKeys = []
    },
    async handleOk() {
      console.log(this.selectedRowKeys)
      await this.$http.post('/system/sys/depart/editSysDepartWithUser', {
        depId: this.tablePageConfig.setHTTParams.depId,
        userIdList: this.selectedRowKeys,
      })
      this.handleCancel()
      this.$emit('refresh')
    },
    onChange(data) {
      this.selectedRowKeys = data
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$api.system.sys.user.otherUserDeptList.get(
          params
        )
        next(result.records, result.total)
      }
    },
    customRow(record, index) {
      return {
        on: {
          click: (e) => {
            let index = this.selectedRowKeys.indexOf(record.id)
            ~index
              ? this.selectedRowKeys.splice(index, 1)
              : this.selectedRowKeys.push(record.id)
          },
        },
      }
    },
  },
  computed: {},
  watch: {},
}
</script>

<style scoped lang="less">
</style>