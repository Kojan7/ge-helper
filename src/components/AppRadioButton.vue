<template>
  <div class="lbl-group">
    <label class="lbl"
      v-for="option in options"
      :key="option.value"
      :class="{ active: choice === option.value }"
    >
      <input class="dot" type="radio" :value=option.value v-model.number="choice" @change="$emit('chose', choice)">
      {{ option.text }}
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
    }
  }
};
</script>

<style scoped>
.lbl-group {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  overflow: auto;
}
.lbl {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  background-color: #fafbfc;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: 5px;
  padding: 0 4px 0 4px;
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
  background-color: #00bcd4;
  color: white;
}
</style>
