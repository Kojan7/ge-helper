<template>
  <v-card>
    <v-card-text>
      <ModInfoEl
        v-for="el in modDesc"
        v-bind:el="el"
        v-bind:key="el.id"
        v-bind:elvalue="info[el.id]">
      </ModInfoEl>
    </v-card-text>
  </v-card>
</template>

<script>
import ModInfoEl from '@/components/ModInfoEl.vue';
export default {
  name: 'ModInfo',
  components: {
    ModInfoEl
  },
  props: {
    modId: Number
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
    }
  }
};
</script>
