<template>
  <div class="lbl-group">
    <label class="lbl"
      v-for="option in options"
      :key="option.value"
      :class="{ active: choice === option.value }"
    >
      <input class="dot" type="radio" :value=option.value v-model.number="choice" @change="$emit('chose', choice)">
      {{ $i18n.locale === "en" ? option.texten : option.text }}
    </label>
  </div>
</template>

<script>
export default {
  name: "AppRadioButton",
  props: {
    options: Array
  },
  data() {
    return {
      choice: this.options[0].value
    };
  }
};
</script>

<style scoped>
.lbl-group {
  display: flex;
  width: 100%;
  border-radius: 3px;
  flex-wrap: wrap;
  overflow: auto;
  margin: 5px;
  box-shadow: var(--chrome-shadow);
  background-color: var(--bg-color);
}
.lbl {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 0;
  white-space: nowrap;
  user-select: none;
}
.dot {
  display: none;
}
.active {
  background-color: var(--highlight-color);
  color: white;
}
</style>
