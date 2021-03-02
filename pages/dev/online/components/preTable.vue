--表格预览--
<template>
  <div>
    <a-empty
      v-if="!hasData"
      :image="simpleImage"
      description="暂无数据，请拖拽左侧组件"
    />
    <div v-else class="preTable">
      <a-row>
        <a-col :span="22" :push="1">
          <table-page v-bind="tablePageConfig" :key="time">
            <span slot="operation">
              <a> <a-icon type="edit" />修改 </a>
              <a-divider type="vertical" />
              <a> <a-icon type="del" />删除 </a>
            </span>
          </table-page>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { Empty } from 'ant-design-vue'

export default {
  components: {},
  async asyncData(content) {},
  fetch({ store, params }) {},
  created() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  },
  mounted() {},
  data: function () {
    return {
      time: Date.now(),
    }
  },
  methods: {},
  computed: {
    hasData() {
      if (this.$store.state.online.draging) return true
      return this.$store.getters['online/hasData']
    },
    tablePageConfig() {
      let $this = this;
      //为header加上特殊的选中效果
      let itemActiveIndex = -1;
      this.$store.state.online.form.formList
        .filter((v) => !v.hide)
        .forEach((v, i) => {
          if (v.id == this.$store.state.online.itemActive) {
            itemActiveIndex = i
          }
        })
      let formItem = this.$store.state.online.form.formList
        .filter((v) => v.queryFlag)
        .map((v) => {
          let subAttribute = {}
          try {
            subAttribute = JSON.parse(v.subAttribute)
          } catch (error) {
            console.error('attribute属性json填写错误')
          }
          let res = v.subType

          switch (v.subType) {
            case 'o-text':
              return {
                component: 'a-input',
                options: {
                  label: v.columnNameCn,
                  prop: v.columnName,
                },
                attrs: {
                  placeholder: '请输入' + v.columnNameCn,
                  ...subAttribute,
                },
              }
              break
            case 'o-select':
              let data
              if (!v.fromType) {
                data = []
              } else {
                data =
                  v.fromType == 'json'
                    ? JSON.parse(v.fromData)
                    : this.$utils.dict(v.fromData)
              }

              return {
                component: 'a-select',
                options: {
                  label: v.columnNameCn,
                  prop: v.columnName,
                },
                attrs: { 'read-only': true, ...subAttribute },
                children: {
                  component: 'a-select-option',
                  options: {
                    data: data,
                    titleKey: 'title',
                    valueKey: 'value',
                  },
                  attrs: {},
                },
              }
              break
          }
        })

      let columns = this.$store.state.online.form.formList
        .filter((v) => v.displayFlag)
        .map((v, i) => {
          let res = {
            title: v.columnNameCn,
            dataIndex: v.columnName,
            customHeaderCell(column) {
              if (itemActiveIndex == i) {
                column.className = 'actionHeader'
              }
              column.on = {
                click() {
                  $this.$store.state.online.itemActive = v.id 
                },
              }

              return column
            }
          }
          let script = v.scriptId && $this.$store.state.online.scriptList.find(s=>s.id==v.scriptId).script;
          if(script){
            try {
              let s = `(function(){return ${script}})()`;
              s = eval(s);
              res.customRender = s;
            } catch (error) {
              console.error(error);
            }
          }
          return res
        })
      columns.push({
        title: '操作',
        key: 'operation',
        scopedSlots: { customRender: 'operation' },
      })
      let pagination = !!this.$store.state.online.form.business.pageFlag
      let dataSource = []
      let mapKey = columns.map((v) => v.dataIndex)
      for (let i = 0; i < 3; i++) {
        let temp = { id: i + 1 + '' }
        mapKey.forEach((v) => {
          temp[v] = '测试' + (i + 1)
        })
        dataSource.push(temp)
      }
      //让表格组件刷新
      this.time = Date.now()
      return { formItem, columns, getAsyncDate: null, pagination, dataSource }
    },
  },
  watch: {},
}
</script>

<style scoped lang="less">
</style>
<style scoped>
.preTable >>> .ant-btn {
  pointer-events: none;
}
.preTable >>> .ant-pagination-item {
  pointer-events: none;
}
.preTable >>> .ant-pagination-prev {
  pointer-events: none;
}
.preTable >>> .ant-pagination-next {
  pointer-events: none;
}
.preTable >>> .actionHeader {
  background: rgba(66, 170, 255, 0.2);
}
</style>
