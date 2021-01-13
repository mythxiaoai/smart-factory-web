 <!--文本框-->
 <template>
  <a-form-model-item
    :label="columnNameCn"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-switch v-bind="subAttribute" />
  </a-form-model-item>
</template>

<script>
export default {
  props: {
    columnNameCn: {
      type: String,
      default: '标题',
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