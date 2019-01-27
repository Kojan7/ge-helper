<template>
  <div class="tile" :style="style">
    <svg :width="svgLength" :height="svgLength" version="1.1" viewBox="0 0 256 256">
      <text text-anchor="middle" x="128" y="128"
        alignment-baseline="middle" style="font: 128px sans-serif">
        {{ limit }}
      </text>
      <path
        d="m128 5.7735 105.85 61.113v122.23l-105.85 61.113-105.85-61.113 4e-6 -122.23z"
        fill="transparent" stroke="var(--text-color)" stroke-width="10"
        @click="$emit('selected', xycoord)"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'HullInfoTile',
  props: {
    coord: Array,
    padding: Object,
    zoom: Number,
  },
  computed: {
    hullLimit() {
      return this.$store.state.data.hullLimit;
    },
    halfWidth() {
      return 120 * this.zoom;
    },
    aboutHeight() {
      return (this.halfWidth * 26) / 15;
    },
    svgLength() {
      return 256 * this.zoom;
    },
    style() {
      return {
        top: `${this.padding.top + (this.coord[0] * this.aboutHeight)}px`,
        right:
          `${this.padding.right +
          (this.coord[1] * this.halfWidth * 2) +
          (this.coord[0] % 2 ? 0 : this.halfWidth)
          }px`,
      };
    },
    limit() {
      return this.hullLimit[this.coord[2]];
    },
    xycoord() {
      return [this.coord[0], this.coord[1]];
    },
  },
};
</script>

<style scoped>
.tile {
  user-select: none;
  position: absolute;
  display: inline-block;
  cursor: pointer;
}
</style>
