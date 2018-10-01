<template>
<div class="iframe-cont">
  <iframe :src="plugins[$route.params.index].src" width="100%"></iframe>
</div>
</template>
<script>
export default {
  name: 'plugins',
  computed: {
    plugins() {
      return this.$store.state.plugins
    }
  }
}
</script>
<style scoped>
.iframe-cont {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 24px;
  overflow: hidden;
}
</style>
