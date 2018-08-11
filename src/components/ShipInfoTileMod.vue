<template>
  <div class="tile" :style="style">
    <svg :width="18 * zoom" :height="21.5 * zoom" draggable="false" viewBox="0 0 20 20">
      <polygon :style="imageStyle" points="10,1 18.0829,15 1.9171,15" style="stroke-width:1" />
    </svg>
    <div class="level" :style="levelStyle"> 2 </div>
  </div>
</template>

<script>
import { modChoice } from "@/data/modInfo.js";
export default {
  name: "ShipInfoTileMod",
  props: {
    mod: Object,
    padding: Object,
    zoom: Number
  },
  computed: {
    halfWidth: function() {
      return 10 * this.zoom;
    },
    aboutHeight: function() {
      return this.halfWidth * 26 / 15;
    },
    style: function() {
      return {
        top: this.padding.top + this.mod.coord[0] * this.aboutHeight + "px",
        right:
          this.padding.right +
          this.mod.coord[1] * this.halfWidth * 2 +
          (this.mod.coord[0] % 2 ? 0 : this.halfWidth) +
          "px"
      };
    },
    levelStyle: function() {
      return { fontSize: 5 * this.zoom + "px" };
    },
    modInfo() {
      return modChoice.item[this.mod.spec.item];
    },
    imageStyle() {
      return {
        fill: this.modInfo.fgColor,
        stroke: this.modInfo.bgColor
      };
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

.level {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
