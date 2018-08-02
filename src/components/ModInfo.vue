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
  background-color: #d3dae3;
  margin: 5px;
  padding: 5px;
}
</style>
