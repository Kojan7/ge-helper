<template>
  <div class="legion">
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
      <label :class="{ active: type === 'other' }">
        <input type="radio" value="other" v-model="type">{{ $t('other') }}
      </label>
      <label :class="{ active: type === 'def' }">
        <input type="radio" value="def" v-model="type">{{ $t('def') }}
      </label>
      <label :class="{ active: type === 'core' }">
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
      {{ $t('lp') }}: {{ lp }}（{{ techAmount }} × lv. {{ tech }}）
    </div>
    <div class="output">
      {{ $t('upgradeFee') }}{{ $i18n.locale === "en" ? upgradeFee : upgradeFeeBeautifiedCN }}
      （{{ feeLp }} {{ $t('lp') }})
    </div>
    <select class="select" v-model="item">
      <option v-for="(price, key) in legionPrice.items"
        :value="key"
        :key="key">
        {{ price[0] }} {{ $t(key) }} ⇀ {{ price[1] }} {{ $t('lp') }}
      </option>
    </select>
    <div class="selection">
      <div class="square">
        {{ $t('item') }}
        <input v-model.number="itemCount">
      </div>
      <div class="square">
        {{ $t('lp') }}
        <div>{{ itemLp }}</div>
      </div>
    </div>
    <div class="card">
      S10 {{ $t('core') }}<br/>
      <input v-model="legionPrice.Score"/><br/>
      S10 {{ $t('def') }}<br/>
      <input v-model="legionPrice.Sdef"/><br/>
      S10 {{ $t('other') }}<br/>
      <input v-model="legionPrice.Sother"/><br/>
      M10 {{ $t('core') }}<br/>
      <input v-model="legionPrice.Mcore"/><br/>
      M10 {{ $t('def') }}<br/>
      <input v-model="legionPrice.Mdef"/><br/>
      M10 {{ $t('other') }}<br/>
      <input v-model="legionPrice.Mother"/><br/>
      L10 {{ $t('core') }}<br/>
      <input v-model="legionPrice.Lcore"/><br/>
      L10 {{ $t('def') }}<br/>
      <input v-model="legionPrice.Ldef"/><br/>
      L10 {{ $t('other') }}<br/>
      <input v-model="legionPrice.Lother"/><br/>
      UCP/ {{ $t('lp') }}<br/>
      <input v-model="legionPrice.rateucp"/><br/>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'legion',
  data() {
    return {
      size: 'S',
      type: 'other',
      tech: 1,
      level: 1,
      amount: 1,
      item: 'rock',
      itemCount: 1,
      upgradeFeeRaw: {
        Score: 300,
        Sdef: 75,
        Sother: 150,

        Mcore: 57600,
        Mdef: 14400,
        Mother: 28800,

        Lcore: 3456000,
        Ldef: 864000,
        Lother: 1728000
      },
      legionPrice: {
        Score: 40,
        Sdef: 10,
        Sother: 20,
        Mcore: 7800,
        Mdef: 1950,
        Mother: 3900,
        Lcore: 512000,  //1000 *512
        Ldef: 128000,   //250 *512
        Lother: 256000, //500 *512
        rateucp: 30000, //3000000/100
        items: {
          rock: [500000, 40],
          metalOre: [50000, 15],
          ice: [25000, 15],
          silOre: [10000, 15],
          reOre: [5000, 15],
          debris: [2500, 225],
          metal: [5000, 20],
          sil: [1000, 20],
          ucp: [30000, 1],
          re: [500,20],
          t2: [5000, 525],
        },
      }
    };
  },
  computed: {
    lp() {
      return Math.ceil(this.legionPrice[this.size + this.type] /
        Math.pow(2, 10 - this.level) * this.amount);
    },
    techAmount() {
      return this.amount * Math.pow(2, this.level - this.tech);
    },
    upgradeFee() {
      return (
        this.upgradeFeeRaw[this.size + this.type] *
        Math.pow(2, this.level - 2) *
        (this.level - this.tech) *
        this.amount
      );
    },
    upgradeFeeBeautifiedCN() {
      if (this.upgradeFee < 10000) {
        return this.upgradeFee;
      } else if (this.upgradeFee < 100000000) {
        return `${Math.round(this.upgradeFee / 100) / 100}万`;
      }
      return `${Math.round(this.upgradeFee / 1000000) / 100}亿`;
    },
    feeLp() {
      return Math.round(this.upgradeFee / this.legionPrice.rateucp);
    },
    itemLp() {
      return Math.ceil(this.itemCount *
        this.legionPrice.items[this.item][1] / this.legionPrice.items[this.item][0]);
    }
  },
  methods: {
    saveLegion() {
      localStorage.setItem('legion', JSON.stringify(this.legionPrice));
    },
    loadLegion() {
      if (localStorage.getItem('legion') !== null) {
        this.legionPrice = JSON.parse(localStorage.getItem('legion'));
      }
    },
  },
  watch: {
    legionPrice: {
      handler() {
        this.saveLegion();
      },
      deep: true,
    }
  },
  beforeMount() {
    this.loadLegion();
  },
};
</script>

<style scoped>
.select {
  height: 36px;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.selection {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;
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
  background-color: var(--base-color);
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
  background-color: var(--base-color);
  border-bottom: 1px solid var(--primary-color);
}

.output {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  margin: 10px 0;
  background-color: var(--base-color);
  box-shadow: var(--elevation);
}

.active {
  background-color: var(--primary-color);
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
    "lp": "LP",
    "upgradeFee": "Upgrade Fee: ",
    "item": "Item",
    "rock": "Rock",
    "metalOre": "Metal ore",
    "ice": "Ice",
    "silOre": "Silicon ore",
    "reOre": "Re ore",
    "debris": "Debris",
    "metal": "Metal",
    "sil": "Silicon",
    "ucp": "UCP",
    "re": "RE",
    "t2": "T2"
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
    "lp": "军团点",
    "upgradeFee": "合成费：",
    "item": "物品",
    "rock": "沙",
    "metalOre": "金属矿",
    "ice": "冰",
    "silOre": "硅矿",
    "reOre": "稀土矿",
    "debris": "残骸",
    "metal": "金属",
    "sil": "硅",
    "ucp": "UCP",
    "re": "稀土",
    "t2": "T2"
  }
}
</i18n>
