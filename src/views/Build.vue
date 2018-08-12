<template>
  <div class="build">
    <build-error-mobile></build-error-mobile>
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
          <!-- <div class="cont-card not-allowed">科技</div> -->
          <div class="cont-card" @click="showInput = !showInput">科技/导入/导出</div>
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

      <div v-if="showInput" class="right-window">
        <span class="gras">科技</span>
        <div>护卫操作：<input type="range" v-model.number="skills.operation[0]" min="0" max="30" step="1"/>：{{ skills.operation[0] }}</div>
        <div>驱逐操作：<input type="range" v-model.number="skills.operation[1]" min="0" max="30" step="1"/>：{{ skills.operation[1] }}</div>
        <div>巡洋操作：<input type="range" v-model.number="skills.operation[2]" min="0" max="30" step="1"/>：{{ skills.operation[2] }}</div>
        <div>战列操作：<input type="range" v-model.number="skills.operation[3]" min="0" max="30" step="1"/>：{{ skills.operation[3] }}</div>
        <div>无畏操作：<input type="range" v-model.number="skills.operation[4]" min="0" max="30" step="1"/>：{{ skills.operation[4] }}</div>
        <div>泰坦操作：<input type="range" v-model.number="skills.operation[5]" min="0" max="30" step="1"/>：{{ skills.operation[5] }}</div>
        <button @click="saveSkills">保存</button>
        <br>
        <span class="gras">导出</span>
        <span>组件数据（不包括舰体）</span>
        <span>{{ outputText }}</span>
        <br>
        <span class="gras">导入</span>
        <textarea v-model="inputText" placeholder="把船体数据粘贴在这"></textarea>
        <button @click="installedList = inputTextArray">应用</button>

      </div>

      <div class="preview" draggable="true" @dragstart="dragStart" @drag="move">
        <div class="text-zone">
          <div>警告：除了动力外未计算科技和船体加成，组件不管大小都只占1格</div>
          <ship-buff v-bind:buffs="ship[12]"></ship-buff>
          <div :style="statsPowerColor">
            动力：{{ stats.powerUsage }}/{{ stats.powerOutput }}
          </div>
          <div>能源：{{ stats.energy }}</div>
          <div>护盾：{{ stats.shield }}（{{stats.regen}}/s）</div>
          <div>装甲：{{ stats.hp }}</div>
          <div>速度：{{ stats.speed }}</div>
          <div>伤害：{{ stats.dps }} dps</div>
          <div>开采：{{ stats.mining }}</div>
          <div>货舱：{{ stats.cargo }}</div>
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
import BuildErrorMobile from "@/components/BuildErrorMobile.vue";
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
    BuildErrorMobile,
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
      installedList: [],
      showInput: false,
      showOutput: false,
      inputText: "",
      skills: {
        operation: [0,0,0,0,0,0]
      }
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
    stats() {
      let operationBuff = 1 + this.skills.operation[this.shipOption.size] * 0.1;
      let i;
      let powerUsage = 0;
      let powerOutput = Math.floor(this.ship[7] * operationBuff);
      let energy = this.ship[11];
      let shield = 0;
      let regen = 0;
      let hp = 0;
      let thrust = this.ship[8];
      let mass = this.ship[9];
      let dps = 0;
      let mining = 0;
      let cargo = this.ship[10];

      for (i = 0; i < this.installedList.length; i++) {
        if (this.installedList[i][1] < 5) {
          let modInfo = GD_Component[this.installedList[i][4]];
          powerUsage += modInfo[6];
          powerOutput += modInfo[7];
          energy += modInfo[11];
          shield += modInfo[33];
          regen += modInfo[34];
          hp += modInfo[5];
          thrust += modInfo[8];
          mass += modInfo[9];
          dps += modInfo[12];
          mining += modInfo[32];
          cargo += modInfo[10];
        }
      }

      return {
        powerUsage,
        powerOutput,
        energy,
        shield,
        regen: regen / 10,
        hp,
        speed: Math.floor(thrust * 10000 / mass),
        dps,
        mining,
        cargo: cargo - 1
      };
    },
    statsPowerColor() {
      let powerColor = "";
      if (this.stats.powerUsage > this.stats.powerOutput) {
        powerColor = "color:red";
      }
      return powerColor;
    },
    outputText() {
      return JSON.stringify(this.installedList);
    },
    inputTextArray() {
      return JSON.parse(this.inputText);
    }
  },
  methods: {
    saveSkills() {
      localStorage.setItem("skills", JSON.stringify(this.skills));
    },
    loadSkills() {
      if (localStorage.getItem("skills") !== null) {
        this.skills = JSON.parse(localStorage.getItem("skills"));
      }
    },
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
      this.installedList.push([
        coord, // 0
        this.module.size, // 1
        this.module.item, // 2
        this.module.level, // 3
        this.modId // 4
      ]);
      if (this.module.size === 1) {
        this.tileExpand(
          [coord[0] + 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)],
          5
        );
        this.tileExpand([coord[0] + 1, coord[1] - (coord[0] % 2 ? 1 : 0)], 6);
      } else if (this.module.size === 2) {
        this.tileExpand(
          [coord[0] + 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)],
          7
        );
        this.tileExpand([coord[0] + 1, coord[1] - (coord[0] % 2 ? 1 : 0)], 8);
        this.tileExpand([coord[0] + 2, coord[1]], 9);
        this.tileExpand([coord[0] + 2, coord[1] + 1], 5);
        this.tileExpand([coord[0] + 2, coord[1] - 1], 6);
      } else if (this.module.size === 3) {
        this.tileExpand(
          [coord[0] + 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)],
          10
        );
        this.tileExpand([coord[0] + 1, coord[1] - (coord[0] % 2 ? 1 : 0)], 11);
        this.tileExpand([coord[0] + 2, coord[1]], 12);
      } else if (this.module.size === 4 && this.module.item < 11) {
        this.tileExpand(
          [coord[0] + 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)],
          15
        );
        this.tileExpand([coord[0] + 1, coord[1] - (coord[0] % 2 ? 1 : 0)], 16);
        this.tileExpand(
          [coord[0] - 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)],
          7
        );
        this.tileExpand([coord[0] - 1, coord[1] - (coord[0] % 2 ? 1 : 0)], 8);
        this.tileExpand([coord[0], coord[1] + 1], 10);
        this.tileExpand([coord[0], coord[1] - 1], 11);
        this.tileExpand([coord[0] - 2, coord[1]], 17);
      } else if (this.module.size === 4) {
        this.tileExpand(
          [coord[0] + 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)],
          15
        );
        this.tileExpand([coord[0] + 1, coord[1] - (coord[0] % 2 ? 1 : 0)], 16);
        this.tileExpand(
          [coord[0] - 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)],
          13
        );
        this.tileExpand([coord[0] - 1, coord[1] - (coord[0] % 2 ? 1 : 0)], 14);
        this.tileExpand([coord[0], coord[1] + 1], 10);
        this.tileExpand([coord[0], coord[1] - 1], 11);
      }
      // this is to prevent the list of modules from being updated
      this.module = {
        size: this.module.size,
        level: this.module.level,
        item: this.module.item
      };
    },
    tileExpand(coord, size) {
      var duplicate = this.installedList.find(function(el) {
        return el[0][0] === coord[0] && el[0][1] === coord[1];
      });
      if (typeof duplicate !== "undefined") {
        this.removeMod(duplicate);
      }
      this.installedList.push([coord, size, this.module.item]);
    },
    removeMod(mod) {
      this.installedList.splice(this.installedList.indexOf(mod), 1);
    }
  },
  beforeMount() {
    this.loadSkills();
  }
};
</script>

<style scoped>
.gras {
  font-weight: bold;
}
.cont-card-inside {
  flex-grow: 0;
}

.desktop {
  display: flex;
  margin: 0 17px 17px 17px;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 57px;
}

.left {
  height: 100%;
  width: 290px;
  flex-grow: 0;
  flex-shrink: 0;
  z-index: 900;
  overflow: auto;
}
.preview {
  width: 100%;
  margin: 5px;
  cursor: grab;
}

.right-window {
  position: absolute;
  right: 0;
  left: 290px;
  top: 0;
  z-index: 200;
  box-sizing: border-box;
  justify-content: center;
  background-color: var(--bg-color);
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 5px;
  padding: 3px;
  cursor: default;
  text-align: left;
}

.text-zone {
  text-align: left;
}

.module-cont-bottom {
  box-sizing: border-box;
  flex-grow: 1;
  background-color: var(--bg-color);
  margin: 5px;
  border-radius: 3px;
}
.not-allowed {
  user-select: none;
  cursor: not-allowed;
}
</style>
