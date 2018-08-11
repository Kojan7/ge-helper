<template>
  <div class="tile" :style="style">
    <svg :width="18 * zoom" :height="21.5 * zoom" draggable="false" xmlns="http://www.w3.org/2000/svg" viewBox="15 15 170 190">
      <polygon style="fill:none;stroke:#263238;stroke-width:8px" points="183,158 183,62 100,14 17,62 17,158 100,206 183,158"/>
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
      return 10 * this.zoom;
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
