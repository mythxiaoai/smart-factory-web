预览

<template>
  <div class="preview">
    <div class="selectTitle">
      <a-radio-group
        v-model="$store.state.online.preAction"
        class="sleectPre"
        button-style="solid"
        @change="change"
      >
        <a-radio-button :value="1"> 表单 </a-radio-button>
        <a-radio-button :value="2"> 表格 </a-radio-button>
      </a-radio-group>
    </div>
    <div class="scoll">
      <div class="body">
        <div class="box form" v-show="$store.state.online.preAction == 1">
          <preForm></preForm>
        </div>
        <div
          class="box table"
          v-show="$store.state.online.preAction == 2"
        >
          <preTable></preTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import preForm from './preForm'
import preTable from './preTable'

export default {
  components: {
    preForm,
    preTable
  },
  async asyncData(content) {},
  fetch({ store, params }) {},
  created() {},
  mounted() {},
  data: function () {
    return {
    
    }
  },
  methods: {
   change(val){
     if(this.$store.state.online.preAction==2){
      this.$store.state.online.action = 3;
     }else{
       this.$store.state.online.action = 2;
     }
   }
  },
  computed: {},
  watch: {
   
  },
}
</script>

<style scoped lang="less">
.preview {
  height: 100%;
  .selectTitle {
    display: flex;
    height: 45px;
    align-items: center;
    justify-content: center;
  }
  .scoll {
    height: calc(100% - 45px);
    margin-right: -17px;
    overflow-y: auto;
  }
  .body {
    height: 100%;
    width: 100%;
    padding-right: 17px;
    .box{
      height: 100%;
      width: 100%;
    }
  }
}

</style>
<style scoped>
>>> .ghost {
  background: rgb(248, 238, 238) !important;
}
>>> .ghost.item {
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
