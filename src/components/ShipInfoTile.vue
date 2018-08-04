<template>
  <div class="tile" :style="style">
    <img draggable="false" src="@/assets/tile.svg" :height="20 * zoom">
    <div class="text" :style="textStyle">{{ limit }}</div>
  </div>
</template>

<script>
import { shipLimit } from "@/data/shipInfo.js";
export default {
  name: "ShipInfoTile",
  props: {
    coord: Array,
    padding: Object,
    zoom: Number
  },
  computed: {
    halfWidth: function() {
      return 7.5 * this.zoom;
    },
    aboutHeight: function() {
      return this.halfWidth * 26 / 15;
    },
    style: function() {
      return {
        top: this.padding.top + this.coord[0] * this.aboutHeight + "px",
        right:
          this.padding.right +
          this.coord[1] * this.halfWidth * 2 +
          (this.coord[0] % 2 ? 0 : this.halfWidth) +
          "px"
      };
    },
    textStyle: function() {
      return { fontSize: 10 * this.zoom + "px" };
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
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
}
</style>
