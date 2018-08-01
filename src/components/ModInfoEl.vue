<template>
  <div class="el" v-if="elvalue > 0">
    <div class="name">{{ el.name }}</div>
    <div class="value">{{ output }}</div>
  </div>
</template>

<script>
export default {
  name: "ModInfoEl",
  props: {
    el: Object,
    elvalue: Number
  },
  computed: {
    output: function() {
      let elv = this.elvalue;
      if (typeof this.el.modifier !== "undefined") {
        elv = Math.round(elv / this.el.modifier * 1000) / 1000;
      }
      if (typeof this.el.suffix !== "undefined") {
        elv = elv + this.el.suffix;
      }
      return elv;
    }
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
