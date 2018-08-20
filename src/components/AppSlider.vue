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
  name: "AppSlider",
  props: {
    text: String,
    min: Number,
    max: Number,
    value: Number,
    step: {
      type: Number,
      default: 1
    },
    displayOutput: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    output() {
      this.$emit('input', parseFloat(event.target.value))
    }
  }
};
</script>
<style scoped>
.slider {
  box-sizing: border-box;
  justify-content: center;
  background-color: var(--bg-color);
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 36px;
  margin: 5px;
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
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 20px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: #e6ebed;
  border-radius: 10px;
  border: 0px solid #010101;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #670000, 0px 0px 0px #810000;
  border: 0px solid #ff1e00;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background: rgba(0, 188, 212, 0.93);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: 0px;
  box-shadow: var(--chrome-shadow);
}
input[type="range"]:focus::-webkit-slider-runnable-track {
  background: #e6ebed;
}
input[type="range"]::-moz-range-track {
  width: 100%;
  height: 20px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  background: #e6ebed;
  border-radius: 10px;
  border: 0px solid #010101;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #670000, 0px 0px 0px #810000;
  border: 0px solid #ff1e00;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background: rgba(0, 188, 212, 0.93);
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
  background: #e6ebed;
  border: 0px solid #010101;
  border-radius: 20px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type="range"]::-ms-fill-upper {
  background: #e6ebed;
  border: 0px solid #010101;
  border-radius: 20px;
  box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
}
input[type="range"]::-ms-thumb {
  box-shadow: 0px 0px 0px #670000, 0px 0px 0px #810000;
  border: 0px solid #ff1e00;
  width: 20px;
  border-radius: 10px;
  background: rgba(0, 188, 212, 0.93);
  cursor: pointer;
  height: 20px;
}
input[type="range"]:focus::-ms-fill-lower {
  background: #e6ebed;
}
input[type="range"]:focus::-ms-fill-upper {
  background: #e6ebed;
}
</style>
