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
      <v-btn-toggle class="btn-toggle row" mandatory v-model.number="size">
        <v-btn flat d-flex class="btn-toggle row"
          v-for="option in modChoice.size"
          :key="option.value"
          :value="option.value">
          {{ $i18n.locale === "en" ? option.texten : option.text }}
        </v-btn>
      </v-btn-toggle>
      <v-flex d-flex>
        <v-select
          v-model.number="item"
          :items="$i18n.locale === 'en' ? modChoice.item : modChoice.itemcn"
          solo>
        </v-select>
      </v-flex>
    <ModInfo :modId="modId"></ModInfo>
  </v-layout>
</template>

<script>
import ModInfo from '@/components/ModInfo.vue';
export default {
  name: 'module',
  components: {
    ModInfo
  },
  data() {
    return {
      size: 0,
      level: 1,
      item: 0
    };
  },
  computed: {
    mRetro() {
      return this.$store.state.data.mRetro;
    },
    lRetro() {
      return this.$store.state.data.lRetro;
    },
    modChoice() {
      return this.$store.state.data.modChoice;
    },
    modId() {
      let itemCode;
      if (this.size <= 2) {
        if (this.item <= 2) {
          itemCode = this.item + this.size * 3; // railguns
        } else if (this.item <= 4) {
          itemCode = 6 + this.item + this.size * 2; // lasers
        } else if (this.item <= 8) {
          itemCode = 10 + this.item + this.size * 4; // launchers
        } else if (this.item <= 10) {
          itemCode = 18 + this.item + this.size * 2; // PDL
        } else if (this.item <= 12) {
          itemCode = 3 * this.item + this.size; // miners + cores
        } else if (this.item <= 16) {
          itemCode = 26 + this.item + this.size * 4; // armors
        } else {
          itemCode = 3 * this.item + this.size;
        }
      } else if (this.size === 3) {
        itemCode = this.mRetro[this.item];
      } else if (this.size === 4) {
        itemCode = this.lRetro[this.item];
      }
      return itemCode * 12 + this.level;
    }
  }
};
</script>
<style scoped>
.btn-toggle {
  width: 100%;
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
