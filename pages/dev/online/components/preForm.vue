--中间表单预览--
<template>
  <draggable
    class="preform "
    v-model="components"
    :options="{ group: { name: 'component' }, animation: 100 }"
    @end="end"
    @add="add"
    @start="start"
    @sort="sort"
    ghost-class="ghost"
    :scroll="true"
    :sort="true"
    :move="move"
    ref = "preform"
  >
  
    <template v-if="hasData">
      <div
        class="componentItem"
        @click="$store.state.online.itemActive = v.id"
        :class="{ active: $store.state.online.itemActive === v.id }"
        v-for="v in $store.getters['online/formList']"
        :key="v.id"
        :data-id="v.id"
      >
        <component
          v-show="v.editFlag"
          :is="v.subType"
          :label="v.columnNameCn"
          :subAttribute="v.subAttributeShow"
          :data="v.fromDataShow"
        ></component>
      </div>
    </template>
    <a-empty
      v-else
      :image="simpleImage"
      description="暂无数据，请拖拽左侧组件"
    />
    <!-- {{ JSON.stringify($store.state.online.form,null,4) }} -->
  </draggable>
</template>

<script>

import draggable from 'vuedraggable'
import oText from './form/o-text'
import oPassword from './form/o-password'
import oSelect from './form/o-select'
import oSelectM from './form/o-select-m'
import oRadio from './form/o-radio'
import oCheck from './form/o-check'
import oDate from './form/o-date'
import oSwitch from './form/o-switch'
import oTextarea from './form/o-textarea'
import { Empty } from 'ant-design-vue'

window.formDefault = {
  id: '111',
  editFlag: 1, //修改是否显示
  editFlagShow: true, //修改是否显示
  columnNameCn: '', //字段显示名
  columnName: '', //数据库字段名
  subAttribute: '{}', //组件属性
  subAttributeShow: {
    value: '',
  }, //组件属性
  checkRule: '[]', //验证规则
  checkRuleList: [],
  fromType: '', //数据来源类型diction | json
  fromData: '[]', //数据来源
  queryFlag: 0, //查询是否显示
  queryFlagShow: false, //查询是否显示
  queryMode: '=', //查询方式
  displayFlag: 1, //列表是否显示
  displayFlagShow: true, //列表是否显示
  scriptId: '', //过滤id
  id: '',
  subType: '', //组件类型
  businessId: '', //业务ID
  sort: 0, //排序
}
window.columnDefault = {
  columnName: '', //字段名称
  columnDescribe: '', //描述
  columnType: 'varchar', //字段类型
  defaultValue: '', //默认值
  columnLength: 255, //字段长度
  place: 0, //小数点位数
  blankFlag: 1, //是否运行空值
  blankFlagShow: true, //是否运行空值
  id: '',
  pkFlag: 0,
}

export default {
  components: {
    draggable,
    oText,
    oPassword,
    oSelect,
    oSelectM,
    oRadio,
    oCheck,
    oDate,
    oSwitch,
    oTextarea,
  },
  async asyncData(content) {},
  fetch({ store, params }) {},
  async created() {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
    
  },
  mounted() {

     let mark = true
//     this.$refs.preform.$el.ondragover = function (e) {
//       console.log('ondragover')
//       console.log(e)
//       e.preventDefault()
//     }
let dom  = this.$refs.preform.$el
this.$refs.preform.$el.onmousedown =function(e){
  console.log("onmousedown",e);
  document.onmousemove=function(e){
    console.log("move",e);
  }
  document.onmouseup=function(e){
    console.log("onmouseup",e);

  }

}

    

    
  },
  data: function () {
    return {
      components: [],
    }
  },
  methods: {
    end(e) {
      console.log('end', e)
      //this.$store.state.online.itemActive = e.newIndex;
      document.onmousemove = null;
      document.onmouseup = null;
    },
    sort(e){
      if(e.clone.type == "selectAdd") return;
      console.log(e);
       //排序
      let formList = JSON.parse(JSON.stringify(this.$store.state.online.form.formList));
      //正常显示的个数
      let formListShow = formList.filter(v=>!v.hide);
      //隐藏的
      let formListHide = formList.filter(v=>v.hide);
      //值插入
      if(e.oldIndex>e.newIndex){
        formListShow.splice(e.newIndex,0,formListShow[e.oldIndex]);
        formListShow.splice(e.oldIndex+1,1);
      }else{
        formListShow.splice(e.newIndex+1,0,formListShow[e.oldIndex]);
        formListShow.splice(e.oldIndex,1);
      }
      //组装
      formList = [...formListShow,...formListHide];
      formList.forEach((v,i)=>v.sort=i);
      this.$store.state.online.form.formList = formList;
    },
    add(e) {
      //新增新组建
      let time = Date.now()
      let columnNameCn = e.clone.getAttribute('columnnamecn')
      let subtype = e.clone.getAttribute('subtype')
      this.$store.state.online.itemActive = time
      //修正参数
      let formDefault = JSON.parse(JSON.stringify(window.formDefault))
      let columnDefault = JSON.parse(JSON.stringify(window.columnDefault))
      formDefault.columnNameCn = columnNameCn
      formDefault.id = time+"";
      formDefault.subType = subtype
      formDefault.sort =0;
      columnDefault.columnDescribe = columnNameCn
      formDefault.columnName = 'field' + (this.$store.state.online.form.formList.length+1)
      columnDefault.columnName = formDefault.columnName


      //排序
      let formList = JSON.parse(JSON.stringify(this.$store.state.online.form.formList));
      //正常显示的个数
      let formListShow = formList.filter(v=>!v.hide);
      //隐藏的
      let formListHide = formList.filter(v=>v.hide);
      //插入
      formListShow.splice(e.newIndex, 0,formDefault);
      //组装
      formList = [...formListShow,...formListHide];
      //sort排序
      formList.forEach((v,i)=>{v.sort=i});
      this.$store.state.online.form.formList = formList
      this.$store.state.online.form.columnList.push(columnDefault)
    },
    start(e) {
      console.log('start', e);
      //选中效果
      this.$store.state.online.itemActive = e.clone.dataset.id;
    },
    move(e){
      //console.log("move",e);
      //e.to.style.cursor = "no-drop";
      // let js_componentsDom;
      // if(~e.to.className.indexOf("js_components")){
      //   window.document.body.style.cursor = "no-drop"
      // }else{
      //   window.document.body.style.cursor = "default";
      // }
    }
  },
  computed: {
    hasData() {
      if (this.$store.state.online.draging) return true
      return this.$store.getters['online/hasData']
    },
  },
  watch: {
    '$store.state.online.itemActive'() {
      if (this.$store.state.online.preAction == 1) {
        this.$store.state.online.action = 2
      } else {
        this.$store.state.online.action = 3
      }
    },
  },
}
</script>

<style scoped lang="less">
.preform {
  width: 100%;
  height: 100%;
}
.componentItem {
  cursor: move;
  &.active {
    background-color: #42aaff33;
  }
}
</style>
<style scoped>
>>> .dragClass{
  background:red
}
>>> .ghost {
  background: rgb(248, 238, 238) !important;
}
>>> .ghost.item {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
