<template>
  <div class="build">
    <v-layout column class="left-layout" v-if="isLeftShown">
      <v-card class="left">
        <v-flex d-flex>
          <v-select dense
            v-model.number="shipOption.type"
            :items="$i18n.locale === 'en' ? shipChoice.type : shipChoice.typecn">
          </v-select>
          <v-select dense
            v-model.number="shipOption.size"
            :items="$i18n.locale === 'en' ? shipChoice.size : shipChoice.sizecn">
          </v-select>
          <v-select dense
            v-model.number="shipOption.level"
            :items="shipChoice.level">
          </v-select>
        </v-flex>
        <v-slider class="row"
          v-model="zoom"
          :label="$t('build.zoom')"
          :min=0.1
          :max=1
          step=0.002
          always-dirty>
        </v-slider>
        <v-card-actions>
          <v-btn flat color="primary" icon @click="showPanel = !showPanel">
            <v-icon>extension</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" icon @click="resetView">
            <v-icon>adjust</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" icon disabled>
            <v-icon>undo</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" icon @click="isLeftShown = false">
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <div>
        <v-flex d-flex>
          <v-btn-toggle dark class="btn-toggle" mandatory v-model.number="module.size">
            <v-btn flat class="btn-toggle"
              v-for="option in modChoice.size"
              :key="option.value"
              :value="option.value">
              {{ $i18n.locale === "en" ? option.texten : option.text }}
            </v-btn>
          </v-btn-toggle>
        </v-flex>
        <v-flex d-flex wrap="false">
          <v-btn-toggle dark class="btn-toggle-vertical" mandatory v-model.number="module.level">
            <v-btn flat class="btn-toggle"
              v-for="option in shipChoice.level"
              :key="option.value"
              :value="option.value">
              {{ option.text }}
            </v-btn>
          </v-btn-toggle>
          <v-btn-toggle d-flex class="btn-toggle-wrap" mandatory v-model.number="module.item">
            <v-btn flat class="btn-toggle row"
              v-for="option in $i18n.locale === 'en' ? modChoice.item : modChoice.itemcn"
              :key="option.value"
              :value="option.value">
              {{ option.text }}
            </v-btn>
          </v-btn-toggle>
        </v-flex>
      </div>
    </v-layout>
    <v-btn v-else icon color="primary" @click="isLeftShown = true">
      <v-icon>add</v-icon>
    </v-btn>
    <v-layout class="right-layout">
      <v-touch class="preview" @pan="pan">
        <div class="text-zone">
          <ship-info-buff v-bind:buffs="ship[12]"></ship-info-buff>
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
      </v-touch>
    </v-layout>

    <v-dialog v-model="showPanel" class="right-window">
      <v-card>
        <v-card-text>
          <v-btn @click="clearMod">{{ $t('build.clearMod') }}</v-btn>
          <v-btn @click="showPanel = !showPanel">{{ $t('build.exit') }}</v-btn>
          <span class="gras">{{ $t('build.skills') }}</span>
          <v-slider class="row"
            v-model.number="skills.operation[0]"
            :label="$t('build.operation0') + skills.operation[0]"
            :min=0
            :max=30>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.operation[1]"
            :label="$t('build.operation1') + skills.operation[1]"
            :min=0
            :max=30>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.operation[2]"
            :label="$t('build.operation2') + skills.operation[2]"
            :min=0
            :max=30>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.operation[3]"
            :label="$t('build.operation3') + skills.operation[3]"
            :min=0
            :max=30>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.operation[4]"
            :label="$t('build.operation4') + skills.operation[4]"
            :min=0
            :max=30>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.operation[5]"
            :label="$t('build.operation5') + skills.operation[5]"
            :min=0
            :max=30>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.navigation"
            :label="$t('build.navigation') + skills.navigation"
            :min=0
            :max=20>
          </v-slider>
          <br>
          <v-slider class="row"
            v-model.number="skills.mining1"
            :label="$t('build.mining1') + skills.mining1"
            :min=0
            :max=30>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.mining2"
            :label="$t('build.mining2') + skills.mining2"
            :min=0
            :max=10>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.spaceMining"
            :label="$t('build.spaceMining') + skills.spaceMining"
            :min=0
            :max=30>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.dm1"
            :label="$t('build.dm1') + skills.dm1"
            :min=0
            :max=10>
          </v-slider>
          <v-slider class="row"
            v-model.number="skills.dm2"
            :label="$t('build.dm2') + skills.dm2"
            :min=0
            :max=10>
          </v-slider>
          <v-btn @click="saveSkills">{{ $t('build.save') }}</v-btn>
          <v-textarea
            outline
            readonly
            v-model="outputText"
            :label="$t('build.export')+ ': ' + $t('build.exportDesc')">
          </v-textarea>
          <v-textarea
            outline
            v-model="inputText"
            placeholder="[]"
            :label="$t('build.import')">
          </v-textarea>
          <v-btn @click="installedList = inputTextArray">{{ $t('build.apply') }}</v-btn>
          <v-text-field
            :label="$t('build.miningCalc')"
            v-model.number="mineDiff"
            outline>
          </v-text-field>
          <v-switch
            :label="$t('build.showMineCalc')"
            v-model="showMineCalc">
          </v-switch>
        </v-card-text>
      </v-card>

    </v-dialog>

  </div>
</template>

<script>
//import ShipInfoEl from "@/components/ShipInfoEl.vue";
import ShipInfoBuff from '@/components/ShipInfoBuff.vue';
import ShipInfoTile from '@/components/ShipInfoTile.vue';
import ShipInfoTileMod from '@/components/ShipInfoTileMod.vue';
export default {
  name: 'build',
  components: {
    ShipInfoBuff,
    ShipInfoTile,
    ShipInfoTileMod
  },
  data() {
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
      shipOption: {
        type: 0,
        size: 0,
        level: 1
      },
      module: {
        size: 0,
        level: 1,
        item: 0
      },
      installedList: [],
      showPanel: false,
      showOutput: false,
      inputText: '',
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
    shipbody() {
      return this.$store.state.data.shipbody;
    },
    technology() {
      return this.$store.state.data.technology;
    },
    component() {
      return this.$store.state.data.component;
    },
    shipChoice() {
      return this.$store.state.data.shipChoice;
    },
    modMap() {
      return this.$store.state.data.modMap;
    },
    modChoice() {
      return this.$store.state.data.modChoice;
    },
    shipId() {
      return (
        this.shipOption.size * 84 +
        this.shipOption.type * 12 +
        this.shipOption.level
      );
    },
    ship() {
      return this.shipbody[this.shipId];
    },
    layout() {
      if (this.ship[1] < 36) {
        return this.technology[this.ship[1]][11].slice(0, this.ship[6]);
      } else {
        // workaround for titans
        return this.technology[this.ship[1] - 61][11].slice(0, this.ship[6]);
      }
    },
    modId() {
      return this.modMap[this.module.size][this.module.item] + this.module.level
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
      if (typeof shipCargoBuffArray !== 'undefined') {
        shipCargoBuff += shipCargoBuffArray[1] / 10000;
      }

      let shipThrustBuffArray = this.ship[12].find(function(el) {
        return el[0] === 42;
      });
      let shipThrustBuff = 1;
      if (typeof shipThrustBuffArray !== 'undefined') {
        shipThrustBuff += shipThrustBuffArray[1] / 10000;
      }

      let shipMiningBuffArray = this.ship[12].find(function(el) {
        return el[0] === 11;
      });
      let shipMiningBuff = 1;
      if (typeof shipMiningBuffArray !== 'undefined') {
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
          let modInfo = this.component[this.installedList[i][4]];
          powerUsage += modInfo[6];
          powerOutput += modInfo[7];
          energy += modInfo[11];
          shield += modInfo[34];
          regen += modInfo[35];
          hp += modInfo[5];
          thrust += modInfo[8] * shipThrustBuff * thrustBuff;
          mass += modInfo[9];
          if (this.installedList[i][2] < 9) {
            dps += modInfo[12] / (modInfo[20] / 60);
          }
          mining += modInfo[33] * shipMiningBuff * miningBuff;
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
        speed: Math.floor((thrust * 10000) / mass) + 1,
        dps: Math.floor(dps),
        mining: Math.floor(mining),
        cargo: Math.floor(cargo - 1),
        dmRate
      };
    },
    statsPowerColor() {
      let powerColor = '';
      if (this.stats.powerUsage > this.stats.powerOutput) {
        powerColor = 'color:red';
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
        this.stats.cargo / ((10 * this.stats.mining) / this.mineDiff / 1.1)
      );
      if (this.stats.mining === 0) {
        return [miningTime, '¯\\_(ツ)_/¯'];
      } else {
        return [miningTime, this.toHHMMSS(miningTime)];
      }
    },
    mCtransitTime() {
      let transitTime = Math.ceil(200000 / this.stats.speed);
      if (this.stats.mining === 0) {
        return [transitTime, '¯\\_(ツ)_/¯'];
      } else {
        return [transitTime, this.toHHMMSS(transitTime)];
      }
    },
    mCtotalTime() {
      let totalTime = this.mCminingTime[0] + this.mCtransitTime[0] * 2;
      if (this.stats.mining === 0) {
        return [totalTime, '¯\\_(ツ)_/¯'];
      } else {
        return [totalTime, this.toHHMMSS(totalTime)];
      }
    },
    mCrocksPerHour() {
      return Math.floor((this.stats.cargo / this.mCtotalTime[0]) * 3600);
    },
    mCDMperRun() {
      if (this.stats.mining === 0) {
        return 0;
      } else {
        return Math.round(
          (((this.stats.mining * this.mCminingTime[0]) / 60) *
            this.stats.dmRate *
            (Math.pow(this.stats.cargo * this.mineDiff, -0.19) * 1820.794 -
              1.10674)) /
          1000000
        );
      }
    },
    mCDMperHour() {
      return (
        Math.round((this.mCDMperRun / this.mCtotalTime[0]) * 360000000) / 100000
      );
    }
  },
  methods: {
    toHHMMSS(sec) {
      let hours = Math.floor(sec / 3600);
      let minutes = Math.floor((sec - hours * 3600) / 60);
      let seconds = sec - hours * 3600 - minutes * 60;
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return hours + ':' + minutes + ':' + seconds;
    },
    saveSkills() {
      localStorage.setItem('skills', JSON.stringify(this.skills));
    },
    loadSkills() {
      if (localStorage.getItem('skills') !== null) {
        this.skills = JSON.parse(localStorage.getItem('skills'));
      }
    },
    pan(event) {
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
    resetView() {
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
      } else if (this.module.size === 4 && (this.module.item < 11 || this.module.item > 20)) {
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
      if (typeof duplicate !== 'undefined') {
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
.build {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 24px;
  overflow: hidden;
}
.btn-toggle {
  overflow-x: auto;
  overflow-y: hidden;
  flex-grow: 1;
  flex-basis: 1;
}
.btn-toggle-vertical {
  flex-direction: column;
}
.btn-toggle-wrap {
  flex-wrap: wrap;
  flex-grow: 1;
}
.left-layout {
  position: relative;
  width: 300px;
  flex-grow: 0;
  overflow-y: auto;
}
.right-layout {
  position: relative;
}
.left {
  padding: 0 10px;
  margin-bottom: 12px;
}
.row {
  height: 32px;
  margin-bottom: 0;
  margin-top: 0;
}
.preview {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 5px;
  cursor: move;
}
.gras {
  font-weight: bold;
  display: block;
}
/* .select {
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
} */
</style>
