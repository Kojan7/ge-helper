<template>
  <v-card class="sinfo">
    <v-card-text>
      <ship-info-buff class="buff" v-bind:buffs="ship[12]"></ship-info-buff>
      <ship-info-el
        v-for="el in shipDesc"
        :el="el"
        :key="el.id"
        :elvalue="ship[el.shipIndex]">
      </ship-info-el>
      <ship-info-tile
        v-for="tile in layout"
        :coord="tile"
        :key="layout.indexOf(tile)"
        :padding="{top: 50, right: 15}"
        :zoom="0.08">
      </ship-info-tile>
    </v-card-text>
  </v-card>
</template>
<script>
import ShipInfoEl from '@/components/ShipInfoEl.vue';
import ShipInfoBuff from '@/components/ShipInfoBuff.vue';
import ShipInfoTile from '@/components/ShipInfoTile.vue';

export default {
  name: 'ShipInfo',
  props: {
    shipId: Number
  },
  components: {
    ShipInfoBuff,
    ShipInfoEl,
    ShipInfoTile
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
      } else {
        // workaround for titans
        return this.technology[this.ship[1] - 61][11].slice(0, this.ship[6]);
      }
    }
  }
};
</script>
<style scoped>
.sinfo {
  height: 540px;
  margin-top: 28px;
}
.buff {
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
