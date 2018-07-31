<template>
  <div class="el" v-if="elv > 0">
    <div class="name">{{ el.name }}</div>
    <div class="value">{{ elv }}</div>
  </div>
</template>

<script>
export default {
  name: "ModInfoEl",
  props: {
    el: Object,
    elv: Number
  }
};
</script>

<style scoped>
  .el {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }
</style>
