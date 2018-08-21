<template>
  <div class="tile"
    :style="style"
    @click="$emit('deleted', mod)">
    <svg :width="17.321 * zoom" :height="20 * zoom" draggable="false" viewBox="0 0 20 20">
      <!-- for S sized armors -->
      <polygon
        v-if="mod[1] === 0 && mod[2] < 17 && mod[2] > 12"
        :style="imageStyle" style="stroke-width:1"
        points="10,0.5 18.1,5 18.1,15 10,19.5 1.9,15 1.9,5"/>
      <!-- for M & L & M+ sized armors top tile -->
      <polygon
        v-else-if="mod[1] < 4 && mod[2] < 17 && mod[2] > 12"
        :style="imageStyle" style="stroke-width:1"
        points="10,0.5 18.1,5 18.1,15 20.5,19.5 -0.5,19.5 1.9,15 1.9,5"/>
      <!-- for M & L sized armors bottom left -->
      <polygon
        v-else-if="mod[1] === 5 && mod[2] < 17 && mod[2] > 12"
        :style="imageStyle" style="stroke-width:1"
        points=" 10,0.5 22,-15 22,15 18.1,15 10,19.5 1.9,15 1.9,5"/>
      <!-- for M & L sized armors bottom right -->
      <polygon
        v-else-if="mod[1] === 6 && mod[2] < 17 && mod[2] > 12"
        :style="imageStyle" style="stroke-width:1"
        points=" 10,0.5 18.1,5 18.1,15 10,19.5 1.9,15 -2,15 -2,-15"/>

      <!-- for S sized shield -->
      <circle 
        v-else-if="mod[1] === 0 && mod[2] === 17"
        :style="imageStyle" style="stroke-width:1"
        cx="10" cy="10" r="8"/>
      <polygon v-else-if="mod[1] === 0" :style="imageStyle" points="10,1 18.0829,15 1.9171,15" style="stroke-width:1" />
      <!-- for all L+ internal tile -->
      <polygon v-else-if="mod[1] === 4" :style="imageStyle" points="-3,-3 -3,23 23,23 23,-3" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 5" :style="imageStyle" points="22,-19.7 22,15 1.9171,15" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 6" :style="imageStyle" points="-2,-19.7 18.0829,15 -2,15" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 7" :style="imageStyle" points="22,-19.7 22,22 -2.13,22" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 8" :style="imageStyle" points="-2,-19.7 22.14,22 -2,22" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 9" :style="imageStyle" points="-2,-2 22,-2 22,15 -2,15" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 10" :style="imageStyle" points="22,-20.3 22,40.3 5,10" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 11" :style="imageStyle" points="-2,-20.3 -2,40.3 15,10" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 12" :style="imageStyle" points="10,19 26.1658,-9 -6.1658,-9" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 13" :style="imageStyle" points="8,5 24,5 24,29 -6.1658,29" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 14" :style="imageStyle" points="-6,5 12,5 26.1658,29 -6,29" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 15" :style="imageStyle" points="-5,-6.3 22,-2 22,15 8.5,15" style="stroke-width:1" />
      <polygon v-else-if="mod[1] === 16" :style="imageStyle" points="-2,-2 25,-6.8 12,15 -2,15" style="stroke-width:1" />
      <polygon v-else :style="imageStyle" points="10,1 26.1658,29 -6.1658,29" style="stroke-width:1" />
    </svg>
    <div v-if="mod[1] < 5" class="level" :style="levelStyle">
      {{ modInfo.abbr }}<br>{{ modSize }}{{ mod[3] }}
    </div>
  </div>
</template>

<script>
import { modChoice } from "@/data/modInfo.js";
export default {
  name: "ShipInfoTileMod",
  props: {
    mod: Array,
    padding: Object,
    zoom: Number
  },
  computed: {
    halfWidth: function() {
      return 8.161 * this.zoom;
    },
    aboutHeight: function() {
      return this.halfWidth * 26 / 15;
    },
    style: function() {
      return {
        top: this.padding.top + this.mod[0][0] * this.aboutHeight + "px",
        right:
          this.padding.right +
          this.mod[0][1] * this.halfWidth * 2 +
          (this.mod[0][0] % 2 ? 0 : this.halfWidth) +
          "px"
      };
    },
    levelStyle: function() {
      return { 
        fontSize: 4 * this.zoom + "px",
        color: this.modInfo.textColor
      };
    },
    modInfo() {
      return modChoice.item[this.mod[2]];
    },
    modSize() {
      return modChoice.size[this.mod[1]].text;
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
