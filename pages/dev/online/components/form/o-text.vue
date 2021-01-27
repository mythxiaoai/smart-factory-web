 <!--文本框-->
 <template>
  <a-form-model-item
    :label="label"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-input placeholder="请输入" v-bind="attribute" read-only />
  </a-form-model-item>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '文本',
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
  computed: {
    attribute() {
      let res = {}
      let key = Object.keys(this.subAttribute)
      if (key.length == 0) return res
      //驼峰转横岗   defaultValue---->default-value
      key.forEach((v) => {
        let key = v.replace(/([A-Z])/g, function (val, group, index, allText) {
          return '-' + group.toLocaleLowerCase()
        })
        res[key] = this.subAttribute[v]
      })
      return res
    },
  },
  watch: {},
  components: {},
}
</script>

<style scoped>
</style>