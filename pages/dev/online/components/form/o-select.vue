 <!--文本框-->
 <template>
  <a-form-model-item
    :label="label"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
  <a-select default-value="" v-bind="subAttribute">
    <a-select-option value="">请选择</a-select-option>
    <a-select-option v-for="i in 5" :key="i">{{i}}</a-select-option>
  </a-select>
  </a-form-model-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '下拉',
    },
    subAttribute: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {},
  mounted() {},
  data: function () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      value:"",
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    }
  },
  methods: {},
  computed: {},
  watch: {},
  components: {},
}
</script>

<style scoped>
</style>