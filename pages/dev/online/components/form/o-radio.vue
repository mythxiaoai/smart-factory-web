 <!--文本框-->
 <template>
  <a-form-model-item
    :label="label"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-radio-group v-bind="subAttribute">
      <a-radio :value="1"> A </a-radio>
      <a-radio :value="2"> B </a-radio>
      <a-radio :value="3"> C </a-radio>
      <a-radio :value="4"> D </a-radio>
    </a-radio-group>
  </a-form-model-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '单选',
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