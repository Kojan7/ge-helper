<template>
  <div class="buffs">
    {{ output }}
  </div>
</template>

<script>
export default {
  name: 'HullInfoBuff',
  props: {
    buffs: Array,
  },
  computed: {
    buff() {
      return this.$store.state.data.hullBuff;
    },
    output() {
      let effectText = '';
      let i;
      for (i = 0; i < this.buffs.length; i += 1) {
        effectText +=
          this.$i18n.locale === 'en'
            ? this.buff[this.buffs[i][0]][1]
            : this.buff[this.buffs[i][0]][0];
        effectText += ' ';
        if (this.buffs[i][1] > 0) {
          effectText += '+';
        }
        effectText += this.buffs[i][1] / 100;
        effectText += '% ';
      }
      return effectText;
    },
  },
};
</script>
