<template>
  <div>test</div>
</template>

<script>
export default {
  async asyncData(content) {
   //console.log(content.app);
  },
  fetch({ store, params }){
    //state
    // let token = store.state.security.token;
    // console.log(token);
    // store.dispatch("security/login",666);WW
    // let token2 = store.security.token;
    // console.log(token2);
  },
  beforeMount(){
   // window.$nuxt.setLayout('home');
  },
  mounted(){
    //console.log(this.$nuxt);
  },
  created(){
    // console.log("created",this.$http);
    // console.log(window.$nuxt);
  }
}
</script>

<style>

</style>