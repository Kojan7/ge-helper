<template>
  <div class="build">
    <div class="mobile-warn">
      <img src="@/assets/error.svg" width="180" height="180">
      <p>你的屏幕太小啦！</p>
      <p>⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</p>
    </div>
    <div class="desktop">
      <div class="left">
        <div class="selection">
          <select class="select" v-model.number="shipOption.type">
            <option v-for="option in shipChoice.type"
              :value="option.value"
              :key="option.value">
              {{ option.text }}
            </option>
          </select>
          <select class="select" v-model.number="shipOption.size">
            <option v-for="option in shipChoice.size"
              :value="option.value"
              :key="option.value">
              {{ option.text }}
            </option>
          </select>
          <select class="select" v-model.number="shipOption.level">
            <option v-for="option in shipChoice.level"
              :value="option.value"
              :key="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
        <div class="selection">
          <div class="cont-card">
            缩放：
            <input type="range" v-model.number="zoom" min="1" max="15" step="0.01"/>
          </div>
        </div>
        <div class="selection">
          <div class="cont-card not-allowed">科技</div>
          <div class="cont-card" @click="resetView">重置显示</div>
        </div>

        <div class="selection">
          <div class="cont-card" style="visibility: hidden;"></div>
        </div>

          <app-radio-button
            :options="modChoice.size"
            @chose="module.size=$event">
          </app-radio-button>

          <div class="cont-card cont-card-inside">
            等级：{{ this.module.level }}
            <input type="range" v-model.number="module.level" min="1" max="12" step="1"/>
          </div>
            <app-radio-button
              :options="modChoice.item"
              @chose="module.item=$event">
            </app-radio-button>
      </div>



        <div class="preview" draggable="true" @dragstart="dragStart" @drag="move">
          <div class="text-zone">
            <div>警告：未计算科技和船体加成，组件不管大小都只占1格</div>
            <ship-buff v-bind:buffs="ship[12]"></ship-buff>
            <div :style="statsPowerColor">
              动力：{{ statsPowerUsage }}/{{ statsPowerOutput }}
            </div>
            <div>能源：{{ statsEnergy }}</div>
            <div>护盾：{{ statsShield }}（{{statsRegen}}/s）</div>
            <div>装甲：{{ statsHP }}</div>
            <div>速度：{{ statsSpeed }}</div>
            <div>伤害：{{ statsDPS }} dps</div>
            <div>开采：{{ statsMining }}</div>
            <div>货舱：{{ statsCargo }}</div>
          </div>
          <ShipInfoTile
            v-for="tile in layout"
            :coord="tile"
            :key="layout.indexOf(tile)+ 1000"
            :padding="padding"
            :zoom="zoom"
            @selected="tileClick">
          </ShipInfoTile>
          <ShipInfoTileMod
            v-for="mod in installedList"
            :mod="mod"
            :key="installedList.indexOf(mod)"
            :padding="padding"
            :zoom="zoom"
            @deleted="removeMod">
          </ShipInfoTileMod>
        </div>
    </div>
  </div>
</template>

<script>
import AppRadioButton from "@/components/AppRadioButton.vue";
//import ShipInfoEl from "@/components/ShipInfoEl.vue";
import ShipBuff from "@/components/ShipBuff.vue";
import ShipInfoTile from "@/components/ShipInfoTile.vue";
import ShipInfoTileMod from "@/components/ShipInfoTileMod.vue";
import { GD_Shipbody, GD_Technology, GD_Component } from "@/data/game.js";
import { shipChoice } from "@/data/shipInfo.js";
import { mRetro, lRetro, modChoice } from "@/data/modInfo.js";
export default {
  name: "build",
  components: {
    ShipInfoTile,
    ShipInfoTileMod,
    AppRadioButton,
    ShipBuff
  },
  data: function() {
    return {
      dragX: 2,
      dragY: 2,
      zoom: 4,
      padding: {
        top: 30,
        right: 15
      },
      shipChoice,
      shipOption: {
        type: 0,
        size: 0,
        level: 1
      },
      modChoice,
      module: {
        size: 0,
        level: 1,
        item: 0
      },
      installedList: []
    };
  },
  computed: {
    shipId: function() {
      return (
        this.shipOption.size * 84 +
        this.shipOption.type * 12 +
        this.shipOption.level
      );
    },
    ship: function() {
      return GD_Shipbody[this.shipId];
    },
    layout: function() {
      if (this.ship[1] < 36) {
        return GD_Technology[this.ship[1]][11].slice(0, this.ship[6]);
      } else {
        // workaround for titans
        return GD_Technology[this.ship[1] - 61][11].slice(0, this.ship[6]);
      }
    },
    modId: function() {
      let itemCode;
      if (this.module.size <= 2) {
        if (this.module.item <= 2) {
          itemCode = this.module.item + this.module.size * 3; // railguns
        } else if (this.module.item <= 4) {
          itemCode = 6 + this.module.item + this.module.size * 2; // lasers
        } else if (this.module.item <= 8) {
          itemCode = 10 + this.module.item + this.module.size * 4; // launchers
        } else if (this.module.item <= 10) {
          itemCode = 18 + this.module.item + this.module.size * 2; // PDL
        } else if (this.module.item <= 12) {
          itemCode = 3 * this.module.item + this.module.size; // miners + cores
        } else if (this.module.item <= 16) {
          itemCode = 26 + this.module.item + this.module.size * 4; // armors
        } else {
          itemCode = 3 * this.module.item + this.module.size;
        }
      } else if (this.module.size === 3) {
        itemCode = mRetro[this.module.item];
      } else if (this.module.size === 4) {
        itemCode = lRetro[this.module.item];
      }
      return itemCode * 12 + this.module.level;
    },
    modInfo() {
      return GD_Component[this.modId];
    },
    statsPowerUsage() {
      let i;
      let output = 0;
      for (i = 0; i < this.installedList.length; i++) {
        output += this.installedList[i].modInfo[6];
      }
      return output;
    },
    statsPowerOutput() {
      let i;
      let output = this.ship[7];
      for (i = 0; i < this.installedList.length; i++) {
        output += this.installedList[i].modInfo[7];
      }
      return output;
    },
    statsPowerColor() {
      if (this.statsPowerUsage > this.statsPowerOutput) {
        return "color:red";
      } else {
        return "";
      }
    },
    statsEnergy() {
      let i;
      let output = this.ship[11];
      for (i = 0; i < this.installedList.length; i++) {
        output += this.installedList[i].modInfo[11];
      }
      return output;
    },
    statsShield() {
      let i;
      let output = 0;
      for (i = 0; i < this.installedList.length; i++) {
        output += this.installedList[i].modInfo[33];
      }
      return output;
    },
    statsRegen() {
      let i;
      let output = 0;
      for (i = 0; i < this.installedList.length; i++) {
        output += this.installedList[i].modInfo[34];
      }
      return output / 10;
    },
    statsHP() {
      let i;
      let output = 0;
      for (i = 0; i < this.installedList.length; i++) {
        output += this.installedList[i].modInfo[5];
      }
      return output;
    },
    statsSpeed() {
      let i;
      let thrust = this.ship[8];
      let mass = this.ship[9];
      for (i = 0; i < this.installedList.length; i++) {
        thrust += this.installedList[i].modInfo[8];
        mass += this.installedList[i].modInfo[9];
      }
      return Math.floor(thrust * 10000 / mass);
    },
    statsDPS() {
      let i;
      let output = 0;
      for (i = 0; i < this.installedList.length; i++) {
        output += this.installedList[i].modInfo[12];
      }
      return output;
    },
    statsMining() {
      let i;
      let output = 0;
      for (i = 0; i < this.installedList.length; i++) {
        output += this.installedList[i].modInfo[32];
      }
      return output;
    },
    statsCargo() {
      let i;
      let output = this.ship[10];
      for (i = 0; i < this.installedList.length; i++) {
        output += this.installedList[i].modInfo[10];
      }
      return output-1;
    }
  },
  methods: {
    dragStart: function(event) {
      let img = new Image();
      event.dataTransfer.setData("text/plain", event.target.id);
      event.dataTransfer.setDragImage(img, 0, 0);
      this.dragX = event.clientX;
      this.dragY = event.clientY;
    },
    move: function(event) {
      if (event.clientY > 1) {
        this.padding.top += event.clientY - this.dragY;
        this.dragY = event.clientY;
        this.padding.right -= event.clientX - this.dragX;
        this.dragX = event.clientX;
      }
    },
    resetView: function() {
      this.zoom = 4;
      this.padding = { top: 30, right: 15 };
    },
    tileClick(coord) {
      this.installedList.push({
        coord,
        modInfo: this.modInfo,
        spec: this.module
      });
      // this is to prevent the list of modules from being updated
      this.module = {
        size: this.module.size,
        level: this.module.level,
        item: this.module.item
      };
    },
    removeMod(mod) {
      this.installedList.splice(this.installedList.indexOf(mod), 1);
    }
  }
};
</script>

<style scoped>
.cont-card-inside {
  flex-grow: 0;
}
.mobile-warn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.desktop {
  display: none;
  margin: 0 17px 17px 17px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 57px;
}

.left {
  height: 100%;
  width: 320px;
  z-index: 900;
  overflow: auto;
}
.preview {
  width: 100%;
  margin: 5px;
  cursor: grab;
}
.text-zone {
  text-align: left;
}
.module-cont {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  background-color: #263238;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  margin: 5px;
  position: absolute;
  bottom: 0;
  left: 0;
  top: 184px;
  width: 290px;
}

.module-cont-bottom {
  box-sizing: border-box;
  flex-grow: 1;
  background-color: #fafbfc;
  margin: 5px;
  border-radius: 3px;
}
.not-allowed {
  user-select: none;
  cursor: not-allowed;
}
/* @media (min-width: 750px) and (min-height: 600px) { */
@media (min-width: 100px) and (min-height: 100px) {
  .mobile-warn {
    display: none;
  }
  .desktop {
    display: flex;
  }
}
</style>
