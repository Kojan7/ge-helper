<template>
  <div class="el" v-if="elvalue > 0">
    {{ el.title }}: {{ elvalue }}
  </div>
</template>

<script>
export default {
  name: "ShipInfoEl",
  props: {
    el: Object,
    elvalue: Number
  }
};
</script>

<style scoped>
.el {
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
