<template>
<div>
  <a-tabs
    :activeKey="$route.path"
    tab-position="top"
    class="home_tab"
    @tabClick="tabClick"
    @contextmenu.native.prevent="contextmenu"
  >
    <a-tab-pane v-for="(item, index) of data" :key="item.url">
      <template #tab>
        <span class="js_tab_pane" :data-index="index">
         {{ item.name}}
          <a-icon v-if="!isHomePage(item.url)" @click.stop="close(index)" class="close_icon" type="close"/>
        </span>
        
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
      ],
      contextmenuIndex:1,
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
      return key === HOMEPATH;
    },
    contextmenu(e) {
      this.$refs.contextmenu.visible = true;
      //找index
      //父找子
      let dom = e.target.querySelector(".js_tab_pane");
      if(dom){
        this.contextmenuIndex = dom.dataset.index*1;
      }else{
      //子找父
        let dom = closest(e.target,"js_tab_pane");
        this.contextmenuIndex = dom.dataset.index*1;
      }
    },
    onMenuSelect(key){
        // { key: '4', icon: 'reload', text: '刷 新' },
        // { key: '1', icon: 'arrow-left', text: '关闭左侧' },
        // { key: '2', icon: 'arrow-right', text: '关闭右侧' },
        // { key: '3', icon: 'close', text: '关闭其它' },
        let json = {
          1:"closeLeft",
          2:"closeRight",
          3:"closeOther",
          4:"reflash",
        }
        this[json[key]]();
    },
    closeLeft(){
      //排除首页,和第一个
      if(this.contextmenuIndex <= 1)return;
      //删除
      let tabs = [...this.tabs];
      let currIndex = tabs.indexOf(this.$route.path);
      let endtabs = tabs.slice(this.contextmenuIndex);
      this.$store.dispatch('tab/save', [tabs[0],...endtabs]);
      //是否需要指定当前
      if(this.contextmenuIndex>0&&currIndex<this.contextmenuIndex){
        this.$router.push(tabs[this.contextmenuIndex]);
      }
    },
    closeRight(){
          
      //删除
      let tabs = [...this.tabs];
      let currIndex = tabs.indexOf(this.$route.path);
      let stabs = tabs.slice(0,this.contextmenuIndex+1);
      this.$store.dispatch('tab/save', stabs);
      //是否需要指定当前
      if(currIndex>this.contextmenuIndex){
        this.$router.push(tabs[this.contextmenuIndex]);
      }
    },
    closeOther(){
      //删除
      let tabs = [...this.tabs];
      let currIndex = tabs.indexOf(this.$route.path);
      let tbsOther = [];
      if(0===this.contextmenuIndex){
        tbsOther = [tabs[this.contextmenuIndex]];
      }else{
        tbsOther = [tabs[0],tabs[this.contextmenuIndex]];
      }
      this.$store.dispatch('tab/save',tbsOther);
      //是否需要指定当前
      if(currIndex>0&&this.contextmenuIndex!=currIndex){
        this.$router.push(tabs[this.contextmenuIndex]);
      }
    },
    reflash(){
      //根据当前路获取实例getChildComponent(vueInstance,'/sys/role/list')
      let component = this.$utils.getChildComponent(this.$root,this.tabs[this.contextmenuIndex])
      //执行当前组件的created,mounted生命周期
      component.$options.created.map(v=>v.call(component));
      component.$options.mounted.map(v=>v.call(component));
    },
  },
}


function closest(dom,className){
  if(hasClass(dom,className)){
    return dom;
  }else{
    dom = dom.parentElement;
    return closest(dom,className);
  }
}

function hasClass(dom,className){
  return !!~Array.from(dom.classList).indexOf(className);
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