<template>
  <div class='info'>
    <ModInfoEl
      v-for="el in modDesc"
      v-bind:el="el"
      v-bind:key="el.id"
      v-bind:elvalue="info[el.id]">
    </ModInfoEl>
    <span v-if="Number.isNaN(modId)">
      {{ $t('errors.nullModule') }}
    </span>
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
    modules() {
      return this.$store.state.data.module;
    },
    modDesc() {
      return this.$store.state.data.modDesc;
    },
    info() {
      if (Number.isNaN(this.modId)) {
        // use a 0 filled array for module that doesn't exist
        return new Array(99).fill(0);
      }
      return this.modules[this.modId];
    },
  },
};
</script>

<style scoped>
.info {
  box-sizing: border-box;
  background-color: var(--base-color);
  box-shadow: var(--elevation);
  margin: 20px 0;
  padding: 5px 10px 5px 10px;
}
</style>
