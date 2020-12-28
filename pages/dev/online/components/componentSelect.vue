组件选择
<template>
  <ul class="components">
    <!-- <li class="item">
      <div class="title">文本框</div>
      <div class="body">
        <img src="/img/1.png" width="100" height="78" />
      </div>
    </li> -->
    <li class="item" v-for="v of components" :key="v.title">
       <div class="title">{{v.title}}</div>
      <div class="body" :style="`background-image: url(${v.imgbg});background-size:cover`">
      </div>
    </li>
  </ul>
</template>

<script>
let components = [
  '文本框',
  '密码框',
  '下拉框-单选',
  '下拉框-多选',
  '单选框',
  '多选框',
  '时间控制器',
  '开关控制',
  '多文本',
]
//JSON.stringify(["文本框","密码框","下拉框-单选","下拉框-多选","单选框","多选框","时间控制器","开关控制","多文本"].map((v,i)=>({title:v,imgbg:`/img/${i}.png`})),null,4)
export default {
  data() {
    return {
      components: [
        {
          title: '文本框',
          imgbg: '/img/0.png',
        },
        {
          title: '密码框',
          imgbg: '/img/1.png',
        },
        {
          title: '下拉框-单选',
          imgbg: '/img/2.png',
        },
        {
          title: '下拉框-多选',
          imgbg: '/img/3.png',
        },
        {
          title: '单选框',
          imgbg: '/img/4.png',
        },
        {
          title: '多选框',
          imgbg: '/img/5.png',
        },
        {
          title: '时间控制器',
          imgbg: '/img/6.png',
        },
        {
          title: '开关控制',
          imgbg: '/img/7.png',
        },
        {
          title: '多文本',
          imgbg: '/img/8.png',
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