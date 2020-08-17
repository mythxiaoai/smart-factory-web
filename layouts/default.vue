<template>
  <a-layout id="home-layout" :class="device">
    <a-layout-sider
      class="global-sider"
      :trigger="null"
      collapsible
      v-model="collapsed"
      width="240"
    >
      <system-info size="small" />
      <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']" @click="menuClick">
        <a-menu-item key="/sys/diction/list">
          <a-icon type="user" />
          <span>数据字典</span>
        </a-menu-item>
        <a-menu-item key="/sys/dept/list">
          <a-icon type="video-camera" />
          <span>部门管理</span>
        </a-menu-item>
        <a-menu-item key="/sys/user/list">
          <a-icon type="upload" />
          <span>用户管理</span>
        </a-menu-item>
        <a-menu-item key="/sys/role/list">
          <a-icon type="upload" />
          <span>角色管理</span>
        </a-menu-item>
        <a-menu-item key="/sys/menu/list">
          <a-icon type="upload" />
          <span>菜单管理</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout>
      <a-layout-header class="global-header">
        <div class="header-left">
          <a-icon
            class="trigger collapse"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          />欢迎进入 Smart-Factory 项目工厂
        </div>
        <div class="header-right">
          <a-icon class="trigger" type="search" />
          <a-icon class="trigger" type="question-circle" />

          <a-dropdown>
            <span class="trigger">
              <a-avatar
                class="avatar"
                size="small"
                src="https://preview.pro.loacg.com/avatar2.jpg"
              />
              <span>欢迎您，admin</span>
            </span>
            <a-menu slot="overlay">
              <a-menu-item key="0">
                <a-icon type="user" />
                <span>个人中心</span>
              </a-menu-item>
              <a-menu-item key="1">
                <a-icon type="setting" />
                <span>账户设置</span>
              </a-menu-item>
              <a-menu-item key="3">
                <a-icon type="tool" />
                <span>系统设置</span>
              </a-menu-item>
              <a-menu-item key="4">
                <a-icon type="setting" />
                <span>密码修改</span>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
          <span class="trigger">
            <a-icon type="logout" /> 退出登陆
          </span>
        </div>
      </a-layout-header>
      <a-layout-content class="global-content">
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SystemInfo from '@/components/layouts/SystemInfo.vue'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      collapsed: false
    }
  },
  methods:{
    menuClick:function(item){
      let {key} = item ;
      console.log(this);
      this.$router.push(key);
    }
  },
  computed: {
    ...mapState({
      device: (state) => state.app.device
    })
  },
  components: {
    SystemInfo
  }
}
</script>
<style lang="less" scoped>
#home-layout{
  min-height: 100vh!important;
  overflow-x: hidden;
}

.global-header {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  .trigger {
    display: inline-block;
    font-size: 14px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
    &.collapse {
      font-size: 20px;
    }
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }
}

.global-content {
  margin: 12px;
  background: #fff;
  height: 100%;
}
</style>
