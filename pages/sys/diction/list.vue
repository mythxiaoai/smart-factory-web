<template>
  <a-card :bordered="false">
    <div class="search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="[0,12]">
          <!-- 大屏手机2个 ipad 3个 电脑4个 搜索框 -->
          <!-- xs sm md lg xl xxl -->
          <a-col :sm="12" :md="8" :xxl="6">
            <a-form-item label="字典名称">
              <a-input placeholder="请输入字典名称" v-model="queryParam.dictName"></a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="8" :xxl="6">
            <a-form-item label="字典编号">
              <a-input placeholder="请输入字典编号" v-model="queryParam.dictCode"></a-input>
            </a-form-item>
          </a-col>
          <a-col :sm="12" :md="8" :lg="6">
            <a-form-item>
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button
                type="primary"
                @click="searchReset"
                icon="reload"
                style="margin-left: 8px"
              >重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <div class="table-operator" style="border-top: 5px">
        <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
      </div>

      <a-table
        ref="table"
        rowKey="id"
        size="middle"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="pagination"
        :loading="loading"
      >
        <span slot="operation" slot-scope="text, record">
          <a @click="handleUpdate(record)">
            <a-icon type="edit" />修改
          </a>
          <a-divider type="vertical" />
          <a-popconfirm title="确定删除吗?" @confirm="() =>handleDelete(record.id)">
            <a>
              <a-icon type="delete" />删除
            </a>
          </a-popconfirm>
        </span>
      </a-table>
    </div>
    <!-- <dict-modal ref="modalForm" @ok="modalFormOk"></dict-modal> -->
    <modal-form ref="modalForm"></modal-form>
  </a-card>
</template>

<script>
import modalForm from "./modalForm.vue";
export default {
  async asyncData({ $api }) {},
  fetch({ store, params }) {},
  created() {
    this.list()
  },
  mounted() {},
  data: function () {
    return {
      queryParam: {
        dictName: '',
        dictCode: '',
      },
      pagination:{
        pageSize:10,
        current:1,
        pageTotal:50
      },
      loading: false,
      columns: [
        { title: '字典名称', dataIndex: 'dictName', key: 'dictName' },
        { title: '字典编号', dataIndex: 'dictCode', key: 'dictCode' },
        { title: '备注', dataIndex: 'description', key: 'description' },
        {
          title: '操作',
          key: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
      ],
      dataSource: [],
    }
  },
  methods: {
    handleAdd() {},
    handleUpdate() {
      this.$refs.modalForm.visible = true;
    },
    handleDelete() {},
    searchQuery() {},
    searchReset() {},
    async list() {
      let { records } = await this.$api.sys.diction.list()
      this.dataSource = records
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
<style lang="less">
.ant-form label {
  font-size: 12px;
}

.search-wrapper {
  form {
    margin-bottom: 15px;
    .ant-row {
      .ant-form-item {
        display: flex;
        flex-wrap: nowrap;
        .ant-form-item-control-wrapper {
          flex: 1 1 auto;
          .ant-form-item-control {
            .ant-form-item-children {
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}
.table-operator {
  margin-bottom: 8px;
  .ant-btn {
    margin: 0 8px 8px 0;
  }
}
</style>
