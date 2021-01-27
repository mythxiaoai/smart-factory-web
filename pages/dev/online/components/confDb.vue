数据库配置
 <template>
  <div>
    <a-form-model
      ref="dbConfig"
      :model="currColumnData"
    >
      <!-- :rules="$store.state.online.rules" -->
      <a-input-group size="small">
        <a-form-model-item
          label="字段名称"
          v-bind="formItemConfig"
        >
          <!-- :prop="`columnList[${0}].columnName`" -->
          <a-input
            placeholder="请输入字段名称"
            @input="currFormData.columnName = currColumnData.columnName"
            v-model="currColumnData.columnName"
          />
        </a-form-model-item>
        <a-form-model-item
          label="字段类型"
          v-bind="formItemConfig"
        >
          <!-- :prop="`columnList[${0}].columnType`" -->
          <a-select
            v-model="currColumnData.columnType"
            size="small"
            @change="selectTypeClick"
          >
            <a-select-option value="varchar">varchar</a-select-option>
            <a-select-option value="integer">integer</a-select-option>
            <a-select-option value="decimal">decimal</a-select-option>
            <a-select-option value="date">date</a-select-option>
            <a-select-option value="text">text</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-bind="formItemConfig" label="默认值">
          <a-input
            placeholder="请输入默认值"
            v-model="currColumnData.defaultValue"
          />
        </a-form-model-item>

        <a-form-model-item
          v-bind="formItemConfig"
          label="字段长度"
          v-show="columnLengthShow"
        >
        
        
          <a-input
            placeholder="请输字段长度"
            v-model="currColumnData.columnLength"
          />
        </a-form-model-item>

          <!-- v-show="currColumnData.columnType == 'Decimal'" -->
        <a-form-model-item
          v-bind="formItemConfig"
          label="小数点位数"
          v-show="placeShow"
        >
          <a-input
            placeholder="请输入小数点位数"
            v-model="currColumnData.place"
          />
        </a-form-model-item>

        <!-- <a-form-model-item label="是否主键" v-bind="formItemConfig">
          <a-switch
            @change="
              currColumnData.pkFlag = currColumnData.pkFlagShow
                ? 1
                : 0
            "
            v-model="currColumnData.pkFlagShow"
            size="small"
          />
        </a-form-model-item> -->
        <a-form-model-item label="允许空值" v-bind="formItemConfig">
          <a-switch
            @change="currColumnData.blankFlag = currColumnData.blankFlagShow ? 1 : 0"
            v-model="currColumnData.blankFlagShow"
            size="small"
          />
        </a-form-model-item>
      </a-input-group>
    </a-form-model>
  </div>
</template>

<script>
export default {
  async asyncData(content) {},
  fetch({ store, params }) {},
  created() {
  },
  mounted() {},
  data: function () {
    return {
      formItemConfig: {
        hasFeedback: true,
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      },
      currFormData:null,
      currColumnData:null,
    }
  },
  methods: {
    selectTypeClick(val) {
     //varchar integer decimal date text
     let place = 0;
     let columnLength = 0;
      switch (val) {
        case "varchar":
          columnLength = 255;
          break;
        case "decimal":
          place = 5;
          columnLength = 20;
          break;
        case "integer":
          place = 15;
          break;
      }
    this.currColumnData.place = place;
    this.currColumnData.columnLength = columnLength;
    },
  },
  computed: {
    columnLengthShow(){
      return !!~["varchar","intger","decimal"].indexOf(this.currColumnData.columnType);
    },
    placeShow(){
      return !!~["decimal"].indexOf(this.currColumnData.columnType);
    }
  },
  watch: {
    '$store.state.online.itemActive': {
      handler: function (newVal, oldVal) {
        let itemActive = this.$store.state.online.itemActive;
        this.currFormData = this.$store.state.online.form.formList.find(v=>v.id == itemActive);
        this.currColumnData = this.$store.state.online.form.columnList.find(v=>v.columnName == this.currFormData.columnName);
      },
      immediate: true,
    },
  },
  components: {},
}
</script>

<style scoped>
</style>