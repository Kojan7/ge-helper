<template>
  <div class="module">
    <div class="inputs">
      <app-radio-button
        :options="modChoice.size"
        @chose="size=$event">
      </app-radio-button>
      <select class="select" v-model.number="item">
        <option v-for="option in modChoice.item"
          :value="option.value"
          :key="option.value">
          {{ $i18n.locale === "en" ? option.texten : option.textzh }}
        </option>
      </select>
      <app-slider
        @input="level=$event"
        :text="$t('level')"
        :min=1
        :max=12
        :value="level">
      </app-slider>
    </div>
    <ModInfo :modId="modId"></ModInfo>
  </div>
</template>

<script>
import ModInfo from '@/components/ModInfo.vue';
import AppRadioButton from '@/components/AppRadioButton.vue';
import AppSlider from '@/components/AppSlider.vue';


export default {
  name: 'module',
  components: {
    AppRadioButton,
    AppSlider,
    ModInfo,
  },
  data() {
    return {
      size: 0,
      level: 1,
      item: 0,
    };
  },
  computed: {
    modMap() {
      return this.$store.state.data.modMap;
    },
    modChoice() {
      return this.$store.state.data.modChoice;
    },
    modId() {
      return this.modMap[this.size][this.item] + this.level;
    },
  },
};
</script>

<style scoped>
.select,
.lbl-group,
.slider {
  border-radius: 0;
  box-shadow: none;
}
.lbl-group {
  border-radius: 3px 3px 0 0;
}
.slider {
  border-radius: 0 0 3px 3px;
}
</style>
