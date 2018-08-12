<template>
  <div class="tile"
    :style="style"
    @click="$emit('deleted', mod)">
    <svg :width="20 * zoom" :height="21.5 * zoom" draggable="false" viewBox="0 0 20 20">
      <polygon v-if="mod.spec.size === 0" :style="imageStyle" points="10,1 18.0829,15 1.9171,15" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 4" :style="imageStyle" points="-3,-3 -3,23 23,23 23,-3" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 5" :style="imageStyle" points="22,-19.7 22,15 1.9171,15" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 6" :style="imageStyle" points="-2,-19.7 18.0829,15 -2,15" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 7" :style="imageStyle" points="22,-19.7 22,22 -2.13,22" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 8" :style="imageStyle" points="-2,-19.7 22.14,22 -2,22" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 9" :style="imageStyle" points="-2,-2 22,-2 22,15 -2,15" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 10" :style="imageStyle" points="22,-20.3 22,40.3 5,10" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 11" :style="imageStyle" points="-2,-20.3 -2,40.3 15,10" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 12" :style="imageStyle" points="10,19 26.1658,-9 -6.1658,-9" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 13" :style="imageStyle" points="8,5 24,5 24,29 -6.1658,29" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 14" :style="imageStyle" points="-6,5 12,5 26.1658,29 -6,29" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 15" :style="imageStyle" points="-5,-6.3 22,-2 22,15 8.5,15" style="stroke-width:1" />
      <polygon v-else-if="mod.spec.size === 16" :style="imageStyle" points="-2,-2 25,-6.8 12,15 -2,15" style="stroke-width:1" />
      <polygon v-else :style="imageStyle" points="10,1 26.1658,29 -6.1658,29" style="stroke-width:1" />
    </svg>
    <div v-if="mod.spec.size < 5" class="level" :style="levelStyle">{{ modSize }}{{ mod.spec.level }}</div>
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
