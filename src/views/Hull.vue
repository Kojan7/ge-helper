<template>
  <div class="hull">
    <app-radio-button class="first"
      :options="hullChoice.type"
      v-model="type"/>
    <app-radio-button
      :options="hullChoice.size"
      v-model="size"/>
    <app-slider
      :text="$t('level')"
      :min=1
      :max=maxLevel
      v-model="level"/>
    <hull-info :hullId="hullId"/>
  </div>
</template>

<script>
import AppRadioButton from '@/components/AppRadioButton.vue';
import AppSlider from '@/components/AppSlider.vue';
import HullInfo from '@/components/HullInfo.vue';

export default {
  name: 'hull',
  components: {
    AppRadioButton,
    AppSlider,
    HullInfo,
  },
  data() {
    return {
      type: 0,
      size: 0,
      level: 1,
    };
  },
  computed: {
    maxLevel() {
      return this.$store.state.data.maxHullLevel;
    },
    hullChoice() {
      return this.$store.state.data.hullChoice;
    },
    hullId() {
      return (this.size * this.maxLevel * 7) + (this.type * this.maxLevel) + this.level;
    },
  },
};
</script>
<style scoped>
.lbl-group {
  box-shadow: none;
  border-radius: 0;
}
.slider {
  box-shadow: none;
  border-radius: 0 0 3px 3px;
}
.first {
  border-radius: 3px 3px 0 0;
}
</style>
