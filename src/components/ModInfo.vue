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
import ModInfoEl from "@/components/ModInfoEl.vue";
import { GD_Component } from "@/data/game.js";
import { modDesc } from "@/data/modInfo.js";
export default {
  name: "ModInfo",
  components: {
    ModInfoEl
  },
  props: {
    modId: Number
  },
  data: function() {
    return {
      modDesc
    };
  },
  computed: {
    info: function() {
      return GD_Component[this.modId];
    }
  }
};
</script>
<style scoped>
.info {
  box-sizing: border-box;
  background-color: #fafbfc;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: 5px;
  padding: 5px 10px 5px 10px;
}
</style>
