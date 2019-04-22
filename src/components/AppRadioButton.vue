<template>
  <!--
      <app-radio-button
        :options="options"
        v-model="option">
      </app-radio-button>

      data() {
        return {
          option: 0,
          options: [
            { value: 0, zh: "第一", en: "first" },
            { value: 1, zh: "第二", en: "second" },
          ],
        }
      }
   -->
  <div class="lbl-group">
    <label class="lbl"
      v-for="option in options"
      :key="option.value"
      :class="{ active: choice === option.value }">
      <input class="dot" type="radio"
        :value="option.value"
        v-model="choice"
        @change="$emit('input', choice)">
      {{ $i18n.locale === "en" ? option.en : option.zh }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'AppRadioButton',
  props: {
    options: Array,
    value: [String, Number],
  },
  data() {
    return {
      choice: this.value,
    };
  },
};
</script>

<style scoped>
.lbl-group {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  overflow: auto;
  box-shadow: var(--elevation);
  background-color: var(--base-color);
  border-radius: 3px;
  align-content: stretch;
  height: 36px;
}
.lbl {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 0;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
  min-height: 36px;
}
.dot {
  display: none;
}
.active {
  background-color: var(--primary-color);
  color: var(--dark-text-color);
}
</style>
