<template>
  <a-card :bordered="false">
    <table-page v-bind="tablePageConfig">
      <template #table-operator>
        <a-button @click="handleAdd" type="primary" icon="plus">添加</a-button>
      </template>


      <span slot="operation" slot-scope="text">
        <a @click="handleUpdate(text)"> <a-icon type="edit" />修改 </a>
        <a-divider type="vertical" />
        <a @click="handleNextAdd(text)"> <a-icon type="edit" />添加下级 </a>
        <a-divider type="vertical" />
        <a @click="handleNextAdd(text)"> <a-icon type="edit" />全局数据权限 </a>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除吗?"
          @confirm="() => handleDelete(text.id)"
        >
          <a> <a-icon type="delete" />删除 </a>
        </a-popconfirm>
      </span>
      
    </table-page>
    <!-- <dict-modal ref="modalForm" @ok="modalFormOk"></dict-modal> -->
    <modal-form ref="modalForm" @refresh="list"></modal-form>
  </a-card>
</template>

<script>
import modalForm from './modalForm.vue'
export default {
  async asyncData({ $api }) {},
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
          { title: '菜单类型', dataIndex: 'menuType', key: 'menuType',
          scopedSlots: { customRender: 'operation' },
          },
          {
            title: 'icon',
            dataIndex: 'icon',
            key: 'icon',
            scopedSlots: { customRender: 'icon' },
          },
          { title: '路径', dataIndex: 'url', key: 'url' },
          { title: '排序', dataIndex: 'sortNo', key: 'sortNo' },
          {
            title: '操作',
            key: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
        ],
        pagination:false
      },
      innerColumns: [
        { title: '键', dataIndex: 'itemText', key: 'itemText' },
        { title: '值', dataIndex: 'itemValue', key: 'itemValue' },
      ],
    }
  },
  methods: {
    handleAdd() {
      this.$refs.modalForm.visible = true
    },
    handleUpdate(data) {
      console.log(data)
      this.$refs.modalForm.visible = true
      let result = JSON.parse(JSON.stringify(data))
      //添加一个标记值
      result.statusShow = true
      //修正null数据，如果不是0那么默认都是启动的
      result.status = result.status === 0 ? 0 : 1
      this.$refs.modalForm.form = result
    },
    async handleDelete(id) {
      await this.$api.sys.diction.del([id])
      this.list()
    },
    list() {
      this.tablePageConfig.getAsyncDate = async (params, next) => {
        let { result } = await this.$api.sys.menu.list(params);
        //result = simpleToPS(result,{pIdKey:"parentId"});
        console.log(result);
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


//简单数据变成父子结构数据  忽略大小写
function simpleToPS(data,optObj){
  let opts = {
    idKey: "id",
    pIdKey: "pid",
    rootPId: ""
  }
  opts = Object.assign({},opts,optObj);
  for(let i in opts){
    opts[i] = opts[i].toLowerCase();
  }
  data = JSON.parse(JSON.stringify(data));
  for(let i in data){
      data[i].children = [];
    }
  let index = 0,result=[];
  while(data.length>0){
    index = index%data.length;
    if(data[index][opts.pIdKey]==opts.rootPId){
      data[index].level=1;
      result.push(data[index]);
      data.splice(index,1);
      index--;
    }else{
      arrpush(result,2);
    }
    index++;
  }
  function arrpush(arr,level){
      let markinto=true;
      for(let i=0;i<data.length;i++){
        for(let k=0;k<arr.length;k++){
          if(data.length>0){
            if(arr[k][opts.idKey]==data[i][opts.pIdKey]){
              data[i].level = level;
              arr[k].children.push(data[i]);
              data.splice(i,1);
              i--;
              markinto = false;
              break;
            }
          }
          if(arr[k].children.length>0&&markinto){
            arrpush(arr[k].children,++level);
            level--;
          }
        }
      }
      
    }
    return result;
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
