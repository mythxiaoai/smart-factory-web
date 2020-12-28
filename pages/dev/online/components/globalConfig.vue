全局配置

 <template>
  <div>
    <a-form-model
      ref="globalConfig"
      :model="$form"
      :rules="$store.state.online.rules"
    >
      <a-input-group size="small">
        <a-form-model-item
          label="业务名称"
          v-bind="formItemConfig"
          prop="table.businessName"
        >
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
            <a-list item-layout="horizontal" :data-source="hidefiles">
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
                    <a-input type="text" v-model="item.itemName" size="small"></a-input>
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
                        :value = "v.columnName"
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
                    <a-button v-show="$form.indexList.length>1" type="primary" size="small" icon="delete" @click="delIndex(index)"/>
                  </a-col>
                </a-row>
              </a-list-item>
            </a-list>
             <a-row type="flex">
               <a-button type="primary" @click="addIndex" icon="plus" size="small" block> 新增</a-button>
            </a-row>
          </a-collapse-panel>
        </a-collapse>

        {{ $form }}
      </a-input-group>
    </a-form-model>
  </div>
</template>

<script>
let hidefiles = [
  {
    columnNameCn: 'id',
    columnName: 'id',
    displayFlag: 0,
    displayFlagShow: false,
    queryFlag: 0,
    queryFlagShow: false,
    queryMode: '=',
    subType: '',
    scriptId: 0,
    editFlag: 0,
  },
  {
    columnNameCn: '修改人',
    columnName: 'updateBy',
    displayFlag: 0,
    displayFlagShow: false,
    queryFlag: 0,
    queryFlagShow: false,
    queryMode: '=',
    subType: 'o-select',
    scriptId: 0,
    editFlag: 0,
  },
  {
    columnNameCn: '修改时间',
    columnName: 'updateTime',
    displayFlag: 0,
    displayFlagShow: false,
    queryFlag: 0,
    queryFlagShow: false,
    queryMode: '=',
    subType: 'o-date',
    scriptId: 0,
    editFlag: 0,
  },
  {
    columnNameCn: '创建人',
    columnName: 'createBy',
    displayFlag: 0,
    displayFlagShow: false,
    queryFlag: 0,
    queryFlagShow: false,
    queryMode: '=',
    subType: '',
    scriptId: 0,
    editFlag: 0,
  },
  {
    columnNameCn: '创建时间',
    columnName: 'createTime',
    displayFlag: 0,
    displayFlagShow: false,
    queryFlag: 0,
    queryFlagShow: false,
    queryMode: '=',
    subType: 'o-date',
    scriptId: 0,
    editFlag: 0,
  },
]

let indexData = {
  indexColumn: '',
  indexType: '',
  indexName: '',
}

export default {
  async asyncData(content) {},
  fetch({ store, params }) {},
  created() {
    //store form太长了  变短一点
    this.$form = this.$store.state.online.form
  },
  mounted() {},
  data: function () {
    return {
      formItemConfig: {
        hasFeedback: true,
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      },
      hidefiles,
      indexData,
    }
  },
  methods: {
    switchClick(val) {
      this.$form.business.pageFlagShow = val
      this.$form.business.pageFlag = val ? 1 : 0
    },
    handleChange(index){
      this.$form.indexList[index].indexColumn = this.$form.indexList[index].indexColumnShow.join(',');
    },
    delIndex(index){
      this.$form.indexList.splice(index,1)
    },
    addIndex(){
      let newObj = JSON.parse(JSON.stringify(indexData));
      this.$form.indexList.push(newObj);
    }
  },
  computed: {},
  watch: {
    '$store.state.online.form.table.businessName'(newVal, oldVal) {
      this.$form.business.businessName = newVal
    },
  },
  components: {},
}
</script>

<style scoped>

</style>