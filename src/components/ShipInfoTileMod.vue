<template>
  <div class="tile"
    :style="style"
    @click="$emit('deleted', mod)">
    <svg v-if="mod[1] === 0" :width="256 * zoom" :height="256 * zoom" draggable="false" viewBox="0 0 256 256">
      <g v-if="mod[1] === 0"> <!-- S sized -->
        <!-- bed tile -->
        <path d="m128 5.7735 105.85 61.113v122.23l-105.85 61.113-105.85-61.113 4e-6 -122.23z" fill="#808080" stroke="#000" stroke-width="10"/>
        <!-- rail and laser -->
        <path v-if="mod[2] < 5" :style="imageStyle" transform="matrix(.54434 0 0 1 58.324 15.556)" d="m128 24.069 90.007 155.9h-180.01z" stroke-width="10"/>
        <!-- core -->
        <g v-else-if="mod[2] === 12">
          <path d="m128 24.776 89.395 51.612v103.22l-89.395 51.612-89.395-51.612 3e-6 -103.22z" fill="#47e1f1" stroke="#fdfefd" stroke-dasharray="46, 23" stroke-dashoffset="23" stroke-width="23"/>
          <circle cx="128" cy="128" r="58.676" fill="#ceffff" stroke-width="0"/>
        </g>
        <!-- armor -->
        <path v-else-if="mod[2] < 17 && mod[2] > 12" :style="imageStyle" d="m128 24.776 89.395 51.612v103.22l-89.395 51.612-89.395-51.612 3e-6 -103.22z" stroke-width="23"/>
        <!-- engine -->
        <g v-else-if="mod[2] === 18">
          <path transform="matrix(1.062 0 0 .81208 -7.9357 62.41)" d="m128 208.27-45.622-79.019h91.243z" fill="#fffff5" stroke-width="0"/>
          <path transform="matrix(1.173 0 0 1.3419 -22.148 -14.836)" d="m128 48.818 49.908 86.444h-99.817z" fill="#ddbc58" stroke="#000" stroke-width="7"/>
        </g>
        <!-- else -->
        <path v-else :style="imageStyle" d="m128 24.776 89.395 154.84h-178.79z" stroke-width="10"/>
      </g>
    </svg>
    <svg v-else :width="256 * zoom" :height="256 * zoom" draggable="false" viewBox="0 0 20 20">
      <!-- for M & L & M+ sized armors top tile -->
      <polygon
        v-if="mod[1] < 4 && mod[2] < 17 && mod[2] > 12"
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
      <span  v-if="mod[1] > 0 || (mod[2] > 4 && mod[2] < 9)">{{ modInfo.abbr }}<br></span>{{ modSize }}{{ mod[3] }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShipInfoTileMod',
  props: {
    mod: Array,
    padding: Object,
    zoom: Number
  },
  computed: {
    modChoice() {
      return this.$store.state.data.modChoice;
    },
    halfWidth() {
      return 120 * this.zoom;
    },
    aboutHeight() {
      return (this.halfWidth * 26) / 15;
    },
    style() {
      return {
        top: this.padding.top + this.mod[0][0] * this.aboutHeight + 'px',
        right:
          this.padding.right +
          this.mod[0][1] * this.halfWidth * 2 +
          (this.mod[0][0] % 2 ? 0 : this.halfWidth) +
          'px'
      };
    },
    levelStyle() {
      return {
        fontSize: 42 * this.zoom + 'px',
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
