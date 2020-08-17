<template>
  <div id="loginLayout" :class="['login-layout-wrapper',device]">
    <div class="container">
      <div class="top">
        <system-info/>
      </div>

      <nuxt />

      <div class="footer">
        <div class="links">
          <a href="_self">帮助</a>
          <a href="_self">隐私</a>
          <a href="_self">条款</a>
        </div>
        <div class="copyright">Copyright &copy; 2020 myth小艾个人出品</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SystemInfo from '@/components/layouts/SystemInfo.vue'
import Footer from '@/components/layouts/Footer.vue'
export default {
  name: 'loginLayout',
  data() {
    return {
     
    }
  },
  mounted() {
    //document.body.classList.add('loginLayout')
  },
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  beforeDestroy() {
    //document.body.classList.remove('loginLayout')
  },
  components:{
    SystemInfo,Footer
  }
}
</script>

<style lang="less" scoped>
#loginLayout.login-layout-wrapper {
  height: 100%;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url(~@/assets/imgs/background.svg) no-repeat 50%;
    background-size: 100%;
    padding: 110px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;
      
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
    }
  }
}
</style>
