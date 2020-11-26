<template>
  <div> API测试</div>
</template>

<script>
export default {
    created() {
        console.log(this.$http2.user.list());
    }
}
</script>

<style>

</style>