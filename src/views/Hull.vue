<template>
  <v-layout class="main-view" column justify-center>
      <v-flex d-flex elevation-2 align-center class="row padding margin-top">
        <v-slider
          v-model="level"
          :label="$t('level')"
          :min="1"
          :max="12"
          step="1"
          thumb-label="always"
          always-dirty>
        </v-slider>
      </v-flex>
      <v-btn-toggle class="btn-toggle row" mandatory v-model.number="type">
        <v-btn flat d-flex class="btn-toggle row"
          v-for="option in shipChoice.type"
          :key="option.value"
          :value="option.value">
          {{ $i18n.locale === "en" ? option.text : option.textcn }}
        </v-btn>
      </v-btn-toggle>
      <v-btn-toggle class="btn-toggle row" mandatory v-model.number="size">
        <v-btn flat d-flex class="btn-toggle row"
          v-for="option in shipChoice.size"
          :key="option.value"
          :value="option.value">
          {{ $i18n.locale === "en" ? option.text : option.textcn }}
        </v-btn>
      </v-btn-toggle>
      <ship-info :shipId="shipId"></ship-info>
  </v-layout>
</template>

<script>
import ShipInfo from '@/components/ShipInfo.vue';
export default {
  name: 'ship',
  components: {
    ShipInfo
  },
  data() {
    return {
      type: 0,
      size: 0,
      level: 1
    };
  },
  computed: {
    shipChoice() {
      return this.$store.state.data.shipChoice;
    },
    shipId() {
      return this.size * 84 + this.type * 12 + this.level;
    }
  }
};
</script>
<style scoped>
.btn-toggle {
  overflow-x: auto;
  overflow-y: hidden;
  flex-grow: 1;
  flex-basis: 1;
}
.row {
  height: 48px;
}
.padding {
  padding: 0 12px;
  background-color: white;
}
</style>
