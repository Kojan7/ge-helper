<template>
  <div class="module">
    <div class="selection">
      <select class="select" v-model.number="size">
        <option value="0">S</option>
        <option value="1">M</option>
        <option value="2">L</option>
        <option value="3">M+</option>
        <option value="4">L+</option>
      </select>
      <select class="select" v-model.number="level">
        <option value="1">Lv. 1</option>
        <option value="2">Lv. 2</option>
        <option value="3">Lv. 3</option>
        <option value="4">Lv. 4</option>
        <option value="5">Lv. 5</option>
        <option value="6">Lv. 6</option>
        <option value="7">Lv. 7</option>
        <option value="8">Lv. 8</option>
        <option value="9">Lv. 9</option>
        <option value="10">Lv. 10</option>
        <option value="11">Lv. 11</option>
        <option value="12">Lv. 12</option>
      </select>
      <select class="select" v-model.number="item">
        <option value="0">穿甲磁轨炮</option>
        <option value="1">高爆磁轨炮</option>
        <option value="2">速射磁轨炮</option>
        <option value="3">脉冲激光器</option>
        <option value="4">集束激光器</option>
        <option value="5">直射导弹</option>
        <option value="6">左侧导弹</option>
        <option value="7">右侧导弹</option>
        <option value="8">绕后导弹</option>
        <option value="9">脉冲防空镭射</option>
        <option value="10">集束防空镭射</option>
        <option value="11">采矿器</option>
        <option value="12">动力核心</option>
        <option value="13">标准装甲</option>
        <option value="14">镜面装甲</option>
        <option value="15">反应装甲</option>
        <option value="16">偏转装甲</option>
        <option value="17">护盾发生器</option>
        <option value="18">核融合引擎</option>
        <option value="19">货柜</option>
        <option value="20">能源舱</option>
      </select>
    </div>
    <ModInfo :modId="modId"></ModInfo>
  </div>
</template>

<script>
import ModInfo from "@/components/ModInfo.vue";
import { mRetro, lRetro } from "@/data/modRetro.js";
export default {
  name: "module",
  components: {
    ModInfo
  },
  data: function() {
    return {
      size: 0,
      level: 1,
      item: 0
    };
  },
  computed: {
    modId: function() {
      var itemCode;
      if (this.size <= 2) {
        if (this.item <= 2) {
          itemCode = this.item + this.size * 3; // railguns
        } else if (this.item <= 4) {
          itemCode = 6 + this.item + this.size * 2; // lasers
        } else if (this.item <= 8) {
          itemCode = 10 + this.item + this.size * 4; // launchers
        } else if (this.item <= 10) {
          itemCode = 18 + this.item + this.size * 2; // PDL
        } else if (this.item <= 12) {
          itemCode = 3 * this.item + this.size; // miners + cores
        } else if (this.item <= 16) {
          itemCode = 26 + this.item + this.size * 4; // armors
        } else {
          itemCode = 3 * this.item + this.size;
        }
      } else if (this.size === 3) {
        itemCode = mRetro[this.item];
      } else if (this.size === 4) {
        itemCode = lRetro[this.item];
      }
      return itemCode * 12 + this.level;
    }
  }
};
</script>

<style scoped>
.module {
  max-width: 300px;
  margin: auto;
}
.selection {
  display: flex;
  align-items: center;
}
.select {
  margin: 2px;
  flex-grow: 1;
  border-radius: 1;
  height: 36px;
  font-size: 16px;
}
</style>
