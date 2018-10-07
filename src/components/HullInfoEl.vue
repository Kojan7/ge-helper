<template>
  <div class="el" v-if="elvalue > 0">
    {{ $i18n.locale === "en" ? el.titleen : el.title }}: {{ elvalue }}
  </div>
</template>

<script>
export default {
  name: 'HullInfoEl',
  props: {
    el: Object,
    elvalue: Number,
  },
};
</script>

<style scoped>
.el {
  font-size: 14px;
  display: flex;
  align-items: center;
  margin: 4px 0 4px 0;
}
</style>
