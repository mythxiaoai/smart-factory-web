 <!--文本框-->
 <template>
  <a-form-model-item
    :label="label"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
   <a-date-picker
      show-time
      format="YYYY-MM-DD HH:mm:ss"
      placeholder="请选择"
    />
  </a-form-model-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '时间',
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