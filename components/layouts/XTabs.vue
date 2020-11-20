<template>
<div>
  <a-tabs
    :activeKey="$route.path"
    tab-position="top"
    class="home_tab"
    @tabClick="tabClick"
    @contextmenu.native.stop.prevent="contextmenu"
  >
    <a-tab-pane v-for="(item, index) of data" :key="item.url">
      <template #tab>
        <span class="js_tab_pane" :data-index="index">
         {{ item.name}}
        </span>
        <a-icon v-if="!isHomePage(item.url)" @click.stop="close(index)" class="close_icon" type="close"/>
        
      </template>
    </a-tab-pane>
  </a-tabs>
  <contextmenu ref="contextmenu" :itemList="menuItemList" style="z-index: 9999;" @select="onMenuSelect"/>
</div>
  
</template>

<script>
import { mapState } from 'Vuex'
import { HOMEPATH } from '@/assets/config/appConfig.js';
import contextmenu from './Contextmenu'

export default {
  components:{contextmenu},
  name: 'homeTab',
  data() {
    return {
      menuItemList: [
        { key: '4', icon: 'reload', text: '刷 新' },
        { key: '1', icon: 'arrow-left', text: '关闭左侧' },
        { key: '2', icon: 'arrow-right', text: '关闭右侧' },
        { key: '3', icon: 'close', text: '关闭其它' },
      ]
    }
  },
  computed: {
    ...mapState('security', ['permission']),
    ...mapState('tab', ['tabs']),
    data() {
      //根据key去全局数据中查找对应的菜单名。
      return this.tabs.map((v) => {
        return this.permission.menu.filter((p) => v === p.url)[0]
      })
    },
  },
  methods: {
    tabClick(val) {
      this.$router.push(val)
    },
    close(index) {
      let tab = [...this.tabs]
      tab.splice(index, 1)
      this.$store.dispatch('tab/save', tab)
      this.$router.push(tab[index - 1])
    },
    isHomePage(key) {
      return key === HOMEPATH
    },
    contextmenu(e) {
      this.$refs.contextmenu.visible = true;
      console.log(e);
    },
    onMenuSelect(){},
  },
}
</script>

<style scoped>
.home_tab {
  position: static;
}
.home_tab >>> .ant-tabs-bar {
  margin: 0;
  background: #fff;
  padding: 0 15px;
}
.home_tab >>> .ant-tabs-nav .ant-tabs-tab {
  margin: 0;
  padding-right: 30px;
}
.home_tab >>> .ant-tabs-nav .ant-tabs-tab:hover .close_icon {
  display: flex;
  opacity: 1;
}
.home_tab >>> .ant-tabs-nav .ant-tabs-tab .close_icon {
  display: none;
  opacity: 0;
  position: absolute;
  width: 16px;
  height: 100%;
  font-size: 12px;
  right: 5px;
  top: 0;
  transition: transform 0.3s linear;
  margin: 0;
  align-items: center;
  justify-content: center;
}
.home_tab >>> .ant-tabs-nav .ant-tabs-tab .close_icon:hover {
  transform: rotate(180deg);
}
</style>