<template>
  <a-card :bordered="false">
    <table-page v-bind="tablePageConfig" ref="tablePage">

      <template #page-opts>
        <a class="close" @click="$emit('hide')"><a-icon type="close"></a-icon></a>
      </template>

      <template #table-operator>
        <a-button @click="handleBindUser" type="primary" icon="swap">
          绑定已有用户</a-button
        >
        <a-button @click="handleAdd" type="primary" icon="plus">
          新增用户</a-button
        >
      </template>

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

      <span slot="operation" slot-scope="{ text }">
        <a @click="handleUpdate(text)"> <a-icon type="edit" /> 修改 </a>
        <a-divider type="vertical" />
        <a>
          <a-icon type="delete" /> <a-popconfirm
            title="确定解除与该角色的关系吗?"
            @confirm="() => handleDelete(text.id)"
          >
            解除关系
          </a-popconfirm></a
        >
      </span>
    </table-page>
    <modal-form ref="modalForm" @refresh="list"></modal-form>
    <modal-table ref="modalTable" @refresh="list"></modal-table>
  </a-card>
</template>

<script>
import modalForm from '@/pages/sys/user/modalForm.vue'
import modalTable from './modalTable.vue'
export default {
  async asyncData({ $http }) {},
  fetch({ store, params }) {},
  created() {
    //this.list()
  },
  mounted() {},
  data: function () {
    return {
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
          }
        ],
        setHTTParams: {
          pageNo: 1,
          pageSize: 10,
          username: '',
          roleId: '',
        },
        getAsyncDate: null,
        columns: [
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
      this.$refs.modalForm.visible = true
      let result = JSON.parse(JSON.stringify(data))
      this.$refs.modalForm.initForm(null, result)
    },
    async handleDelete(id) {
      let res = await this.$http.delete("/system/sys/role/deleteUserRole",{
        roleId: this.tablePageConfig.setHTTParams.roleId,
        userIdList: [id],
      })
      res.success && this.$message.success("解除关系成功~");
      this.list()
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$api.system.sys.user.userRoleList.get(params)
        next(result.records, result.total)
      }
    },
    handleBindUser() {
        this.$refs.modalTable.visible = true;
        this.$refs.modalTable.tablePageConfig.setHTTParams.roleId = this.tablePageConfig.setHTTParams.roleId;
        //this.$refs.modalTable.list();
    },
  },
  computed: {},
  watch: {},
  components: {
    modalForm,
    modalTable
  },
}
</script>
<style scoped lang="less">
.close{
  position: absolute;
  right:20px;
  top:20px;
  font-size: 16px;
}
</style>
