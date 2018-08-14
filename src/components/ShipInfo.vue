<template>
  <div class='info'>
    <ShipBuff class="buff" v-bind:buffs="ship[12]"></ShipBuff>
    <ShipInfoEl
      v-for="el in shipDesc"
      :el="el"
      :key="el.id"
      :elvalue="ship[el.shipIndex]">
    </ShipInfoEl>
    <ShipInfoTile
      v-for="tile in layout"
      :coord="tile"
      :key="layout.indexOf(tile)"
      :padding="{top: 30, right: 15}"
      :zoom="1">
    </ShipInfoTile>
  </div>
</template>
<script>
import ShipInfoEl from "@/components/ShipInfoEl.vue";
import ShipBuff from "@/components/ShipBuff.vue";
import ShipInfoTile from "@/components/ShipInfoTile.vue";
import { GD_Shipbody, GD_Technology } from "@/data/game.js";
import { shipDesc } from "@/data/shipInfo.js";

export default {
  name: "ShipInfo",
  props: {
    shipId: Number
  },
  components: {
    ShipBuff,
    ShipInfoEl,
    ShipInfoTile
  },
  data: function() {
    return {
      shipDesc
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
  margin: 10px 5px 5px 5px;
  padding: 5px 10px 5px 10px;
  background-color: var(--bg-color);
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
  height: 540px;
}
.buff {
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
