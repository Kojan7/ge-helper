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
        <label :class="{ active: size === 'S' }">
          <input type="radio" value="S" v-model="size">S
        </label>
        <label  :class="{ active: size === 'M' }">
          <input type="radio" value="M" v-model="size">M
        </label>
        <label  :class="{ active: size === 'L' }">
          <input type="radio" value="L" v-model="size">L
        </label>
      </div>
      <div class="selection">
        <label  :class="{ active: type === 'other' }">
          <input type="radio" value="other" v-model="type">{{ $t('other') }}
        </label>
        <label  :class="{ active: type === 'def' }">
          <input type="radio" value="def" v-model="type">{{ $t('def') }}
        </label>
        <label  :class="{ active: type === 'core' }">
          <input type="radio" value="core" v-model="type">{{ $t('core') }}
        </label>
      </div>
      <div class="selection">
        <div class="square">
          {{ $t('tech') }}
          <input v-model.number="tech">
        </div>
        <div class="square">
          {{ $t('level') }}
          <input v-model.number="level">
        </div>
        <div class="square">
          {{ $t('amount') }}
          <input v-model.number="amount">
        </div>  
      </div>
      <div class="output">
        {{ $t('lp') }}{{ lp }}（{{ techAmount }} × lv. {{ tech }}）
      </div>
      <div class="output">
        {{ $t('upgradeFee') }}{{ upgradeFeeBeautified }}（{{ feeLp }} {{ $t('lp') }})
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
        { value: "xianyu", text: this.$i18n.t("geaa") },
        { value: "ziyou", text: this.$i18n.t("freeUnion") },
        { value: "ucp", text: this.$i18n.t("cutePet") },
        { value: "nanjiu", text: this.$i18n.t("nanjiu") }
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
.legion {
  min-width: 300px;
  max-width: 400px;
  margin: auto;
}
input[type="radio"] {
  display: none;
}

label,
.square {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  background-color: var(--bg-color);
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
  margin: 5px;
  flex-basis: 0;
  flex-grow: 1;
  user-select: none;
}
.square {
  flex-direction: column;
}

input {
  height: 20px;
  box-sizing: border-box;
  font-size: 16px;
  width: 90%;
  border: none;
  border-radius: 0;
  text-align: center;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--highlight-color);
}

.output {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  margin: 5px 5px 10px 5px;
  background-color: var(--bg-color);
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
}

.active {
  background-color: var(--highlight-color);
  color: white;
}
</style>
<i18n>
{
  "en": {
    "geaa": "GEAA",
    "freeUnion": "自由同盟 (Feee Union)",
    "cutePet": "宇宙萌宠 (Cute Pets)",
    "nanjiu": "银河护卫队 (Galaxy Escort)",
    "other": "weapon miner engine energy",
    "def": "armor shield cargo PDL",
    "core": "core",
    "tech": "Tech.",
    "level": "Level",
    "amount": "Amount",
    "lp": "LP: ",
    "upgradeFee": "Upgrade Fee: ",
    "lp2": "LP"

  },
  "zh": {
    "geaa": "银河勘探冒险家协会",
    "freeUnion": "自由同盟",
    "cutePet": "宇宙萌宠",
    "nanjiu": "银河护卫队",
    "other": "武器/钻头/引擎/能源",
    "def": "装甲/护盾/货柜/防空",
    "core": "动力核心",
    "tech": "科技",
    "level": "等级",
    "amount": "数量",
    "lp": "军团点：",
    "upgradeFee": "合成费：",
    "lp2": "军团点"
  }
}
</i18n>