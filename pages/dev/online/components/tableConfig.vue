列表配置
 <template>
  <div>
    <a-form-model
      ref="formConfig"
      :model="$form"
      :rules="$store.state.online.rules"
    >
      <a-input-group size="small">
        <a-form-model-item label="查询显示" v-bind="formItemConfig">
          <a-switch
            @change="$form.formList[0].queryFlag = queryFlagShow ? 1 : 0"
            v-model="queryFlagShow"
            size="small"
          />
        </a-form-model-item>
        <a-form-model-item
          label="查询方式"
          v-bind="formItemConfig"
          prop="queryMode"
        >
          <a-select v-model="$form.formList[0].queryMode" size="small">
            <a-select-option value="=">等于</a-select-option>
            <a-select-option value="!=">不等于</a-select-option>
            <a-select-option value=">">大于</a-select-option>
            <a-select-option value=">=">大于等于</a-select-option>
            <a-select-option value="<">小于</a-select-option>
            <a-select-option value="<=">小于等于</a-select-option>
            <a-select-option value="1">模糊</a-select-option>
            <a-select-option value="2">左模糊</a-select-option>
            <a-select-option value="3">右模糊</a-select-option>
            <a-select-option value="4">包含</a-select-option>
            <a-select-option value="between">between</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="列表显示" v-bind="formItemConfig">
          <a-switch
            @change="$form.formList[0].displayFlag = displayFlagShow ? 1 : 0"
            v-model="displayFlagShow"
            size="small"
          />
        </a-form-model-item>
        <a-form-model-item label="数据过滤" prop="scriptId">
          <div class="script-filter">
            <a-tree-select
              v-model="$form.formList[0].scriptId"
              placeholder="请选择过滤器"
              tree-default-expand-all
              allow-clear
              size="small"
              style="width: 80%"
              :tree-data="scriptList"
            >
              <template slot="title" slot-scope="{ key, value }">
                <div class="select-tree-script">
                  {{ key }}
                  <div class="select-tree-btn">
                    <a-button
                      type="primary"
                      size="small"
                      icon="edit"
                      style="margin-left: 6px"
                      @click.stop="handleEdit(value)"
                    />
                    <a-button
                      type="primary"
                      size="small"
                      icon="delete"
                      style="margin-left: 6px"
                      @click.stop="handleDelete(value)"
                    />
                  </div>
                </div>
              </template>
            </a-tree-select>
            <a-button
              type="primary"
              size="small"
              icon="plus"
              style="margin-left: 6px"
              @click="handleAdd"
            />
          </div>
          <div v-show="cmShow" style="background: #fff">
            <a-form-model ref="ruleForm" :model="scriptForm" :rules="rules">
              <a-form-model-item
                label="脚本名称"
                v-bind="formItemConfig"
                prop="scriptName"
              >
                <a-input
                  placeholder="请输入脚本名称"
                  v-model="scriptForm.scriptName"
                />
              </a-form-model-item>
              <a-form-model-item prop="script">
                <codemirror
                  ref="myCm"
                  :value="scriptForm.script"
                  @blur="cmBlur"
                  :options="cmOptions"
                >
                </codemirror>
              </a-form-model-item>
            </a-form-model>
            <div class="cmBtn">
              <a-button class="btn" @click="cancel"> 取消 </a-button>
              <a-button type="primary" @click="addScript"> 完成 </a-button>
            </div>
          </div>
        </a-form-model-item>
        {{ $form }}
      </a-input-group>
    </a-form-model>
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
export default {
  async asyncData(content) {},
  fetch({ store, params }) {},
  created() {
    this.$form = this.$store.state.online.form
    this.list()
  },
  mounted() {},
  data: function () {
    return {
      formItemConfig: {
        hasFeedback: true,
        labelCol: { span: 8 },
        wrapperCol: { span: 14 },
      },
      displayFlagShow: true,
      queryFlagShow: false,
      cmShow: false,
      cmOptions: {
        tabSize: 2, // Tab键空格数
        mode: 'text/javascript', //模式
        theme: 'base16-light', // 主题
        line: true,
        styleActiveLine: true,
        autorefresh: true,
      },
      scriptForm: {
        script: '',
        scriptName: '',
      },
      scriptList: [],
      rules: {
        scriptName: [{ required: true, message: '不能为空~', trigger: 'blur' }],
      },
    }
  },
  methods: {
    handleAdd() {
      this.codemirror.setSize('auto', '200px')
      this.resetScript()
      this.cmShow = true
    },
    resetScript() {
      this.scriptForm = {
        script: '',
        scriptName: '',
        id: '',
      }
    },
    addScript() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid) return
        const http = this.scriptForm.id
          ? this.$api.generator.online.script.update.post
          : this.$api.generator.online.script.save.post

        await http(this.scriptForm)
        this.cmShow = false
        this.list()
      })
    },
    async handleEdit(id) {
      this.scriptForm = await this.$http.get(
        `/generator/online/script/get/${id}`
      )
      this.cmShow = true
    },
    async handleDelete(id) {
      await this.$api.generator.online.script.remove.delete([id])
      console.log(this.$form.formList[0].scriptId,id)
      this.$form.formList[0].scriptId =
        this.$form.formList[0].scriptId !== id
          ? this.$form.formList[0].scriptId
          : ''
      this.list()
    },
    cancel() {
      this.cmShow = false
    },
    cmBlur() {
      this.scriptForm.script = this.codemirror.getValue()
    },
    async list() {
      let { result } = await this.$api.generator.online.script.list.get({
        pageSize: 999,
      })
      this.scriptList = result.records.map((item) => {
        return {
          key: item.scriptName,
          value: item.id,
          scopedSlots: {
            title: 'title',
          },
        }
      })
    },
  },
  computed: {
    codemirror() {
      return this.$refs.myCm.codemirror
    },
  },
  watch: {},
  components: { codemirror },
}
</script>

<style scoped>
.cmBtn {
  display: flex;
  justify-content: flex-end;
  padding: 6px;
}
.cmBtn .btn {
  margin-right: 6px;
}
>>> .ant-select-selection-selected-value .select-tree-script .select-tree-btn {
  display: none;
}
.select-tree-script {
  display: flex;
  justify-content: space-between;
}
.script-filter {
  display: flex;
  margin-left: 16px;
  margin-bottom: 14px;
}
</style>