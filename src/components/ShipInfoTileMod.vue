<template>
  <div class="tile" :style="style">
    <svg :height="20 * zoom" :width="20 * zoom" draggable="false" viewBox="0 0 20 20">
      <polygon class="image" points="10,3 15.7735,13 4.2265,13" style="stroke-width:1" />
    </svg>
    <div class="level" :style="levelStyle"> 2 </div>
  </div>
</template>

<script>
export default {
  name: "ShipInfoTileMod",
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
    levelStyle: function() {
      return { fontSize: 5 * this.zoom + "px" };
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

.image {
  fill: #ac423e;
  stroke: #000000;
}
</style>
