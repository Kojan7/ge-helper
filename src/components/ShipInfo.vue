<template>
  <div class='info'>
    <ShipInfoTile
      v-for="tile in layout"
      v-bind:coord="tile"
      v-bind:key="layout.indexOf(tile)">
    </ShipInfoTile>
  </div>
</template>
<script>
import ShipInfoTile from "@/components/ShipInfoTile.vue";
import { GD_Shipbody, GD_Technology } from "@/data/game.js";
export default {
  name: "ShipInfo",
  props: {
    shipId: Number
  },
  components: {
    ShipInfoTile
  },
  data: function() {
    return {
      tiles: Array
    };
  },
  computed: {
    ship: function() {
      return GD_Shipbody[this.shipId];
    },
    layout: function() {
      if (this.ship[1] < 36) {
        return GD_Technology[this.ship[1]][11].slice(0, this.ship[6]);
      } else {
        // workaround for titans
        return GD_Technology[this.ship[1] - 61][11].slice(0, this.ship[6]);
      }
    }
  }
};
</script>
<style scoped>
.info {
  position: relative;
  margin: 5px;
  background-color: #d3dae3;
  height: 500px;
}
</style>
