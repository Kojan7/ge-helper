<template>
  <div class="build">
    <div v-if="isLeftShown" class="left">
      <div class="selection">
        <select class="select" v-model.number="shipOption.type">
          <option v-for="option in shipChoice.type"
            :value="option.value"
            :key="option.value">
            {{ $i18n.locale === "en" ? option.texten : option.text }}
          </option>
        </select>
        <select class="select" v-model.number="shipOption.size">
          <option v-for="option in shipChoice.size"
            :value="option.value"
            :key="option.value">
            {{ $i18n.locale === "en" ? option.texten : option.text }}
          </option>
        </select>
        <!-- <select class="select" v-model.number="shipOption.level">
          <option v-for="option in shipChoice.level"
            :value="option.value"
            :key="option.value">
            {{ option.text }}
          </option>
        </select> -->
      </div>
      <div class="selection">
        <app-slider
          @input="shipOption.level=$event"
          :text="$t('level')"
          :min=1
          :max=12
          :value="shipOption.level">
        </app-slider>
      </div>
      <div class="selection">
        <app-slider
          @input="zoom=$event"
          :text="$t('build.zoom')"
          :min=0.1
          :max=1
          :step=0.002
          :value="zoom"
          :displayOutput=false>
        </app-slider>
      </div>
      <div class="selection">
        <div class="cont-card" @click="showInput = !showInput">{{ $t('build.function') }}</div>
        <div class="cont-card" @click="resetView">{{ $t('build.viewReset') }}</div>
        <div class="cont-card" @click="isLeftShown = false">{{ $t('build.hide') }}</div>
      </div>

      <div class="selection">
        <div class="cont-card" style="visibility: hidden;"></div>
      </div>
      <div class="selection">
        <app-radio-button
          :options="modChoice.size"
          @chose="module.size=$event">
        </app-radio-button>
      </div>
      <app-slider
        @input="module.level=$event"
        :text="$t('level')"
        :min=1
        :max=12
        :value="module.level">
      </app-slider>
      <div class="selection">
        <app-radio-button
          :options="modChoice.item"
          @chose="module.item=$event">
        </app-radio-button>
      </div>
    </div>
    <div class="expand-btn" v-else @click="isLeftShown = true">+</div>

    <div v-if="showInput" class="right-window">
      <button @click="clearMod">{{ $t('build.clearMod') }}</button><button @click="showInput = !showInput"><b>{{ $t('build.exit') }}</b></button>
      <span class="gras">{{ $t('build.skills') }}</span>
      <app-slider
        @input="skills.operation.splice(0, 1, $event)"
        :text="$t('build.operation0')"
        :min=0
        :max=30
        :value="skills.operation[0]">
      </app-slider>
      <app-slider
        @input="skills.operation.splice(1, 1, $event)"
        :text="$t('build.operation1')"
        :min=0
        :max=30
        :value="skills.operation[1]">
      </app-slider>
      <app-slider
        @input="skills.operation.splice(2, 1, $event)"
        :text="$t('build.operation2')"
        :min=0
        :max=30
        :value="skills.operation[2]">
      </app-slider>
      <app-slider
        @input="skills.operation.splice(3, 1, $event)"
        :text="$t('build.operation3')"
        :min=0
        :max=30
        :value="skills.operation[3]">
      </app-slider>
      <app-slider
        @input="skills.operation.splice(4, 1, $event)"
        :text="$t('build.operation4')"
        :min=0
        :max=30
        :value="skills.operation[4]">
      </app-slider>
      <app-slider
        @input="skills.operation.splice(5, 1, $event)"
        :text="$t('build.operation5')"
        :min=0
        :max=30
        :value="skills.operation[5]">
      </app-slider>
      <app-slider
        @input="skills.navigation=$event"
        :text="$t('build.navigation')"
        :min=0
        :max=20
        :value="skills.navigation">
      </app-slider>
      <br>
      <app-slider
        @input="skills.mining1=$event"
        :text="$t('build.mining1')"
        :min=0
        :max=30
        :value="skills.mining1">
      </app-slider>
      <app-slider
        @input="skills.mining2=$event"
        :text="$t('build.mining2')"
        :min=0
        :max=10
        :value="skills.mining2">
      </app-slider>
      <app-slider
        @input="skills.spaceMining=$event"
        :text="$t('build.spaceMining')"
        :min=0
        :max=30
        :value="skills.spaceMining">
      </app-slider>
      <app-slider
        @input="skills.dm1=$event"
        :text="$t('build.dm1')"
        :min=0
        :max=10
        :value="skills.dm1">
      </app-slider>
      <app-slider
        @input="skills.dm2=$event"
        :text="$t('build.dm2')"
        :min=0
        :max=10
        :value="skills.dm2">
      </app-slider>
      
      <button @click="saveSkills">{{ $t('build.save') }}</button>
      <br><br>
      <span class="gras">{{ $t('build.export') }}</span>
      <div>{{ $t('build.exportDesc') }}</div>
      <div>{{ outputText }}</div>
      <br>
      <span class="gras">{{ $t('build.import') }}</span>
      <textarea v-model="inputText" placeholder="[]"></textarea><br>
      <button @click="installedList = inputTextArray">{{ $t('build.apply') }}</button>
      <br><br>
      <span class="gras">{{ $t('build.miningCalc') }}</span>
      <div>{{ $t('build.miningDiff') }}<input v-model.number="mineDiff" placeholder="60.233"></div>
      <div><label><input type="checkbox" id="checkbox" v-model="showMineCalc">{{ $t('build.showMineCalc') }}</label></div>
    </div>

    <div class="preview" draggable="true" v-hammer:pan="pan">
      <div class="text-zone">
        <ship-buff v-bind:buffs="ship[12]"></ship-buff>
        <div :style="statsPowerColor">
          {{ $t('build.power') }}{{ stats.powerUsage }}/{{ stats.powerOutput }}
        </div>
        <div>{{ $t('build.energy') }}{{ stats.energy }}</div>
        <div>{{ $t('build.shield') }}{{ stats.shield }} ({{stats.regen}}/s)</div>
        <div>{{ $t('build.hp') }}{{ stats.hp }}</div>
        <div>{{ $t('build.speed') }}{{ stats.speed }}</div>
        <div>{{ $t('build.dps') }}{{ stats.dps }} dps</div>
        <div>{{ $t('build.mining') }}{{ stats.mining }}</div>
        <div>{{ $t('build.cargo') }}{{ stats.cargo }}</div>
        <div v-if="showMineCalc"><br>
          <div>{{ $t('build.mCminingTime') }}{{ mCminingTime[1] }}</div>
          <div>{{ $t('build.mCtransitTime') }}{{ mCtransitTime[1] }}</div>
          <div>{{ $t('build.mCtotalTime') }}{{ mCtotalTime[1] }}</div>
          <div>{{ $t('build.mCrocksPerHour') }}{{ mCrocksPerHour }}</div>
          <div>{{ $t('build.mCDMperRun') }}{{ mCDMperRun }}</div>
          <div>{{ $t('build.mCDMperHour') }}{{ mCDMperHour }}</div>
          </div>
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
</template>

<script>
import AppRadioButton from "@/components/AppRadioButton.vue";
import AppSlider from "@/components/AppSlider.vue";
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
    AppSlider,
    ShipBuff
  },
  data: function() {
    return {
      isLeftShown: true,
      panX: 2,
      panY: 2,
      panStart: true,
      zoom: 0.3,
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
        operation: [0, 0, 0, 0, 0, 0],
        navigation: 0,
        mining1: 0,
        mining2: 0,
        spaceMining: 0,
        dm1: 0,
        dm2: 0
      },
      mineDiff: 60.233,
      showMineCalc: true
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
      let thrustBuff = 1 + this.skills.navigation * 0.01;
      let miningBuff =
        1 +
        this.skills.mining1 * 0.02 +
        this.skills.mining2 * 0.04 +
        this.skills.spaceMining * 0.02;
      let dmRate = 1 + this.skills.dm1 * 0.1 + this.skills.dm2 * 0.15;

      let shipCargoBuffArray = this.ship[12].find(function(el) {
        return el[0] === 43;
      });
      let shipCargoBuff = 1;
      if (typeof shipCargoBuffArray !== "undefined") {
        shipCargoBuff += shipCargoBuffArray[1] / 10000;
      }

      let shipThrustBuffArray = this.ship[12].find(function(el) {
        return el[0] === 42;
      });
      let shipThrustBuff = 1;
      if (typeof shipThrustBuffArray !== "undefined") {
        shipThrustBuff += shipThrustBuffArray[1] / 10000;
      }

      let shipMiningBuffArray = this.ship[12].find(function(el) {
        return el[0] === 11;
      });
      let shipMiningBuff = 1;
      if (typeof shipMiningBuffArray !== "undefined") {
        shipMiningBuff += shipMiningBuffArray[1] / 10000;
      }

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
          thrust += modInfo[8] * shipThrustBuff * thrustBuff;
          mass += modInfo[9];
          if (this.installedList[i][2] < 9) {
            dps += modInfo[12] / (modInfo[20] / 60);
          }
          mining += modInfo[32] * shipMiningBuff * miningBuff;
          cargo += modInfo[10] * shipCargoBuff;
        }
      }

      return {
        powerUsage,
        powerOutput,
        energy,
        shield,
        regen: regen / 10,
        hp,
        speed: Math.floor(thrust * 10000 / mass) + 1,
        dps: Math.floor(dps),
        mining: Math.floor(mining),
        cargo: Math.floor(cargo - 1),
        dmRate
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
    },
    //index 0 = secs, index 1 = HH:MM:SS
    mCminingTime() {
      let miningTime = Math.ceil(
        this.stats.cargo / (10 * this.stats.mining / this.mineDiff / 1.1)
      );
      if (this.stats.mining === 0) {
        return [miningTime, "¯\\_(ツ)_/¯"];
      } else {
        return [miningTime, this.toHHMMSS(miningTime)];
      }
    },
    mCtransitTime() {
      let transitTime = Math.ceil(200000 / this.stats.speed);
      if (this.stats.mining === 0) {
        return [transitTime, "¯\\_(ツ)_/¯"];
      } else {
        return [transitTime, this.toHHMMSS(transitTime)];
      }
    },
    mCtotalTime() {
      let totalTime = this.mCminingTime[0] + this.mCtransitTime[0] * 2;
      if (this.stats.mining === 0) {
        return [totalTime, "¯\\_(ツ)_/¯"];
      } else {
        return [totalTime, this.toHHMMSS(totalTime)];
      }
    },
    mCrocksPerHour() {
      return Math.floor(this.stats.cargo / this.mCtotalTime[0] * 3600);
    },
    mCDMperRun() {
      if (this.stats.mining === 0) {
        return 0;
      } else {
        return Math.round(
          this.stats.mining *
            this.mCminingTime[0] /
            60 *
            this.stats.dmRate *
            (Math.pow(this.stats.cargo * this.mineDiff, -0.19) * 1820.794 -
              1.10674) /
            1000000
        );
      }
    },
    mCDMperHour() {
      return (
        Math.round(this.mCDMperRun / this.mCtotalTime[0] * 360000000) / 100000
      );
    }
  },
  methods: {
    toHHMMSS(sec) {
      let hours = Math.floor(sec / 3600);
      let minutes = Math.floor((sec - hours * 3600) / 60);
      let seconds = sec - hours * 3600 - minutes * 60;
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return hours + ":" + minutes + ":" + seconds;
    },
    saveSkills() {
      localStorage.setItem("skills", JSON.stringify(this.skills));
    },
    loadSkills() {
      if (localStorage.getItem("skills") !== null) {
        this.skills = JSON.parse(localStorage.getItem("skills"));
      }
    },
    pan: function(event) {
      if (this.panStart) {
        this.panX = event.deltaX;
        this.panY = event.deltaY;
        this.panStart = false;
      } else {
        this.padding.top += event.deltaY - this.panY;
        this.panY = event.deltaY;
        this.padding.right -= event.deltaX - this.panX;
        this.panX = event.deltaX;
      }
      if (event.isFinal) {
        this.panStart = true;
      }
    },
    resetView: function() {
      this.zoom = 0.3;
      this.padding = { top: 30, right: 15 };
    },
    clearMod() {
      this.installedList = [];
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
  display: block;
}
.expand-btn {
  top: 0;
  right: 0;
  line-height: 26px;
  text-align: center;
  height: 26px;
  width: 26px;
  border-radius: 13px;
  position: absolute;
  background-color: var(--highlight-color);
  color: var(--bg-color);
  cursor: pointer;
}
.build {
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
  cursor: move;
}

.right-window {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  z-index: 1200;
  box-sizing: border-box;
  background-color: var(--bg-color);
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
  display: block;
  margin: 5px;
  padding: 3px;
  cursor: default;
  text-align: left;
  height: 100%;
  overflow: auto;
}

.text-zone {
  text-align: left;
  line-height: 24px;
}

.module-cont-bottom {
  box-sizing: border-box;
  flex-grow: 1;
  background-color: var(--bg-color);
  margin: 5px;
  border-radius: 3px;
}
</style>