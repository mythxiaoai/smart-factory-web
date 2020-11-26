<template>
  <a-card :bordered="false">
    <table-page v-bind="tablePageConfig">
      <template #table-operator>
        <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
        <!-- <a-button @click="handleGlobData" type="primary" icon="plus">全局数据权限</a-button> -->
      </template>

      <template #menuType="{text}">
        {{ menuType[text] }}
      </template>

      <span slot="operation" slot-scope="{text}">
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
            <!-- <a-menu-item>
            <a href="javascript:;" @click="handlePermissionData(text.id)">数据权限</a>
          </a-menu-item> -->

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
import {convert} from "~/assets/utils/index.js"
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
      tablePageConfig: {
        getAsyncDate: null,
        columns: [
          { title: '菜单名称', dataIndex: 'name', key: 'name' },
          {
            title: '菜单类型',
            dataIndex: 'menuType',
            key: 'menuType',
            scopedSlots: { customRender: 'menuType' },
          },
          {
            title: 'icon',
            dataIndex: 'icon',
            key: 'icon',
            // scopedSlots: { customRender: 'icon' },
          },
          { title: '路径', dataIndex: 'url', key: 'url' },
          { title: '排序', dataIndex: 'sortNo', key: 'sortNo' },
          {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ],
        pagination: false,
      },
      menuType: ['一级菜单', '子菜单', '按钮权限'],
      innerColumns: [
        { title: '键', dataIndex: 'itemText', key: 'itemText' },
        { title: '值', dataIndex: 'itemValue', key: 'itemValue' },
      ],
    }
  },
  methods: {
    handleGlobData() {},
    handlePermissionData() {},
    handleAdd() {
      this.$refs.modalForm.visible = true
      //初始化下拉
      this.$refs.modalForm.initForm({ menuList })
    },
    handleNextAdd(id) {
      this.$refs.modalForm.visible = true
      //初始化下拉
      this.$refs.modalForm.initForm({ menuList }, { menuType: 1, parentId: id })
    },
    handleUpdate(data) {
      this.$refs.modalForm.visible = true
      let result = JSON.parse(JSON.stringify(data))
      this.$refs.modalForm.form = result
      //数据初始化
      this.$refs.modalForm.initForm({ menuList })
    },
    async handleDelete(id) {
      await this.$api.system.sys.permission.deleteBatch.delete([id])
      this.list()
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$api.system.sys.permission.list.get(params)
        result = convert(result);
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
  },
}


</script>
<style scoped lang="less">
</style>

