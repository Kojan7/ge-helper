<template>
  <div class="module">
    <div class="selection">
      <app-radio-button
        :options="modChoice.size"
        @chose="size=$event">
      </app-radio-button>
    </div>
    <div class="selection">
      <select class="select" v-model.number="item">
        <option v-for="option in modChoice.item"
          :value="option.value"
          :key="option.value">
          {{ $i18n.locale === "en" ? option.texten : option.text }}
        </option>
      </select>
    </div>
    <app-slider
      @input="level=$event"
      :text="$t('level')"
      :min=1
      :max=12
      :value="level">
    </app-slider>
    <ModInfo :modId="modId"></ModInfo>
  </div>
</template>

<script>
import AppRadioButton from "@/components/AppRadioButton.vue"
import AppSlider from "@/components/AppSlider.vue"
import ModInfo from "@/components/ModInfo.vue";
import { mRetro, lRetro, modChoice } from "@/data/modInfo.js";
export default {
  name: "module",
  components: {
    AppRadioButton,
    AppSlider,
    ModInfo
  },
  data: function() {
    return {
      size: 0,
      level: 1,
      item: 0,
      modChoice
    };
  },
  computed: {
    modId: function() {
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
        itemCode = mRetro[this.item];
      } else if (this.size === 4) {
        itemCode = lRetro[this.item];
      }
      return itemCode * 12 + this.level;
    }
  }
};
</script>
<style scoped>
.module {
  min-width: 300px;
  max-width: 400px;
  margin: auto;
}
</style>