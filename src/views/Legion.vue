<template>
  <div class="legion">
    <div>
      <div class="selection">
        <select class="select" v-model="name">
          <option v-for="legion in legions" :value="legion.value" :key="legion.value">
            {{ legion.text }}
          </option>
        </select>
      </div>
      <div class="selection">
        <label>
          <input type="radio" value="S" v-model="size">S
        </label>
        <label>
          <input type="radio" value="M" v-model="size">M
        </label>
        <label>
          <input type="radio" value="L" v-model="size">L
        </label>
      </div>
      <div class="selection">
        <label>
          <input type="radio" value="other" v-model="type">武器，钻头，引擎，能源
        </label>
        <label>
          <input type="radio" value="def" v-model="type">装甲，护盾，货柜，防空
        </label>
        <label>
          <input type="radio" value="core" v-model="type">动力核心
        </label>
      </div>
      <div class="selection">
        <div class="square">
          科技
          <input v-model.number="tech">
        </div>
        <div class="square">
          等级
          <input v-model.number="level">
        </div>
        <div class="square">
          数量
          <input v-model.number="amount">
        </div>  
      </div>
      <div class="output">
        军团点：{{ lp }}（{{ techAmount }} × lv. {{ tech }}）
      </div>
      <div class="output">
        合成费：{{ upgradeFeeBeautified }}（{{ feeLp }} 军团点）
      </div>
    </div>
  </div>
</template>

<script>
import { legionPrice } from "@/data/legion.js";
import { upgradeFee } from "@/data/modInfo.js";
export default {
  name: "legion",
  data: function() {
    return {
      name: "xianyu",
      legions: [
        { value: "xianyu", text: "银河勘探冒险家协会" },
        { value: "ziyou", text: "自由同盟" },
        { value: "ucp", text: "宇宙萌宠" },
        { value: "nanjiu", text: "银河护卫队" }
      ],
      size: "S",
      type: "other",
      tech: 1,
      level: 1,
      amount: 1
    };
  },
  computed: {
    lp: function() {
      return Math.ceil(
        legionPrice[this.name][this.size + this.type] /
          Math.pow(2, 10 - this.level) *
          this.amount
      );
    },
    techAmount: function() {
      return this.amount * Math.pow(2, this.level - this.tech);
    },
    upgradeFee: function() {
      return (
        upgradeFee[this.size + this.type] *
        Math.pow(2, this.level - 2) *
        (this.level - this.tech) *
        this.amount
      );
    },
    upgradeFeeBeautified: function() {
      if (this.upgradeFee < 10000) {
        return this.upgradeFee;
      } else if (this.upgradeFee < 100000000) {
        return Math.round(this.upgradeFee / 100) / 100 + "万";
      } else {
        return Math.round(this.upgradeFee / 1000000) / 100 + "亿";
      }
    },
    feeLp: function() {
      return Math.round(this.upgradeFee / legionPrice[this.name].rateucp);
    }
  }
};
</script>

<style scoped>
input[type="radio"] {
  display: none;
}

label,
.square {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: #d3dae3;
  margin: 5px;
  flex-basis: 0;
  flex-grow: 1;
}
.square {
  flex-direction: column;
}

input {
  width: 90%;
  border-radius: 0;
  border-style: none;
  background-color: white;
  text-align: center;
}

.output {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  margin: 5px 5px 10px 5px;
  background-color: #d3dae3;
}
</style>
