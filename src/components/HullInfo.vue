<template>
  <div class='info'>
    <hull-info-buff class="buff" v-bind:buffs="ship[12]"></hull-info-buff>
    <hull-info-el
      v-for="el in shipDesc"
      :el="el"
      :key="el.id"
      :elvalue="ship[el.shipIndex]">
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
    shipId: Number,
  },
  components: {
    HullInfoBuff,
    HullInfoEl,
    HullInfoTile,
  },
  computed: {
    shipbody() {
      return this.$store.state.data.shipbody;
    },
    technology() {
      return this.$store.state.data.technology;
    },
    shipDesc() {
      return this.$store.state.data.shipDesc;
    },
    ship() {
      return this.shipbody[this.shipId];
    },
    layout() {
      if (this.ship[1] < 36) {
        return this.technology[this.ship[1]][11].slice(0, this.ship[6]);
      } // workaround for titans
      return this.technology[this.ship[1] - 61][11].slice(0, this.ship[6]);
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
