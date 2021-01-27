全局配置

 <template>
  <div>
    <a-form-model :model="$form">
      <!-- :rules="$store.state.online.rules" -->
      <a-input-group size="small">
        <a-form-model-item label="业务名称" v-bind="formItemConfig">
          <!-- prop="table.businessName" -->
          <a-input
            placeholder="请输入业务名称"
            v-model="$form.table.businessName"
          />
        </a-form-model-item>

        <a-form-model-item label="是否分页" v-bind="formItemConfig">
          <!-- prop="business.pageFlag" -->
          <a-switch
            :checked="$form.business.pageFlagShow"
            size="small"
            @click="switchClick"
          />
        </a-form-model-item>

        <a-collapse :bordered="false" expand-icon-position="right">
          <a-collapse-panel header="隐藏字段设置">
            <a-row type="flex">
              <a-col flex="1">隐藏字段</a-col>
              <a-col flex="1">查询显示</a-col>
              <a-col flex="1">列表显示</a-col>
            </a-row>
            <a-list
              item-layout="horizontal"
              :data-source="$form.formList.filter((v) => v.hide)"
            >
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-row type="flex">
                  <a-col flex="1">{{ item.columnNameCn }}</a-col>
                  <a-col flex="1"
                    ><a-checkbox
                      v-model="item.queryFlagShow"
                      @change="item.queryFlag = item.queryFlagShow ? 1 : 0"
                    ></a-checkbox
                  ></a-col>
                  <a-col flex="1"
                    ><a-checkbox
                      v-model="item.displayFlagShow"
                      @change="item.displayFlag = item.displayFlagShow ? 1 : 0"
                    ></a-checkbox
                  ></a-col>
                </a-row>
              </a-list-item>
            </a-list>
          </a-collapse-panel>
          <a-collapse-panel header="索引">
            <a-row type="flex">
              <a-col flex="2">索引名称</a-col>
              <a-col flex="2">索引字段</a-col>
              <a-col flex="2">索引类型</a-col>
              <a-col flex="1">操作</a-col>
            </a-row>
            <a-list item-layout="horizontal" :data-source="$form.indexList">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a-row type="flex" justify="center">
                  <a-col flex="2">
                    <a-input
                      type="text"
                      v-model="item.itemName"
                      size="small"
                    ></a-input>
                  </a-col>

                  <a-col flex="2">
                    <a-select
                      mode="tags"
                      v-model="item.indexColumnShow"
                      @change="handleChange(index)"
                      size="small"
                    >
                      <a-select-option
                        v-for="v of $form.columnList"
                        :key="v.id"
                        :value="v.columnName"
                        >{{ v.columnName }}</a-select-option
                      >
                    </a-select>
                  </a-col>

                  <a-col flex="2">
                    <a-select v-model="item.indexType" size="small">
                      <a-select-option value="nomal">nomal</a-select-option>
                      <a-select-option value="unique">unique</a-select-option>
                    </a-select>
                  </a-col>

                  <a-col flex="1">
                    <a-button
                      v-show="$form.indexList.length > 1"
                      type="primary"
                      size="small"
                      icon="delete"
                      @click="delIndex(index)"
                    />
                  </a-col>
                </a-row>
              </a-list-item>
            </a-list>
            <a-row type="flex">
              <a-button
                type="primary"
                @click="addIndex"
                icon="plus"
                size="small"
                block
              >
                新增</a-button
              >
            </a-row>
          </a-collapse-panel>
        </a-collapse>
      </a-input-group>
    </a-form-model>
  </div>
</template>

<script>
let hidefiles = ['id', 'updateBy', 'updateTime', 'createBy', 'createTime']
let hidefilesCn = ['id', '修改人', '修改时间', '创建人', '创建时间']
let subType = ['', 'o-select', 'o-date', 'o-select', 'o-date']
let columnType = ['varchar', 'varchar', 'Date', 'varchar', 'Date']
let indexData = {
  tableId: '',
  indexColumn: '',
  indexColumnShow: [],
  indexType: '',
  indexName: '',
}

export default {
  async asyncData(content) {},
  fetch({ store, params }) {},
  created() {
    console.log(this)
  },
  mounted() {},
  data: function () {
    return {
      formItemConfig: {
        hasFeedback: true,
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      },
    }
  },
  methods: {
    updateInit() {
      //初始化隐藏字段
      this.$form.formList.forEach((v) => {
        if (hidefiles.includes(v.columnName)) v.hide = true
      })
    },
    addInit() {
      //初始化隐藏字段
      let columnList = hidefiles.map((v, i) => ({
        columnName: v, //字段名称
        columnDescribe: hidefilesCn[i], //描述
        columnType: columnType[i], //字段类型
        defaultValue: '', //默认值
        columnLength: 255, //字段长度
        place: 0, //小数点位数
        blankFlag: 1, //是否运行空值
        id: '',
        pkFlag: v == 'id' ? 1 : 0,
      }))
      let formList = hidefiles.map((v, i) => ({
        editFlag: 0, //修改是否显示
        columnNameCn: hidefilesCn[i], //字段显示名
        columnName: v, //数据库字段名
        subAttribute: '', //组件属性
        subAttributeShow: {}, //组件属性
        checkRule: '', //验证规则
        fromType: '', //数据来源类型
        fromData: '', //数据来源
        queryFlag: 0, //查询是否显示
        queryMode: '=', //查询方式
        displayFlag: 0, //列表是否显示
        scriptId: '', //过滤id
        id: '',
        subType: subType[i], //组件类型
        businessId: '', //业务ID
        sort: i, //排序
        hide: true, //用来标识是否是隐藏字段
      }))
      this.$form.columnList.push(...columnList)
      this.$form.formList.push(...formList)
    },
    switchClick(val) {
      this.$form.business.pageFlagShow = val
      this.$form.business.pageFlag = val ? 1 : 0
    },
    handleChange(index) {
      this.$form.indexList[index].indexColumn = this.$form.indexList[
        index
      ].indexColumnShow.join(',')
    },
    delIndex(index) {
      this.$form.indexList.splice(index, 1)
    },
    addIndex() {
      let newObj = JSON.parse(JSON.stringify(indexData))
      this.$form.indexList.push(newObj)
    },
  },
  computed: {},
  watch: {
    '$store.state.online.form.table.businessName': {
      handler(val) {
        this.$store.state.online.form.business.businessName = val
      },
      immediate: true,
    },
    '$store.state.online.visible': {
      handler(val) {
        if (val) {
          //store form太长了  变短一点
          this.$form = this.$store.state.online.form
          this.$forceUpdate()
          this.$store.getters['online/isUpdate']
            ? this.updateInit()
            : this.addInit()
        }
      },
      immediate: true,
    },
  },
  components: {},
}
</script>

<style scoped>
</style>