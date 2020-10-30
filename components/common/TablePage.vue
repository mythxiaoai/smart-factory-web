<template>
  <div class="search-wrapper">
    <slot name="search">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="[0, 12]">
          <!-- 大屏手机2个 ipad 3个 电脑4个 搜索框 -->
          <!-- xs sm md lg xl xxl -->
          <a-col :sm="12" :md="8" :xxl="6" v-for="(item, index) in formItem" :key="index">
            <a-form-item :label="item.options.label">
              <!-- el-input -->
              <template v-if="item.component == 'a-input'">
                <component
                  :is="item.component"
                  v-model="queryParam[item.options.prop]"
                  v-bind="item.attrs"
                  v-on="item.on"
                ></component>
              </template>
            </a-form-item>
          </a-col>

          <a-col :sm="12" :md="8" :xxl="6">
            <a-form-item>
              <a-button type="primary" @click="searchQuery" icon="search">查询</a-button>
              <a-button type="primary" @click="searchReset" icon="reload" style="margin-left: 8px">
                重置
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </slot>

    <div class="table-operator" style="border-top: 5px">
      <slot name="table-operator"></slot>
    </div>
    <!-- <slot name="operation" :data="{id:1}"></slot> -->
    <a-table
      ref="table"
      rowKey="id"
      :pagination="pagination"
      :loading="loading"
      :dataSource="dataSource"
      @change="pagingChange"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <!--这里做插槽转发  把外层插槽在内部slot接收，外层包裹传递过来的在传入a-table插件  因为这里用了这种  所以不支持a-table-column-group组件了-->
      <template v-for="item in renderSlots" #[item]="text,record,index">
        <slot :name="item" v-bind="{ text, record, index }"></slot>
      </template>
      <slot></slot>
    </a-table>
  </div>
</template>

<script>
const pagination = {
  pageSize: 10,
  current: 1,
  total: 50,
}

export default {
  props: {
    formItem: {
      type: Array,
      default: [],
    },
    getAsyncDate: {
      type: Function,
    },
    //排除form表单项的额外携带的参数
    setHTTParams: {
      type: Object,
      default() {
        return {
          pageNo: 1,
          pageSize: 10,
        }
      },
    },
    //设置传递http的分页参数的key是什么
    setHTTPPageKey: {
      type: Object,
      default() {
        return {
          currentPage: 'pageNo',
          pageSize: 'pageSize',
        }
      },
    },
  },
  mounted() {
    
  },
  data: function () {
    return {
      queryParam: null,
      pagination: null,
      loading: false,
      dataSource: null,
    }
  },
  methods: {
    changeSlotParams() {
      this.renderSlots.forEach((v) => {
        let fn = this.$scopedSlots[v]
        this.$scopedSlots[v] = function (data) {
          let vals = Object.values(data)
          return fn(...vals)
        }
      })
    },
    initSearch() {
      //判断
      if (!isExistkeys(this.setHTTParams, this.setHTTPPageKey)) {
        throw new Error(
          '参数setHTTParams中，必须含有setHTTPPageKey中的分页参数'
        )
      }
      let query = JSON.parse(JSON.stringify(this.setHTTParams))
      this.formItem.forEach((v) => {
        let key = v?.options?.prop
        if (key) query[key] = v.options?.defaultValue ?? ''
      })
      this.queryParam = query
    },
    pagingChange({ current }) {
      this.queryParam[this.setHTTPPageKey.currentPage] = current
      this.pagination.current = current
      this.list()
    },
    searchQuery() {
      this.queryParam[this.setHTTPPageKey.currentPage] = 1
      this.pagination.current = 1
      this.list()
    },
    searchReset() {
      //重置分页参数
      this.pagination = JSON.parse(JSON.stringify(pagination))
      //重置查询条件
      this.initSearch()
      //列表
      this.list()
    },
    async list() {
      this.loading = true
      this.getAsyncDate(this.queryParam, (data, total) => {
        this.dataSource = data
        this.pagination.total = total
        this.loading = false
      })
    },
  },
  computed: {
    renderSlots() {
      let arr = []
      //  slots: { title: 'customTitle' },
      //scopedSlots: { customRender: 'name'  filterDropdown: 'filterDropdown',filterIcon: 'filterIcon',},
      this.$attrs.columns.map((v) => {
        let keys = Object.keys(v)
        if (~keys.indexOf('slots')) {
          v.slots?.title && arr.push(v.slots?.title)
        }
        if (~keys.indexOf('scopedSlots')) {
          v.scopedSlots?.customRender && typeof v.scopedSlots.customRender == 'string' && arr.push(v.scopedSlots.customRender)
          v.scopedSlots?.filterDropdown && typeof v.scopedSlots.filterDropdown == 'string' && arr.push(v.scopedSlots.filterDropdown)
          v.scopedSlots?.filterIcon && typeof v.scopedSlots.filterIcon == 'string' && arr.push(v.scopedSlots.filterIcon)
        }
      })
      //格外做的内部插槽
      //expandedRowRender  折叠slot
      arr.push("expandedRowRender")
      return arr
    },
  },
  watch: {
    getAsyncDate: {
      handler: function(){
        this.searchReset();
        this.$nextTick(()=>{
          this.changeSlotParams();
        })
      },
      immediate: true,
    },
  },
}

//在setHTTParams里找不到默认的分页参数 就调整
function isExistkeys(v1, v2) {
  let keys1 = Object.keys(v1).join()
  let keys2Arr = Object.values(v2)
  return keys2Arr.map((v) => ~keys1.indexOf(v)).every((v) => v)
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
