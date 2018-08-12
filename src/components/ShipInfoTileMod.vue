<template>
  <div class="tile"
    :style="style"
    @click="$emit('deleted', mod)">
    <svg :width="18 * zoom" :height="21.5 * zoom" draggable="false" viewBox="0 0 20 20">
      <polygon :style="imageStyle" points="10,1 18.0829,15 1.9171,15" style="stroke-width:1" />
    </svg>
    <div class="level" :style="levelStyle">{{ modSize }}{{ mod.spec.level }}</div>
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
      return { fontSize: 4 * this.zoom + "px" };
    },
    modInfo() {
      return modChoice.item[this.mod.spec.item];
    },
    modSize() {
      return modChoice.size[this.mod.spec.size].text;
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
  cursor: pointer;
}

.level {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -60%);
}
</style>
