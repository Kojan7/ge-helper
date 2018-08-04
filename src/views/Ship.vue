/* eslint-disable vue/require-v-for-key */
<template>
  <div class="ship">
    <div class="selection">
      <select class="select" v-model.number="type">
        <option v-for="option in shipChoice.type"
          :value="option.value"
          :key="option.value">
          {{ option.text }}
        </option>
      </select>
      <select class="select" v-model.number="size">
        <option v-for="option in shipChoice.size"
          :value="option.value"
          :key="option.value">
          {{ option.text }}
        </option>
      </select>
      <select class="select" v-model.number="level">
        <option v-for="option in shipChoice.level"
          :value="option.value"
          :key="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>
    <ShipInfo :shipId="shipId"></ShipInfo>
  </div>
</template>

<script>
import ShipInfo from "@/components/ShipInfo.vue";
import { shipChoice } from "@/data/shipInfo.js";
export default {
  name: "ship",
  components: {
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
  max-width: 400px;
  margin: auto;
}
</style>
