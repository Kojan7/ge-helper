<template>
<div class="slider">
  <div class="text">{{ text }}</div>
  <input type="range"
    :min="min" :max="max" :step="step" :value="value"
    @input="output">
  <div v-if="displayOutput" class="output">{{ value }}</div>
</div>
</template>
<script>
export default {
  name: 'AppSlider',
  props: {
    text: String,
    min: Number,
    max: Number,
    value: Number,
    step: {
      type: Number,
      default: 1,
    },
    displayOutput: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    output(event) {
      this.$emit('input', parseFloat(event.target.value));
    },
  },
};
</script>
<style scoped>
.slider {
  box-sizing: border-box;
  justify-content: center;
  background-color: var(--base-color);
  box-shadow: var(--elevation);
  display: flex;
  align-items: center;
  height: 36px;
  padding: 3px;
  flex-grow: 1;
  cursor: default;
  user-select: none;
}
.text {
  margin: 0 5px;
  flex-shrink: 0;
}
.output {
  margin: 0 5px;
  width: 2em;
}

input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
  margin: 0px 0;
  background-color: inherit;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 20px;
  cursor: pointer;
  box-shadow: none;
  background: var(--alt-primary-color);
  border-radius: 10px;
  border: none;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: none;
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background: var(--primary-color);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: 0px;
  box-shadow: var(--elevation);
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: var(--alt-primary-color);
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 20px;
  cursor: pointer;
  box-shadow: none;
  background: var(--alt-primary-color);
  border-radius: 10px;
  border: none;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: none;
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background: var(--primary-color);
  cursor: pointer;
}
input[type="range"]::-ms-track {
  width: 100%;
  height: 20px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type="range"]::-ms-fill-lower {
  background: var(--alt-primary-color);
  border: none;
  border-radius: 20px;
  box-shadow: none;
}
input[type="range"]::-ms-fill-upper {
  background: var(--alt-primary-color);
  border: none;
  border-radius: 20px;
  box-shadow: none;
}
input[type="range"]::-ms-thumb {
  box-shadow: none;
  border: none;
  width: 20px;
  border-radius: 10px;
  background: var(--primary-color);
  cursor: pointer;
  height: 20px;
}
input[type="range"]:focus::-ms-fill-lower,
input[type="range"]:focus::-ms-fill-upper {
  background: var(--alt-primary-color);
}
</style>
