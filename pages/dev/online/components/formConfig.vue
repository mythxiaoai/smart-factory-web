表单配置
 <template>
  <div>
    <a-tabs @change="insertVar">
      <a-tab-pane :key="1" tab="属性">
        <a-form-model
          ref="formConfig"
          :model="$form"
          :rules="$store.state.online.rules"
        >
          <a-input-group size="small">
            <a-form-model-item label="修改是否显示" v-bind="formItemConfig">
              <a-switch
                @change="$form.formList[0].editFlag = editFlagShow ? 1 : 0"
                v-model="editFlagShow"
                size="small"
              />
            </a-form-model-item>
            <a-form-model-item
              label="字段名"
              v-bind="formItemConfig"
              :prop="`formList[${0}].columnNameCn`"
            >
              <a-input placeholder="请输入字段名" v-model="$form.formList[0].columnNameCn" />
            </a-form-model-item>
            <a-form-model-item
              label="值"
              v-bind="formItemConfig"
              prop="formList.columnNameCn"
            >
              <a-input
                placeholder="请输入默认值"
                v-model="$form.formList[0].columnNameCn"
              />
            </a-form-model-item>

            <a-collapse :bordered="false" expand-icon-position="right">
              <a-collapse-panel header="自定义属性">
                <a-row type="flex">
                  <a-col flex="2">属性名称 </a-col>
                  <a-col flex="2">属性值</a-col>
                  <a-col flex="1">操作</a-col>
                </a-row>
                <a-list item-layout="horizontal" :data-source="$form.formList[0].indexList">
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <a-row type="flex" justify="center">
                      <a-col flex="2">
                        <a-input
                          type="text"
                          v-model="item.indexColumn"
                          size="small"
                        ></a-input>
                      </a-col>

                      <a-col flex="2">
                        <a-input
                          type="text"
                          v-model="item.indexName"
                          size="small"
                        ></a-input>
                      </a-col>

                      <a-col flex="1">
                        <a-button
                          v-show="$form.formList[0].indexList.length > 1"
                          type="primary"
                          size="small"
                          icon="delete"
                          @click="delIndex(index)"
                        />
                      </a-col>
                    </a-row>
                  </a-list-item>
                </a-list>
                <a-row type="flex">
                  <a-button
                    type="primary"
                    @click="addIndex"
                    icon="plus"
                    size="small"
                    block
                  >
                    新增</a-button
                  >
                </a-row>
              </a-collapse-panel>
            </a-collapse>

            <a-form-model-item
              label="验证规则"
              v-bind="formItemConfig"
            >
              <a-select v-model="$form.formList[0].checkRuleList" size="small">
                <a-select-option value="1">空</a-select-option>
                <a-select-option value="2">必填</a-select-option>
                <a-select-option value="3">唯一</a-select-option>
                <a-select-option value="4">邮箱</a-select-option>
                <a-select-option value="5">手机</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item label="自定义验证" prop="checkRule">
              <codemirror
                ref="myCm"
                :value="$form.formList[0].checkRule"
                @blur="onCmblur"
                :options="cmOptions"
              >
              </codemirror>
            </a-form-model-item>
            {{ $form }}
          </a-input-group>
        </a-form-model>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="数据">
        <a-form-model
          ref="formConfig"
          :model="$form"
          :rules="$store.state.online.rules"
        >
          <a-form-model-item
            label="数据来源"
            v-bind="formItemConfig"
          >
            <a-select v-model="$form.formList[0].fromType" size="small">
              <a-select-option value="">无</a-select-option>
              <a-select-option value="diction">字典</a-select-option>
              <a-select-option value="json">手动json</a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item
            label="字典表"
            v-bind="formItemConfig"
            v-show="$form.formList[0].fromType == 'diction'"
          >
            <a-select size="small"> </a-select>
          </a-form-model-item>
          <codemirror
            v-show="$form.formList[0].fromType == 'json'"
            ref="dataCm"
            :value="$form.formList[0].fromData"
            @blur="dataCmblur"
            :options="cmOptions"
          >
          </codemirror>
        </a-form-model>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript' // 这js模式必须引入的
import 'codemirror/addon/selection/active-line' //光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/keymap/sublime' //sublime编辑器效果
import 'codemirror/mode/css/css'
import 'codemirror/theme/monokai.css' //编辑器主题样式，配置里面theme需要设置monokai

let indexData = {
  indexColumn: '',
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
      indexData,
      editFlagShow: true,
      cmOptions: {
        tabSize: 2, // Tab键空格数
        mode: 'application/json', //模式
        theme: 'base16-light', // 主题
        lineNumbers: true, //是否显示行号
        line: true,
        styleActiveLine: true,
        autorefresh: true,
      },
    }
  },
  methods: {
    insertVar(val) {
      this.$nextTick(() => {
        val == '1' && this.codemirror.setValue('[{}]')
      })
    },
    onCmblur() {
      this.$form.checkRule = this.codemirror.getValue()
    },
    dataCmblur() {
      this.$form.fromData = this.dataCodemirror.getValue()
    },
    delIndex(index) {
      this.$form.formList[0].indexList.splice(index, 1)
    },
    addIndex() {
      let newObj = JSON.parse(JSON.stringify(indexData))
      this.$form.formList[0].indexList.push(newObj)
    },
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    },
    dataCodemirror() {
      return this.$refs.dataCm.codemirror
    },
  },
  watch: {
    '$store.state.online.index'(newVal, oldVal) {
      this.$store.state.online.index = newVal
    },
  },
  components: {
    codemirror,
  },
}
</script>

<style scoped>
</style>