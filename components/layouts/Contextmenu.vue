<template>
  <a-menu :style="style" class="contextmenu" v-show="visible" @click="handleClick" :selectedKeys="selectedKeys">
    <a-menu-item role="menuitem" :key="item.key" v-for="item in itemList">
      <a-icon role="menuitemicon" v-if="item.icon" :type="item.icon" />{{ item.text }}
    </a-menu-item>
  </a-menu>
</template>

<script>
export default {
  name: 'Contextmenu',
  props: {
    itemList: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data () {
    return {
      left: 0,
      top: 0,
      target: null,
      selectedKeys: [],
      visible:false,
    }
  },
  computed: {
    style () {
      return {
        left: this.left + 'px',
        top: this.top + 'px'
      }
    }
  },
  created () {
  },
  methods: {
    closeMenu (e) {
      if (['menuitemicon', 'menuitem'].indexOf(e.target.getAttribute('role')) < 0) {
        this.visible = false
      }
    },
    setPosition (e) {
      this.left = e.clientX
      this.top = e.clientY
      this.target = e.target
    },
    handleClick ({key}) {
      this.$emit('select', key)
      this.visible = false
    }
  },
  watch: {
    visible(val){
      if(val){
        window.addEventListener('contextmenu',this.setPosition);
        window.addEventListener('mousedown',this.closeMenu);
      }else{
        window.removeEventListener('contextmenu',this.setPosition);
        window.removeEventListener('mousedown',this.closeMenu);
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .contextmenu{
    position: fixed;
    z-index: 1;
    border: 1px solid #9e9e9e;
    border-radius: 4px;
    box-shadow: 2px 2px 10px #aaaaaa !important;
  }
</style>
