<template>
  <div class="ship">
    <div class="selection">
      <app-radio-button
        :options="shipChoice.type"
        @chose="type=$event">>
      </app-radio-button>
    </div>
    <div class="selection">
      <app-radio-button
        :options="shipChoice.size"
        @chose="size=$event">>
      </app-radio-button>
    </div>
    <div class="cont-card">
      {{ $t('level') }}{{ this.level }}
      <input type="range" v-model.number="level" min="1" max="12" step="1"/>
    </div>
    <ShipInfo :shipId="shipId"></ShipInfo>
  </div>
</template>

<script>
import AppRadioButton from "@/components/AppRadioButton.vue"
import ShipInfo from "@/components/ShipInfo.vue";
import { shipChoice } from "@/data/shipInfo.js";
export default {
  name: "ship",
  components: {
    AppRadioButton,
    ShipInfo
  },
  data: function() {
    return {
      type: 0,
      size: 0,
      level: 1,
      shipChoice
    };
  },
  computed: {
    shipId: function() {
      return this.size * 84 + this.type * 12 + this.level;
    }
  }
};
</script>
<style scoped>
.ship {
  min-width: 300px;
  max-width: 600px;
  margin: auto;
}
</style>
<i18n>
{
  "en": {
    "level": "Level: "
  },
  "zh": {
    "level": "等级："
  }
}
</i18n>