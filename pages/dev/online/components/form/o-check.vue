 oText,oPassword,oSelectO,oSelectM,oRadio,oCheck,oDate,oSwitch,oTextarea
 <!--文本框-->
 <template>
  <a-form-model-item
    :label="label"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-checkbox-group :options="data" />
  </a-form-model-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '多选',
    },
    subAttribute: {
      type: Object,
      default: () => ({}),
    },
    data:{
      type: Array,
      default:()=>["A","B","C","D"]
    }
  },
  created() {},
  mounted() {},
  data: function () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
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