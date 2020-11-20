<!--recommend use functional component-->
<template functional>
  <a-sub-menu :key="props.menuInfo.url">
    <span slot="title">
      <a-icon v-if="props.menuInfo.icon" :type="props.menuInfo.icon" /><span>{{ props.menuInfo.name }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">

      <a-menu-item v-if="!item.children" :key="item.url">
        <span>{{ item.name }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.url" :menu-info="item" />

    </template>
  </a-sub-menu>
</template>

<script>
export default {
  name: 'subMenu',
  props: ['menuInfo'],
}
</script>