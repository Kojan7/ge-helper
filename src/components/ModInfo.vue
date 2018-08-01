<template>
  <div class="info">
    <ModInfoEl
      v-for="el in modInfoList"
      v-bind:el="el"
      v-bind:key="el.id"
      v-bind:elvalue="info[el.id]">
    </ModInfoEl>
  </div>
</template>

<script>
import ModInfoEl from "@/components/ModInfoEl.vue";
import { GD_Component } from "@/data/game.js";
export default {
  name: "ModInfo",
  components: {
    ModInfoEl
  },
  props: {
    modId: Number
  },
  data: function() {
    return {
      modInfoList: [
        { id: 5, name: "HP" },
        { id: 6, name: "动力需求" },
        { id: 7, name: "动力输出" },
        { id: 8, name: "推力" },
        { id: 9, name: "质量", suffix: " T" },
        { id: 10, name: "仓库", suffix: " m³" },
        { id: 11, name: "能源" },
        { id: 12, name: "攻击力" },
        { id: 13, name: "能源消耗" },
        { id: 14, name: "对护盾", suffix: " %", modifier: 100 },
        { id: 15, name: "对装甲", suffix: " %", modifier: 100 },
        { id: 16, name: "对结构", suffix: " %", modifier: 100 },
        { id: 17, name: "磁轨减免", suffix: " %", modifier: 100 },
        { id: 18, name: "激光减免", suffix: " %", modifier: 100 },
        { id: 19, name: "导弹减免", suffix: " %", modifier: 100 },
        { id: 20, name: "装填间隔", suffix: " s", modifier: 60 },
        { id: 21, name: "攻击距离", suffix: " km" },
        { id: 22, name: "攻击分辨率" },
        { id: 23, name: "穿甲" },
        { id: 24, name: "穿甲抵抗" },
        { id: 25, name: "爆炸范围" },
        { id: 26, name: "爆炸抵抗" },
        { id: 28, name: "子弹速度" },
        { id: 29, name: "子弹血量" },
        { id: 30, name: "照射时间", suffix: " s", modifier: 60 },
        { id: 31, name: "攻击方向" },
        { id: 32, name: "采集速度" },
        { id: 33, name: "护盾值" },
        { id: 34, name: "护盾恢复", suffix: " /s", modifier: 10 },
        { id: 38, name: "研究点" },
        { id: 39, name: "体积", suffix: " m³" },
        { id: 40, name: "生产时间", suffix: " s" },
        { id: 41, name: "金属" },
        { id: 42, name: "稀有元素" },
        { id: 43, name: "燃料" },
        { id: 44, name: "钛合金" },
        { id: 45, name: "晶体" },
        { id: 46, name: "芯片" },
        { id: 47, name: "热核燃料" },
        { id: 48, name: "纳米材料" },
        { id: 49, name: "光子晶体" },
        { id: 50, name: "量子芯片" },
        { id: 51, name: "智能核心" },
        { id: 52, name: "暗物质" }
      ]
    };
  },
  computed: {
    info: function() {
      return GD_Component[this.modId];
    }
  }
};
</script>

<style scoped>
.info {
  max-width: 300px;
  margin: auto;
}
</style>
