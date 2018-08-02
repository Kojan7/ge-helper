<template>
  <div>
    <div class="selection">
      <select class="select" v-model.number="type">
        <option value="0">通用</option>
        <option value="1">防御</option>
        <option value="2">强袭</option>
        <option value="3">狙击</option>
        <option value="4">高速</option>
        <option value="5">采掘</option>
        <option value="6">运输</option>
      </select>
      <select class="select" v-model.number="size">
        <option value="0">护卫舰</option>
        <option value="1">驱逐舰</option>
        <option value="2">巡洋舰</option>
        <option value="3">战列舰</option>
        <option value="4">无畏舰</option>
        <option value="5">泰坦</option>
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
    </div>
    <ShipInfo :shipId="shipId"></ShipInfo>
  </div>
</template>

<script>
import ShipInfo from "@/components/ShipInfo.vue";
export default {
  name: "ship",
  components: {
    ShipInfo
  },
  data: function() {
    return {
      type: 0,
      size: 0,
      level: 1
    };
  },
  computed: {
    shipId: function() {
      return this.size * 84 + this.type * 12 + this.level;
    }
  }
};
</script>
