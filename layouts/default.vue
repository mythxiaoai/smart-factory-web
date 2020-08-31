<template>
  <a-config-provider :locale="locale">
    <div id="home-layout" :class="device">
      <home></home>
    </div>
  </a-config-provider>
</template>
<script>
import Home from '@/layouts/home.vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      locale: zhCN,
    }
  },
  methods: {

  },
  computed: {
    ...mapState({
      device: (state) => state.app.device,
    }),
  },
  components: {
    Home,
  },
}
</script>
<style lang="less" scoped>
#home-layout {
  min-height: 100vh !important;
  overflow-x: hidden;
}
</style>
