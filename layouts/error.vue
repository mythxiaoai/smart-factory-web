<template>
  <div class="exception">
    <div class="imgBlock">
      <div class="imgEle" :style="{backgroundImage: `url(${data.img})`}">
      </div>
    </div>
    <div class="content">
      <h1>{{ data.title }}</h1>
      <div class="desc">{{ data.desc }}</div>
      <div class="actions">
        <a-button type="primary" @click="handleToHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import {messageArr,imgs} from '@/assets/utils/errorTip.js'
import { LONGINPATH, HOMEPATH } from '@/assets/config/appConfig.js'
export default {
  name: 'NuxtError',
  //默认是继承的布局模板
  // layout: 'error',
  props: {
    error: {
      type: Object,
      default: {}
    }
  },
  created(){
  },
  computed: {
    data () {
      let res = {};
      console.log(this.error);
      let {statusCode,message} = this.error;
      res.title = statusCode ;
      res.desc = message || messageArr[statusCode] || "错误";
      console.log(message,res.desc);
      res.img = imgs[statusCode] || imgs["other"];
      return res;
    }
  },
  methods: {
    handleToHome () {
      this.$router.push({ path: HOMEPATH })
    }
  },
  head () {
    return {
      title: this.error.message,
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'
        }
      ]
    }
  }
}
</script>
<style lang="less">
@import "~ant-design-vue/lib/style/index.less";

.exception {
  display: flex;
  align-items: center;
  //height: 80%;
  height: 100%;
  min-height: 500px;

  .imgBlock {
    flex: 0 0 62.5%;
    width: 62.5%;
    padding-right: 152px;
    zoom: 1;
    &::before,
    &::after {
      content: ' ';
      display: table;
    }
    &::after {
      clear: both;
      height: 0;
      font-size: 0;
      visibility: hidden;
    }
  }

  .imgEle {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .content {
    flex: auto;

    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }

    .desc {
      margin-bottom: 16px;
      color: @text-color-secondary;
      font-size: 20px;
      line-height: 28px;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}

@media screen and (max-width: @screen-xl) {
  .exception {
    .imgBlock {
      padding-right: 88px;
    }
  }
}

@media screen and (max-width: @screen-sm) {
  .exception {
    display: block;
    text-align: center;
    .imgBlock {
      margin: 0 auto 24px;
      padding-right: 0;
    }
  }
}

@media screen and (max-width: @screen-xs) {
  .exception {
    .imgBlock {
      margin-bottom: -24px;
      overflow: hidden;
    }
  }
}
</style>

