组件选择
<template>
  <draggable
    class="components"
    tag="ul"
    :list="components"
    :options="{
      group: { name: 'component', pull: 'clone', put: false },
      sort: false,
      animation: 100,
    }"
    @start="start"
    @end="end"
    ref="componentsSelect"
  >
    <li
      class="item"
      v-for="(v, i) of components"
      :key="i"
      :columnNameCn="v.title"
      :subType="v.componentName"
      type="selectAdd"
    >
      <div class="title">{{ v.title }}</div>
      <div
        class="body"
        :style="`background-image: url(${v.imgbg});background-size:cover`"
      ></div>
    </li>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable,
  },
  mounted() {
   
  },
  data() {
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
    start(e) {
      // console.log("start");
      this.$store.state.online.preAction = 1
      this.$store.state.online.draging = true
    },
    add(e) {},
    end(e) {
      console.log('end-select', e)
      this.$store.state.online.draging = false
    },
  },
}
</script>

<style scoped lang="less">
// .delClass{
//   cursor: no-drop!important;
//   .item{
//     cursor: no-drop!important;
//   }
// }
.components {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: flex-start;
  padding: 8px;
  padding-bottom: 0;
  margin: 0;
  .item {
    width: 100px;
    height: 100px;
    margin-bottom: 8px;
    font-size: 12px;
    user-select: none;
    cursor: move;
    .title {
      background: #fafafa;
      height: 22px;
      padding: 0 5px;
      line-height: 22px;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
    }
    .body {
      background: #fff;
      width: 100%;
      height: 78px;
    }
  }
}
</style>
<style scoped>
/* >>> .delGhost {
  position: absolute;
  z-index: -1;
  background: red !important;
  height: 0;
  width: 0;
  font-size: 0;
} */
</style>