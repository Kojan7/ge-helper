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
  box-sizing: border-box;
  height: 38px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0 5px 0;
  padding: 5px;
  background-color: beige;
}
</style>
