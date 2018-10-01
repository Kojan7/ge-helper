<template>
  <div class="legion">
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
        {{ $t('upgradeFee') }}{{ $i18n.locale === "en" ? upgradeFee : upgradeFeeBeautifiedCN }}（{{ feeLp }} {{ $t('lp2') }})
      </div>
  </div>
</template>

<script>
export default {
  name: 'legion',
  data() {
    return {
      name: 'xianyu',
      legions: [
        { value: 'xianyu', text: this.$i18n.t('geaa') },
        { value: 'ziyou', text: this.$i18n.t('freeUnion') },
        { value: 'ucp', text: this.$i18n.t('cutePet') },
        { value: 'nanjiu', text: this.$i18n.t('nanjiu') }
      ],
      size: 'S',
      type: 'other',
      tech: 1,
      level: 1,
      amount: 1,
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
        xianyu: {
          Score: 40,
          Sdef: 10,
          Sother: 20,
          Mcore: 7800,
          Mdef: 1950,
          Mother: 3900,
          Lcore: 512000,  //1000 *512
          Ldef: 128000,   //250 *512
          Lother: 256000, //500 *512
          raterocktext: '500万 原矿 ⇀ 400 点',
          raterock: 5000000 / 400,
          ratemoretext: '50万 金属矿 ⇀ 150 点',
          ratemore: 500000 / 150,
          rateicetext: '25万 冰矿 ⇀ 150 点',
          rateice: 250000 / 150,
          ratesiltext: '10万 硅矿 ⇀ 150 点',
          ratesil: 100000 / 150,
          rateretext: '5万 稀土矿 ⇀ 150 点',
          ratere: 50000 / 150,
          ratedebristext: '2500 残骸 ⇀ 225 点',
          ratedebris: 2500 / 225,
          rateucptext: '3亿 UCP ⇀ 1万 点',
          rateucp: 30000, //3000000/100
          special: '无',
          calc2show: 'flex',
          cjbgshow: 'block',
          cjbgurl: 'https://www.chaojibiaoge.com/index.php/U/url/zdfyqh7l'
        },
        ziyou: {
          Score: 57.57,
          Sdef: 14.39,
          Sother: 29.01,
          Mcore: 11054.08,  //21.59*512
          Mdef: 2764.8,     //5.40*512
          Mother: 5524.48,  //10.79*512
          Lcore: 796318.72,    //1555.31*512
          Ldef: 199019.52,     //388.71*512
          Lother: 398120.96,   //777.58*512
          rateucp: 20000,
          special: '兑换按照7.13版 无科研 计算，请自行四舍五入',
          calc2show: 'none',
          cjbgshow: 'block',
          cjbgurl: 'https://www.chaojibiaoge.com/index.php/U/url/r7sz5zup'
        },
        ucp: {
          Score: 30.72,	// 3/50*512
          Sdef: 7.68,		// 3/200*512
          Sother: 15.36,	// 3/100*512
          Mcore: 6144,		// 12*512
          Mdef: 1536,		// 3*512
          Mother: 3076,	// 6*512
          Lcore: 384000,	// 750*512
          Ldef: 89600,		// 175*512
          Lother: 179200,	// 350*512
          raterocktext: '50万 原矿 ⇀ 30 点',
          raterock: 500000 / 30,
          ratemoretext: '20万 金属矿 ⇀ 50 点',
          ratemore: 200000 / 50,
          rateicetext: '20万 冰矿 ⇀ 120 点',
          rateice: 200000 / 120,
          ratesiltext: '20万 硅矿 ⇀ 250 点',
          ratesil: 200000 / 250,
          rateretext: '20万 稀土矿 ⇀ 500 点',
          ratere: 200000 / 500,
          ratedebristext: '50 残骸 ⇀ 5 点',
          ratedebris: 10,
          rateucptext: '1千万 UCP ⇀ 300 点',
          rateucp: 100000 / 3,
          special: '众神眷恋幻想乡团也用这个查询就好=-',
          calc2show: 'flex',
          cjbgshow: 'none'
        },
        nanjiu: {
          Score: 13,
          Sdef: 7,
          Sother: 13,
          Mcore: 9728,
          Mdef: 2048,
          Mother: 4096,
          Lcore: 424960,
          Ldef: 134144,
          Lother: 268288,
          rateucp: 100000 / 3,
          special: '你们的团长很懒 只留下了个[幽灵]',
          calc2show: 'none',
          cjbgshow: 'none'
        }
      }
    };
  },
  computed: {
    lp() {
      return Math.ceil(
        this.legionPrice[this.name][this.size + this.type] /
        Math.pow(2, 10 - this.level) *
        this.amount
      );
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
        return Math.round(this.upgradeFee / 100) / 100 + '万';
      } else {
        return Math.round(this.upgradeFee / 1000000) / 100 + '亿';
      }
    },
    feeLp() {
      return Math.round(this.upgradeFee / this.legionPrice[this.name].rateucp);
    }
  }
};
</script>

<style scoped>
:root {
  --dark-color: #263238;
  --highlight-color: #00bcd4;
  --bg-color: #fafbfc;
  --chrome-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
.legion {
  min-width: 300px;
  max-width: 400px;
  margin: auto;
}
input[type="radio"] {
  display: none;
}
.selection {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select {
  background-color: var(--bg-color);
  flex-grow: 1;
  border-radius: 0;
  border-style: none;
  height: 36px;
  font-size: 16px;
  margin: 5px;
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
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
