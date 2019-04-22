<template>
  <div class="module">
    <div class="inputs">
      <app-radio-button
        :options="modChoice.size"
        v-model="size"/>
      <select class="select" v-model.number="item">
        <option v-for="option in modChoice.item"
          :value="option.value"
          :key="option.value">
          {{ $i18n.locale === "en" ? option.en : option.zh }}
        </option>
      </select>
      <app-slider
        :text="$t('level')"
        :min=1
        :max=maxModuleLevel
        v-model="level"/>
    </div>
    <ModInfo :modId="modId"/>
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
    maxModuleLevel() {
      return this.$store.state.data.maxModuleLevel;
    },
    modMap() {
      return this.$store.state.data.modMap;
    },
    modChoice() {
      return this.$store.state.data.modChoice;
    },
    modules() {
      return this.$store.state.data.module;
    },
    modId() {
      const id = (this.modMap[this.size][this.item] + this.level) - 1;
      return this.modules.findIndex(el => el[0] === id);
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
</style>
