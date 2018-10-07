<template>
  <div class="tile"
    :style="style"
    @click="$emit('selected', xycoord)">
    <svg :width="256*zoom" :height="256*zoom" version="1.1" viewBox="0 0 256 256">
      <path
        d="m128 5.7735 105.85 61.113v122.23l-105.85 61.113-105.85-61.113 4e-6 -122.23z"
        fill="none" stroke="var(--text-color)" stroke-width="10"/>
    </svg>
    <div class="text" :style="textStyle">{{ limit }}</div>
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
    shipLimit() {
      return this.$store.state.data.shipLimit;
    },
    halfWidth() {
      return 120 * this.zoom;
    },
    aboutHeight() {
      return (this.halfWidth * 26) / 15;
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
    textStyle() {
      return { fontSize: `${180 * this.zoom}px` };
    },
    limit() {
      return this.shipLimit[this.coord[2]];
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
.text {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
}
</style>
