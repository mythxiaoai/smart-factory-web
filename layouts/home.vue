<template>
  <a-layout class="container">
    <!--菜单-->
    <a-layout-sider
      class="global-sider"
      :trigger="null"
      collapsible
      v-model="collapsed"
      width="240"
    >
      <system-info size="small" />
      {{ menu[0].name }}
      <a-menu
        theme="dark"
        mode="inline"
        :selectedKeys="selectedKeys"
        :openKeys.sync="openKeys"
        @click="menuClick"
      >
        <template v-for="item in menu">
          <a-menu-item v-if="!item.children" :key="item.url">
            <a-icon :type="item.icon" />
            <span>{{ item.name }}</span>
          </a-menu-item>
          <sider-menu v-else :key="item.url" :menu-info="item" />
        </template>

        <!-- <a-menu-item key="/sys/diction/list">
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
        <a-menu-item key="/sys/application/list">
          <a-icon type="upload" />
          <span>应用管理</span>
        </a-menu-item>
        <a-menu-item key="/dev/gen/list">
          <a-icon type="upload" />
          <span>快速开发</span>
        </a-menu-item> -->
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
          <span class="trigger" @click="loginout">
            <a-icon type="logout" />退出登陆
          </span>
        </div>
      </a-layout-header>
      <div class="home_tab">
        <x-tabs></x-tabs>
      </div>
      <a-layout-content class="global-content">
        <nuxt />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import SystemInfo from '@/components/layouts/SystemInfo.vue'
import SiderMenu from '@/components/layouts/SiderMenu.vue'
import XTabs from '@/components/layouts/XTabs.vue'

import { LONGINPATH, HOMEPATH } from '@/assets/config/appConfig.js'

import { mapGetters, mapState } from 'Vuex'

export default {
  name: 'home',
  data() {
    return {
      collapsed: false,
      openKeys: [],
      selectedKeys: []
    }
  },
  created() {
    if(this.$route.path==="/")this.$router.push(HOMEPATH);
  },
  methods: {
    menuClick: function ({key}) {
      let item= this.$_.find(this.permission.menu,{url:key});
      //是否外部打开
      if(item.internalOrExternal===1){
        window.open(key);
      }else{
        this.$router.push(key)
      }
    },
    loginout() {
      this.$store.dispatch('security/loginout').then((v) => {
        const currPath = this.$route.path
        this.$router.push({
          path: LONGINPATH,
          query: { redirect: currPath },
        })
      })
    },
  },
  computed: {
    ...mapState('security', ['permission']),
    ...mapGetters('security', ['menu']),
  },
  components: {
    SiderMenu,
    SystemInfo,
    XTabs,
  },
  watch: {
    '$route.path': {
      handler: function (oldVal,newVal) {
        if(oldVal==newVal)return;
        let menu = this.permission.menu
        let currItem = menu.filter((v) => v.url == this.$route.path)[0]
        if (!currItem) return;
        //如果不是主菜单
        if(currItem.routeFlag == 0) return;
        //选中
        this.selectedKeys = [this.$route.path];
        //打开菜单
        let res = []
        while (true) {
          currItem = menu.filter((v) => v.id == currItem.parentId)[0]
          currItem && res.push(currItem.url)
          if (currItem.parentId === null) break
        }
        this.openKeys = res;

      },
      immediate:true,
    },
  },
}
</script>
<style lang="less" scoped>
.container {
  height: 100vh;
}
.global-header {
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  height: 56px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  transform: translate3d(0, 0, 0);
  .trigger {
    display: inline-block;
    font-size: 14px;
    line-height: 56px;
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
