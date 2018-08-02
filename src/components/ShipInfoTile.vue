<template>
<div class="tile" :style="style">
  <img draggable="false" src="@/assets/tile.svg">
</div>
</template>

<script>
export default {
  name: "ShipInfoTile",
  props: {
    coord: Array
  },
  computed: {
    style: function() {
      return {
        // 15 is padding
        top: 15 + this.coord[0]*13 + "px",
        right: 15 + this.coord[1]*15 + (this.coord[0]%2?0:7.5) + "px"
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
</style>
