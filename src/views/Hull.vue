<template>
  <div class="hull">
    <app-radio-button class="first"
      :options="shipChoice.type"
      @chose="type=$event"/>
    <app-radio-button
      :options="shipChoice.size"
      @chose="size=$event"/>
    <app-slider
      @input="level=$event"
      :text="$t('level')"
      :min=1
      :max=12
      :value="level"/>
    <hull-info :shipId="shipId"/>
  </div>
</template>

<script>
import AppRadioButton from '@/components/AppRadioButton.vue';
import AppSlider from '@/components/AppSlider.vue';
import HullInfo from '@/components/HullInfo.vue';

export default {
  name: 'ship',
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
    shipChoice() {
      return this.$store.state.data.shipChoice;
    },
    shipId() {
      return (this.size * 84) + (this.type * 12) + this.level;
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
