<template>
  <div class="el" v-if="elvalue !== 0" :style="firstEl">
    <div>{{ $i18n.locale === "en" ? el.nameen : el.name }}</div>
    <div>{{ output }}</div>
  </div>
</template>

<script>
export default {
  name: 'ModInfoEl',
  props: {
    el: Object,
    elvalue: Number,
  },
  computed: {
    output() {
      let elv = this.elvalue;
      if (typeof this.el.modifier !== 'undefined') {
        elv = Math.round((elv / this.el.modifier) * 1000) / 1000;
      }
      if (typeof this.el.suffix !== 'undefined') {
        elv += this.el.suffix;
      }
      return elv;
    },
    firstEl() {
      if (this.el.name === 'HP') {
        return 'border-top: none';
      }
      return '';
    },
  },
};
</script>

<style scoped>
.el {
  font-size: 14px;
  height: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--alt-text-color);
}
</style>
