<template>
  <div class='info'>
    <hull-info-buff class="buff" v-bind:buffs="hull[12]"></hull-info-buff>
    <hull-info-el
      v-for="el in hullDesc"
      :el="el"
      :key="el.id"
      :elvalue="hull[el.value]">
    </hull-info-el>
    <hull-info-tile
      v-for="tile in layout"
      :coord="tile"
      :key="layout.indexOf(tile)"
      :padding="{top: 50, right: 15}"
      :zoom="0.06">
    </hull-info-tile>
  </div>
</template>
<script>
import HullInfoEl from '@/components/HullInfoEl.vue';
import HullInfoBuff from '@/components/HullInfoBuff.vue';
import HullInfoTile from '@/components/HullInfoTile.vue';

export default {
  name: 'HullInfo',
  props: {
    hullId: Number,
  },
  components: {
    HullInfoBuff,
    HullInfoEl,
    HullInfoTile,
  },
  computed: {
    hulls() {
      return this.$store.state.data.hull;
    },
    tech() {
      return this.$store.state.data.tech;
    },
    hullDesc() {
      return this.$store.state.data.hullDesc;
    },
    hull() {
      return this.hulls[this.hullId];
    },
    layout() {
      if (this.hull[1] < 36) {
        return this.tech[this.hull[1]][11].slice(0, this.hull[6]);
      } // workaround for titans
      return this.tech[this.hull[1] - 61][11].slice(0, this.hull[6]);
    },
  },
};
</script>
<style scoped>
.info {
  position: relative;
  margin: 20px 0;
  padding: 5px 10px 5px 10px;
  background-color: var(--base-color);
  box-shadow: var(--elevation);
  border-radius: 3px;
  height: 540px;
}
.buff {
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
