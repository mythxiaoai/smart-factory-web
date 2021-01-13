数据库配置
 <template>
  <div>
    <a-form-model
      ref="dbConfig"
      :model="$form"
      :rules="$store.state.online.rules"
    >
      <a-input-group size="small">
        <a-form-model-item
          label="字段名称"
          v-bind="formItemConfig"
          :prop="`columnList[${0}].columnName`"
        >
          <a-input
            placeholder="请输入字段名称"
            v-model="$form.columnList[0].columnName"
          />
        </a-form-model-item>
        <a-form-model-item
          label="字段类型"
          v-bind="formItemConfig"
          :prop="`columnList[${0}].columnType`"
        >
          <a-select
            v-model="$form.columnList[0].columnType"
            size="small"
            @change="selectTypeClick"
          >
            <a-select-option value="varchar">varchar</a-select-option>
            <a-select-option value="Integer">Integer</a-select-option>
            <a-select-option value="Decimal">Decimal</a-select-option>
            <a-select-option value="Date">Date</a-select-option>
            <a-select-option value="Text">Text</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item v-bind="formItemConfig" label="默认值">
          <a-input
            placeholder="请输入默认值"
            v-model="$form.columnList[0].defaultValue"
          />
        </a-form-model-item>

        <a-form-model-item
          v-bind="formItemConfig"
          label="字段长度"
          v-show="
            $form.columnType == 'varchar' ||
            $form.columnType == 'Integer' ||
            $form.columnType == 'Decimal'
          "
        >
          <a-input
            placeholder="请输字段长度"
            v-model="$form.columnList[0].columnLength"
          />
        </a-form-model-item>

        <a-form-model-item
          v-bind="formItemConfig"
          label="小数点位数"
          v-show="$form.columnType == 'Decimal'"
        >
          <a-input
            placeholder="请输入小数点位数"
            v-model="$form.columnList[0].place"
          />
        </a-form-model-item>

        <a-form-model-item label="是否主键" v-bind="formItemConfig">
          <a-switch
            @change="
              $form.columnList[0].pkFlag = $form.columnList[0].pkFlagShow
                ? 1
                : 0
            "
            v-model="$form.columnList[0].pkFlagShow"
            size="small"
          />
        </a-form-model-item>
        <a-form-model-item label="允许空值" v-bind="formItemConfig">
          <a-switch
            @change="$form.columnList[0].blankFlag = $form.columnList[0].blankFlagShow ? 1 : 0"
            v-model="$form.columnList[0].blankFlagShow"
            size="small"
          />
        </a-form-model-item>
        {{ $form }}
      </a-input-group>
    </a-form-model>
  </div>
</template>

<script>
export default {
  async asyncData(content) {},
  fetch({ store, params }) {},
  created() {
    this.$form = this.$store.state.online.form
  },
  mounted() {},
  data: function () {
    return {
      formItemConfig: {
        hasFeedback: true,
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      }
    }
  },
  methods: {
    selectTypeClick(val) {
      this.$form.columnLength = ''
    },
  },
  computed: {},
  watch: {},
  components: {},
}
</script>

<style scoped>
</style>