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
      
  >
    <li class="item" v-for="v of components" :key="v.title">
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
}
</script>

<style scoped lang="less">
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