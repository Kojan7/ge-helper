<template>
  <div class="el" v-if="elvalue > 0">
    <div>{{ el.name }}</div>
    <div>{{ output }}</div>
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
  height: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px;
  padding: 5px;
  background-color: #d3dae3;
}
</style>
