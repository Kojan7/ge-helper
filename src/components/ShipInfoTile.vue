<template>
  <div class="tile"
    :style="style"
    @click="$emit('selected', xycoord)">
    <svg :width="17.321 * zoom" :height="20 * zoom" version="1.1" viewBox="0 0 17.321 20">
      <path d="m8.661 0.57735 8.1603 4.7113-1e-6 9.4226-8.1603 4.7113-8.1603-4.7113 2.5e-7 -9.4226z" fill="none" stroke="var(--dark-color)"/>
    </svg>
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
      return 8.161 * this.zoom;
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
    },
    xycoord() {
      return [this.coord[0],this.coord[1]];
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
.text {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
}
</style>
