<template>
  <div class="buffs">
    {{ output }}
  </div>
</template>

<script>
import { shipBuff } from "@/data/shipInfo.js";

export default {
  name: "ShipBuff",
  props: {
    buffs: Array
  },
  computed: {
    output: function() {
      var effectText = "";
      for (var i = 0; i < this.buffs.length; i++) {
        effectText += shipBuff[this.buffs[i][0]];
        effectText += " ";
        if (this.buffs[i][1] > 0) {
          effectText += "+";
        }
        effectText += this.buffs[i][1] / 100;
        effectText += "% ";
      }
      return effectText;
    }
  }
};
</script>

<style scoped>
.buffs {
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
