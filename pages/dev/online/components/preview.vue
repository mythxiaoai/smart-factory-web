预览

<template>
  <div class="preview">
    <div class="selectTitle">
      <a-radio-group v-model="$store.state.online.preAction" class="sleectPre" button-style="solid">
        <a-radio-button value="1"> 表单 </a-radio-button>
        <a-radio-button value="2"> 表格 </a-radio-button>
      </a-radio-group>
    </div>
    <div class="scoll">
      <div class="body">
        <div class="box form" v-show="$store.state.online.preAction==1">
          <draggable
            class="box"
            v-model="components"
            :options="{ group: { name: 'component' }, animation: 100 }"
            @clone="clone"
          >
            <div v-for="v in components" :key="v.id">

              <component :is="v.componentName" :key="v.id"></component>

            </div>
            {{ components }}
          </draggable>
        </div>
        <div class="box table" v-show="$store.state.online.preAction==2">

        </div>
      </div>
    </div>

    <!-- <a-tabs v-model="$store.state.online.preAction">
      <a-tab-pane :key="1" tab="表单">
        <div class="scoll">
          <draggable
            class="box"
            v-model="components"
            :options="{ group: { name: 'component' }, animation: 100 }"
            @clone="clone"
          >
            <div v-for="v in components" :key="v.id">
              <component :is="v.componentName" :key="v.id"></component>
            </div>
            {{ components }}
          </draggable>
        </div>
      </a-tab-pane>
      <a-tab-pane :key="2" tab="表格" force-render>
        <div class="scoll">表格</div>
      </a-tab-pane>
    </a-tabs> -->
  </div>
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
  created() {},
  mounted() {},
  data: function () {
    return {
      components: [
        {
          title: '文本框',
          imgbg: '/img/0.png',
          componentName: 'o-text',
        },
        {
          title: '密码框',
          imgbg: '/img/1.png',
          componentName: 'o-password',
        },
        {
          title: '下拉框-单选',
          imgbg: '/img/2.png',
          componentName: 'o-select',
        },
        {
          title: '下拉框-多选',
          imgbg: '/img/3.png',
          componentName: 'o-select-m',
        },
        {
          title: '单选框',
          imgbg: '/img/4.png',
          componentName: 'o-radio',
        },
        {
          title: '多选框',
          imgbg: '/img/5.png',
          componentName: 'o-check',
        },
        {
          title: '时间控制器',
          imgbg: '/img/6.png',
          componentName: 'o-date',
        },
        {
          title: '开关控制',
          imgbg: '/img/7.png',
          componentName: 'o-switch',
        },
        {
          title: '多文本',
          imgbg: '/img/8.png',
          componentName: 'o-textarea',
        },
      ],
    }
  },
  methods: {
    clone(e) {
      console.log(e)
    },
  },
  computed: {},
  watch: {},
}
</script>

<style scoped lang="less">
.preview {
  height: 100%;
  .selectTitle {
    display: flex;
    height: 45px;
    align-items: center;
    justify-content: center;
  }
  .scoll {
      height: calc(100% - 45px);
      margin-right: -17px;
      overflow-y: auto;
      > div {
        padding-right:17px;
      }
    }
  .body {
    height: 100%;
    width: 100%;
  }
}
</style>