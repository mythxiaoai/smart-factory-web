列表配置
 <template>
  <div>
    <a-form-model ref="formConfig" :model="currFormData">
      <!-- :rules="$store.state.online.rules" -->
      <a-input-group size="small">
        <a-form-model-item label="查询显示" v-bind="formItemConfig">
          <a-switch
            @change="
              currFormData.queryFlag = currFormData.queryFlagShow ? 1 : 0
            "
            v-model="currFormData.queryFlagShow"
            size="small"
          />
        </a-form-model-item>
        <a-form-model-item
          label="查询方式"
          v-bind="formItemConfig"
          prop="queryMode"
        >
          <a-select v-model="currFormData.queryMode" size="small">
            <a-select-option value="1">等于</a-select-option>
            <a-select-option value="2">不等于</a-select-option>
            <a-select-option value="3">大于</a-select-option>
            <a-select-option value="4">大于等于</a-select-option>
            <a-select-option value="5">小于</a-select-option>
            <a-select-option value="6">小于等于</a-select-option>
            <a-select-option value="7">模糊</a-select-option>
            <a-select-option value="8">左模糊</a-select-option>
            <a-select-option value="9">右模糊</a-select-option>
            <!-- <a-select-option value="4">包含</a-select-option> -->
            <a-select-option value="10">between</a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item label="列表显示" v-bind="formItemConfig">
          <a-switch
            @change="
              currFormData.displayFlag = currFormData.displayFlagShow ? 1 : 0
            "
            v-model="currFormData.displayFlagShow"
            size="small"
          />
        </a-form-model-item>

        <a-collapse :bordered="false" expand-icon-position="right">
          <a-collapse-panel header="数据过滤">
           <a-form-model-item label="选择过滤器" prop="scriptId" v-bind="formItemConfig" :wrapper-col="{ span: 16 }">
                <a-col :span="20">
                <a-tree-select
                  v-model="currFormData.scriptId"
                  placeholder="请选择过滤器"
                  tree-default-expand-all
                  allow-clear
                  size="small"
                  :tree-data="scriptList"
                  @change="cancel"
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
                </a-col>
              <a-col :span="4">
                <a-button
                type="primary"
                size="small"
                icon="plus"
                style="margin-left: 6px"
                @click="handleAdd"
              /></a-col>
            </a-form-model-item>

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
                    v-model="scriptForm.script"
                    :options="cmOptions"
                  >
                  </codemirror>
                </a-form-model-item>
              </a-form-model>
              <div class="cmBtn">
                <a-button size="small" class="btn" @click="cancel"> 取消 </a-button>
                <a-button size="small" type="primary" @click="addScript"> 保存 </a-button>
              </div>
            </div>

          </a-collapse-panel>

        </a-collapse>

        
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
      currFormData: null,
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
        script: `function(text, record, index){
          
        }`,
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
  
        let res = await http(this.scriptForm)
        this.cmShow = false
        this.list()
        //防止修改的时候赋空值
        if(this.scriptForm.id)res.result = this.scriptForm.id
        this.currFormData.scriptId = res.result;
      })
    },
    async handleEdit(id) {
      this.scriptForm = (await this.$http.get(
        `/generator/online/script/get/${id}`
      )).result;
      this.cmShow = true
    },
    async handleDelete(id) {
      await this.$api.generator.online.script.remove.delete([id])
      this.currFormData.scriptId =
        this.currFormData.scriptId !== id ? this.currFormData.scriptId : ''
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

      this.$store.state.online.scriptList = result.records;

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
  watch: {
    '$store.state.online.itemActive': {
      handler: function (newVal, oldVal) {
        let itemActive = this.$store.state.online.itemActive
        this.currFormData = this.$store.state.online.form.formList.find(v=>v.id ==itemActive)
      },
      immediate: true,
    },
  },
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
  /* display: flex;
  margin-left: 16px;
  margin-bottom: 14px; */
}
</style>