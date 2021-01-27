表单配置
 <template>
  <div>
    <a-tabs>
      <a-tab-pane :key="1" tab="属性">
        <a-form-model
          ref="formConfig"
          :model="currFormData"
          :rules="$store.state.online.rules"
        >
          <a-input-group size="small">
            <a-form-model-item label="修改是否显示" v-bind="formItemConfig">
              <a-switch
                @change="
                  currFormData.editFlag = currFormData.editFlagShow ? 1 : 0
                "
                v-model="currFormData.editFlagShow"
                size="small"
              />
            </a-form-model-item>
            <a-form-model-item label="字段名" v-bind="formItemConfig">
              <!-- :prop="`formList[${0}].columnNameCn`" -->
              <a-input
                placeholder="请输入字段名"
                v-model="currFormData.columnNameCn"
              />
            </a-form-model-item>
            <a-form-model-item label="值" v-bind="formItemConfig">
              <!-- prop="formList.columnNameCn" -->
              <a-input
                placeholder="请输入默认值"
                v-model="currFormData.subAttributeShow.value"
                @change="change"
              />
            </a-form-model-item>

            <a-collapse :bordered="false" expand-icon-position="right">
              <a-collapse-panel header="自定义属性">
                <codemirror
                  ref="codemirror1"
                  v-model="currFormData.subAttribute"
                  :options="cmOptions"
                  @input="codemirrorInput"
                >
                </codemirror>
              </a-collapse-panel>

              <a-collapse-panel header="表单验证">
                <a-form-model-item label="验证规则" v-bind="formItemConfig">
                  <a-select
                    mode="tags"
                    v-model="currFormData.checkRuleList"
                    size="small"
                  >
                    <a-select-option value="required">必填</a-select-option>
                    <a-select-option value="unique">唯一</a-select-option>
                    <a-select-option value="email">邮箱</a-select-option>
                    <a-select-option value="telephone">手机</a-select-option>
                  </a-select>
                </a-form-model-item>
                <a-form-model-item label="自定义验证">
                  <codemirror
                    ref="codemirror2"
                    v-model="currFormData.checkRule"
                    :options="cmOptions"
                    @input="syncCheckRule"
                  >
                  </codemirror>
                </a-form-model-item>
              </a-collapse-panel>
            </a-collapse>
          </a-input-group>
        </a-form-model>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="数据">
        <a-form-model
          ref="formConfig"
          :model="currFormData"
          :rules="$store.state.online.rules"
        >
          <a-form-model-item label="数据来源" v-bind="formItemConfig">
            <a-select
              v-model="currFormData.fromType"
              size="small"
              @change="fromTypeChange"
            >
              <a-select-option value="">无</a-select-option>
              <a-select-option value="diction">字典</a-select-option>
              <a-select-option value="json">手动json</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            label="字典表"
            v-bind="formItemConfig"
            v-show="currFormData.fromType == 'diction'"
          >
            <a-select size="small" v-model="currFormData.fromData">
              <a-select-option
                v-for="item in dictionList"
                :key="item"
                :value="item"
              >
                {{ item }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <codemirror
            v-show="currFormData.fromType == 'json'"
            ref="codemirror3"
            v-model="currFormData.fromData"
            :options="cmOptions"
          >
          </codemirror>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Vue from 'vue'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript' // 这js模式必须引入的
import 'codemirror/addon/selection/active-line' //光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/keymap/sublime' //sublime编辑器效果
import 'codemirror/mode/css/css'
import 'codemirror/theme/monokai.css' //编辑器主题样式，配置里面theme需要设置monokai
// <a-select-option value="required">必填</a-select-option>
//       <a-select-option value="unique">唯一</a-select-option>
//       <a-select-option value="email">邮箱</a-select-option>
//       <a-select-option value="telephone">手机</a-select-option>

const regexp = {
  required: { required: true, message: '不能为空~', trigger: 'blur' },
  // unique:{ validator: "unique", trigger: 'blur' },
  unique: 'unique',
  email: { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' },
  //telephone:{ pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确手机号~',trigger: 'blur' },
  telephone: 'telephone',
}

export default {
  async asyncData(content) {},
  fetch({ store, params }) {},
  async created() {},
  mounted() {},
  data: function () {
    return {
      formItemConfig: {
        hasFeedback: true,
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      },
      cmOptions: {
        tabSize: 2, // Tab键空格数
        mode: {
          name: 'javascript',
          json: true,
        }, //模式
        theme: 'base16-light', // 主题
        lineNumbers: true, //是否显示行号
        line: true,
        styleActiveLine: true,
        autorefresh: true,
      },
      currFormData: {},
      currColumnData: {},
    }
  },
  methods: {
    fromTypeChange() {
      if (this.currFormData.fromType == 'json') {
        this.currFormData.fromData = '[]'
      } else {
        this.currFormData.fromData = ''
      }
    },
    change() {
      let subAttribute
      try {
        subAttribute = JSON.parse(this.currFormData.subAttribute)
      } catch (error) {
        return
      }
      for (const key in this.currFormData.subAttributeShow) {
        if (this.currFormData.subAttributeShow.hasOwnProperty(key)) {
          subAttribute[key] = this.currFormData.subAttributeShow[key]
        }
      }
      this.currFormData.subAttribute = JSON.stringify(subAttribute, null, 2)
    },
    codemirrorInput() {
      let subAttribute
      try {
        subAttribute = JSON.parse(this.currFormData.subAttribute)
      } catch (error) {
        return
      }
      if (subAttribute.value != this.currFormData.subAttributeShow.value) {
        this.currFormData.subAttributeShow.value = subAttribute.value
      }
    },
    syncCheckRule() {
      //同步双方数据
      //A:currFormData.checkRuleList
      //B:currFormData.checkRule
      //A有  B没有  新增
      //A没有 B有   删除
      let checkRule
      try {
        checkRule = JSON.parse(this.currFormData.checkRule)
      } catch (error) {
        return
      }
      //去重
      checkRule = Array.from(new Set(checkRule))
      //
      let all = ['required', 'unique', 'email', 'telephone']
      //新增
      let other = all.filter((v) => ~checkRule.indexOf(v))
      other.forEach((v) => {
        if (!~this.currFormData.checkRuleList.indexOf(v)) {
          this.currFormData.checkRuleList.push(v)
        }
      })
      //删除
      this.currFormData.checkRuleList.forEach((v, i) => {
        if (!~other.indexOf(v)) {
          this.currFormData.checkRuleList.splice(i, i)
        }
      })
    },
  },
  computed: {
    dictionList() {
      if (this.currFormData.fromType == 'diction') {
        let res = Object.keys(Vue.ls.get('dict'))
        this.currFormData.fromData = res[0]
        return res
      } else {
        return []
      }
    },
    diction() {
      if (this.currFormData.fromType == 'diction') {
        let res = Vue.ls.get('dict')
        return JSON.stringify(res[this.currFormData.fromData], null, 2)
      } else {
        return ''
      }
    },
  },
  watch: {
    'currFormData.columnNameCn'(val) {
      this.currColumnData.columnDescribe = val
    },
    '$store.state.online.itemActive': {
      handler: function (newVal, oldVal) {
        let itemActive = this.$store.state.online.itemActive
        this.currFormData = this.$store.state.online.form.formList.find(
          (v) => v.id == itemActive
        )
        this.currColumnData = this.$store.state.online.form.columnList.find(
          (v) => this.currFormData.columnName == v.columnName
        )
      },
      immediate: true,
    },
    'currFormData.checkRuleList'() {
      let checkRule
      try {
        checkRule = JSON.parse(this.currFormData.checkRule)
      } catch (error) {
        return
      }
      //去重
      checkRule = Array.from(new Set(checkRule))
      //
      let all = ['required', 'unique', 'email', 'telephone']
      //新增
      this.currFormData.checkRuleList.forEach((v) => {
        if (!~checkRule.indexOf(v)) {
          checkRule.unshift(v)
        }
      })
      //删除
      let other = all.filter(
        (v) => !~this.currFormData.checkRuleList.indexOf(v)
      )
      other.forEach((v) => {
        let index = checkRule.indexOf(v)
        if (!!~index) {
          checkRule.splice(index, 1)
        }
      })

      this.currFormData.checkRule = JSON.stringify(checkRule, null, 2)
    },
  },
  components: {
    codemirror,
  },
}
</script>

<style scoped>
</style>