// 头部信息 可以集中加载企业头像和项目名称  登陆  和首页有用到
<template>
  <div>
    <div class="systemInfo" :class="size">
      <a href="/">
        <img src="~@/assets/imgs/logo.svg" class="logo" alt="logo" />
        <span class="title">Smart-Factory</span>
      </a>
    </div>
    <div v-if="isnomal" class="desc">Smart-Factory是一款生产项目的在线开发平台</div>
  </div>
</template>

<script>
//nomal small两种尺寸
export default {
  props: {
    size: {
      type: String,
      default: 'nomal'
    }
  },
  computed:{
    isnomal(){
      return this.size=="nomal";
    }
  }
}
</script>

<style  lang="less" scoped>
.systemInfo.small {
  position: relative;
  height: 64px;
  width: 100%;
  padding-left: 24px;
  overflow: hidden;
  line-height: 64px;
  background: #002140;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
  a{
    display: inline-block;
  }
  img,
  svg,
  .title {
    display: inline-block;
    vertical-align: middle;
  }

  img,
  svg {
    height: 32px;
    width: 32px;
  }

  .title {
    display:inline-block;
    color: #fff;
    font-size: 20px;
    margin-left:12px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    font-weight: 600;
    vertical-align: middle;
  }
}

.systemInfo.nomal {
  height: 44px;
  line-height: 44px;

  .badge {
    position: absolute;
    display: inline-block;
    line-height: 1;
    vertical-align: middle;
    margin-left: -12px;
    margin-top: -10px;
    opacity: 0.8;
  }

  .logo {
    height: 44px;
    vertical-align: top;
    margin-right: 16px;
    border-style: none;
  }

  .title {
    font-size: 33px;
    color: rgba(0, 0, 0, 0.85);
    font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
    font-weight: 600;
    position: relative;
    top: 2px;
  }
}
.desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}
</style>
