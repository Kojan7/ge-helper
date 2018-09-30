<template>
  <div class="buffs">
    {{ output }}
  </div>
</template>

<script>
export default {
  name: 'ShipBuff',
  props: {
    buffs: Array
  },
  computed: {
    shipBuff() {
      return this.$store.state.data.shipBuff;
    },
    output() {
      var effectText = '';
      for (var i = 0; i < this.buffs.length; i++) {
        effectText +=
          this.$i18n.locale === 'en'
            ? this.shipBuff[this.buffs[i][0]][1]
            : this.shipBuff[this.buffs[i][0]][0];
        effectText += ' ';
        if (this.buffs[i][1] > 0) {
          effectText += '+';
        }
        effectText += this.buffs[i][1] / 100;
        effectText += '% ';
      }
      return effectText;
    }
  }
};
</script>
