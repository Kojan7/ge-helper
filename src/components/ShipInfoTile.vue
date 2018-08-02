<template>
  <div class="tile" :style="style">
    <img draggable="false" src="@/assets/tile.svg">
    <div class="text">{{ limit }}</div>
  </div>
</template>

<script>
import { shipLimit } from "@/data/shipInfo.js";
export default {
  name: "ShipInfoTile",
  props: {
    coord: Array
  },
  computed: {
    style: function() {
      return {
        // 30 and 15 are paddings
        top: 30 + this.coord[0] * 13 + "px",
        right: 15 + this.coord[1] * 15 + (this.coord[0] % 2 ? 0 : 7.5) + "px"
      };
    },
    limit: function() {
      return shipLimit[this.coord[2]];
    }
  }
};
</script>

<style scoped>
.tile {
  user-select: none;
  position: absolute;
  display: inline-block;
}
.text {
  font-size: 10px;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
}
</style>
