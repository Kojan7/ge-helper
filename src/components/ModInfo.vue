<template>
  <div class='info'>
    <ModInfoEl
      v-for="el in modDesc"
      v-bind:el="el"
      v-bind:key="el.id"
      v-bind:elvalue="info[el.id]">
    </ModInfoEl>
  </div>
</template>

<script>
import ModInfoEl from '@/components/ModInfoEl.vue';

export default {
  name: 'ModInfo',
  components: {
    ModInfoEl,
  },
  props: {
    modId: Number,
  },
  computed: {
    component() {
      return this.$store.state.data.component;
    },
    modDesc() {
      return this.$store.state.data.modDesc;
    },
    info() {
      return this.component[this.modId];
    },
  },
};
</script>

<style scoped>
.info {
  box-sizing: border-box;
  background-color: var(--base-color);
  box-shadow: var(--elevation);
  border-radius: 3px;
  margin: 20px 0;
  padding: 5px 10px 5px 10px;
}
</style>
