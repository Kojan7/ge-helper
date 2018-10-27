<template>
  <div class="build">
    <div class="main-panel">
      <div class="row" v-if="showHullInput">
        <select class="select" v-model.number="hullOption.type">
          <option v-for="option in hullChoice.type"
            :value="option.value"
            :key="option.value">
            {{ $i18n.locale === "en" ? option.texten : option.textzh }}
          </option>
        </select>
        <select class="select" v-model.number="hullOption.size">
          <option v-for="option in hullChoice.size"
            :value="option.value"
            :key="option.value">
            {{ $i18n.locale === "en" ? option.texten : option.textzh }}
          </option>
        </select>
        <select class="select hull-level-select" v-model.number="hullOption.level">
          <option v-for="option in hullChoice.level"
            :value="option.value"
            :key="option.value">
            {{ $i18n.locale === "en" ? option.text : option.text }}
          </option>
        </select>
      </div>
      <div class="row" v-if="showHullInput">
        <app-slider
          @input="zoom=$event"
          :text="$t('build.zoom')"
          :min=0.1
          :max=1
          :step=0.002
          :displayOutput=false
          :value="zoom"/>
      </div>
      <div class="row">
        <div class="icon-btn" :title="$t('build.function')" @click="showInput = !showInput">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"
              fill="var(--dark-text-color)"/>
          </svg>
        </div>
        <div class="icon-btn" :title="$t('build.viewReset')" @click="resetView">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M5 15H3v4c0 1.1.9 2 2 2h4v-2H5v-4zM5 5h4V3H5c-1.1 0-2 .9-2
              2v4h2V5zm14-2h-4v2h4v4h2V5c0-1.1-.9-2-2-2zm0 16h-4v2h4c1.1 0 2-.9 2-2v-4h-2v4zM12
              9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
              fill="var(--dark-text-color)"/>
          </svg>
        </div>
        <div class="icon-btn" :title="$t('build.undo')" @click="undo">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88
              5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"
              fill="var(--dark-text-color)"/>
          </svg>
        </div>
        <!-- <div class="icon-btn" :title="$t('build.blueprints')">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17
            11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"
            fill="var(--dark-text-color)"/>
          </svg>
        </div> -->
        <div class="icon-btn" :title="$t('build.hide')" @click="showHullInput = !showHullInput">
          <svg width="24" height="24" viewBox="0 0 24 24"
            :style="expandBtnStyle">
            <path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
              fill="var(--dark-text-color)"/>
          </svg>
        </div>
      </div>
      <div class="row">
        <app-radio-button
          :options="modChoice.size"
          @chose="module.size=$event"
          :value="module.size"/>
      </div>
      <div class="row">
        <app-slider
          @input="module.level=$event"
          :text="$t('level')"
          :min=1
          :max=12
          :value="module.level"/>
      </div>
      <app-radio-button class="wrap"
        :options="modChoice.item"
        @chose="module.item=$event"/>
    </div>
    <v-touch class="v-touch" @panstart="initMoveLayout" @pan="moveLayout" @pinch="zoomLayout">
      <div class="text-zone">
        <hull-info-buff v-bind:buffs="hull[12]"></hull-info-buff>
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
      <hull-info-tile
        v-for="tile in layout"
        :coord="tile"
        :key="layout.indexOf(tile)+ 1000"
        :padding="padding"
        :zoom="zoom"
        @selected="tileClick">
      </hull-info-tile>
      <hull-info-tile-mod
        v-for="mod in installedList"
        :mod="mod"
        :key="installedList.indexOf(mod)"
        :padding="padding"
        :zoom="zoom"
        @deleted="removeMod">
      </hull-info-tile-mod>
    </v-touch>
    <div v-if="showInput" class="fn-panel">
      <div class="btn" @click="clearMod">{{ $t('build.clearMod') }}</div>
      <div class="btn" @click="showInput = !showInput">{{ $t('build.exit') }}</div>
      <span class="hl">{{ $t('build.skills') }}</span>
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
      <br>
      <app-slider
        @input="skills.navigation=$event"
        :text="$t('build.navigation')"
        :min=0
        :max=20
        :value="skills.navigation">
      </app-slider>
      <app-slider
        @input="skills.energy=$event"
        :text="$t('build.energy')"
        :min=0
        :max=30
        :value="skills.energy">
      </app-slider>
      <app-slider
        @input="skills.shield=$event"
        :text="$t('build.shield')"
        :min=0
        :max=20
        :value="skills.shield">
      </app-slider>
      <app-slider
        @input="skills.shieldRegen=$event"
        :text="$t('build.shieldRegen')"
        :min=0
        :max=20
        :value="skills.shieldRegen">
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
      <div class="btn" @click="saveSkills">{{ $t('build.save') }}</div>
      <br><br>
      <span class="hl">{{ $t('build.export') }}</span>
      <div>{{ $t('build.exportDesc') }}</div>
      <textarea ref="outputText" v-model="outputText" readonly></textarea><br>
      <div class="btn" @click="copyOutputText">{{ $t('build.copy') }}</div>
      <br>
      <span class="hl">{{ $t('build.import') }}</span>
      <textarea v-model="inputText" placeholder="[]"></textarea><br>
      <div class="btn" @click="installedList = inputTextArray">{{ $t('build.apply') }}</div>
      <br><br>
      <span class="hl">{{ $t('build.miningCalc') }}</span>
      <div>{{ $t('build.miningDiff') }}<input v-model.number="mineDiff" placeholder="60.233"></div>
      <div><label>
        <input type="checkbox" id="checkbox" v-model="showMineCalc">{{ $t('build.showMineCalc') }}
      </label></div>
    </div>
  </div>
</template>

<script>
/* eslint no-mixed-operators: 0 */
import AppRadioButton from '@/components/AppRadioButton.vue';
import AppSlider from '@/components/AppSlider.vue';
import HullInfoBuff from '@/components/HullInfoBuff.vue';
import HullInfoTile from '@/components/HullInfoTile.vue';
import HullInfoTileMod from '@/components/HullInfoTileMod.vue';
import { mapState } from 'vuex';

export default {
  name: 'Build',
  components: {
    AppRadioButton,
    AppSlider,
    HullInfoBuff,
    HullInfoTile,
    HullInfoTileMod,
  },
  data() {
    return {
      showInput: false,
      showHullInput: true,
      showMineCalc: true,
      mineDiff: 60.233,
      panX: 2,
      panY: 2,
      zoom: 0.3,
      padding: {
        top: 30,
        right: 15,
      },
      hullOption: {
        type: 0,
        size: 0,
        level: 1,
      },
      module: {
        size: 0,
        level: 1,
        item: 0,
      },
      oldestInstalledList: [],
      olderInstalledList: [],
      oldInstalledList: [],
      installedList: [],
      inputText: '',
      skills: {
        operation: [0, 0, 0, 0, 0, 0],
        navigation: 0,
        mining1: 0,
        mining2: 0,
        spaceMining: 0,
        dm1: 0,
        dm2: 0,
        energy: 0,
        shield: 0,
        shieldRegen: 0,
      },
    };
  },
  computed: {
    ...mapState({
      hulls: state => state.data.shipbody,
      techs: state => state.data.technology,
      mods: state => state.data.component,
      hullChoice: state => state.data.shipChoice,
      modMap: state => state.data.modMap,
      modChoice: state => state.data.modChoice,
    }),
    expandBtnStyle() {
      if (this.showHullInput) {
        return '';
      }
      return 'transform: rotate(180deg)';
    },
    hullId() {
      return (
        (this.hullOption.size * 84) +
        (this.hullOption.type * 12) +
        this.hullOption.level
      );
    },
    hull() {
      return this.hulls[this.hullId];
    },
    layout() {
      if (this.hull[1] < 36) {
        return this.techs[this.hull[1]][11].slice(0, this.hull[6]);
      }
      // workaround for titans
      return this.techs[this.hull[1] - 61][11].slice(0, this.hull[6]);
    },
    modId() {
      return this.modMap[this.module.size][this.module.item] + this.module.level;
    },
    stats() {
      const operationBuff = 1 + (this.skills.operation[this.hullOption.size] * 0.1);
      const thrustBuff = 1 + (this.skills.navigation * 0.01);
      const miningBuff =
        1 +
        (this.skills.mining1 * 0.02) +
        (this.skills.mining2 * 0.04) +
        (this.skills.spaceMining * 0.02);
      const dmRate =
        1 +
        (this.skills.dm1 * 0.1) +
        (this.skills.dm2 * 0.15);
      const energyBuff = 1 + (this.skills.energy * 0.01);
      const shieldBuff = 1 + (this.skills.shield * 0.05);
      const shieldRegenBuff = 1 + (this.skills.shieldRegen * 0.02);

      const shipDefBuffArray = this.hull[12].find(el => el[0] === 48);
      let shipDefBuff = 1;
      if (typeof shipDefBuffArray !== 'undefined') {
        shipDefBuff += shipDefBuffArray[1] / 10000;
      }

      const shipCargoBuffArray = this.hull[12].find(el => el[0] === 43);
      let shipCargoBuff = 1;
      if (typeof shipCargoBuffArray !== 'undefined') {
        shipCargoBuff += shipCargoBuffArray[1] / 10000;
      }

      const shipThrustBuffArray = this.hull[12].find(el => el[0] === 42);
      let shipThrustBuff = 1;
      if (typeof shipThrustBuffArray !== 'undefined') {
        shipThrustBuff += shipThrustBuffArray[1] / 10000;
      }

      const shipMiningBuffArray = this.hull[12].find(el => el[0] === 11);
      let shipMiningBuff = 1;
      if (typeof shipMiningBuffArray !== 'undefined') {
        shipMiningBuff += shipMiningBuffArray[1] / 10000;
      }

      let i;
      let powerUsage = 0;
      let powerOutput = Math.floor(this.hull[7] * operationBuff);
      let energy = this.hull[11];
      let shield = 0;
      let regen = 0;
      let hp = 0;
      let thrust = this.hull[8];
      let mass = this.hull[9];
      let dps = 0;
      let mining = 0;
      let cargo = this.hull[10];

      for (i = 0; i < this.installedList.length; i += 1) {
        if (this.installedList[i][1] < 5) {
          const modInfo = this.mods[this.installedList[i][4]];
          powerUsage += modInfo[6];
          powerOutput += modInfo[7];
          energy += modInfo[11] * energyBuff;
          shield += modInfo[34] * shieldBuff * shipDefBuff;
          regen += modInfo[35] * shieldRegenBuff;
          hp += modInfo[5];
          thrust += modInfo[8] * shipThrustBuff * thrustBuff;
          mass += modInfo[9];
          if (this.installedList[i][2] < 9 || this.installedList[i][2] > 20) {
            dps += modInfo[12] / (modInfo[20] / 60);
          }
          mining += modInfo[33] * shipMiningBuff * miningBuff;
          cargo += modInfo[10] * shipCargoBuff;
        }
      }

      return {
        powerUsage,
        powerOutput,
        energy: Math.floor(energy),
        shield: Math.floor(shield),
        regen: Math.floor(regen / 10),
        hp,
        speed: Math.floor((thrust * 10000) / mass) + 1,
        dps: Math.floor(dps),
        mining: Math.floor(mining),
        cargo: Math.floor(cargo - 1),
        dmRate,
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
    // index 0 = secs, index 1 = HH:MM:SS
    mCminingTime() {
      const miningTime =
        Math.ceil(this.stats.cargo / ((10 * this.stats.mining) / this.mineDiff / 1.1));
      if (this.stats.mining === 0) {
        return [miningTime, '¯\\_(ツ)_/¯'];
      }
      return [miningTime, this.toHHMMSS(miningTime)];
    },
    mCtransitTime() {
      const transitTime = Math.ceil(200000 / this.stats.speed);
      if (this.stats.mining === 0) {
        return [transitTime, '¯\\_(ツ)_/¯'];
      }
      return [transitTime, this.toHHMMSS(transitTime)];
    },
    mCtotalTime() {
      const totalTime = this.mCminingTime[0] + (this.mCtransitTime[0] * 2);
      if (this.stats.mining === 0) {
        return [totalTime, '¯\\_(ツ)_/¯'];
      }
      return [totalTime, this.toHHMMSS(totalTime)];
    },
    mCrocksPerHour() {
      return Math.floor((this.stats.cargo / this.mCtotalTime[0]) * 3600);
    },
    mCDMperRun() {
      if (this.stats.mining === 0) {
        return 0;
      }
      return Math.round((((this.stats.mining * this.mCminingTime[0]) / 60) *
            this.stats.dmRate *
            ((((this.stats.cargo * this.mineDiff) ** -0.19) * 1820.794) -
              1.10674)) /
          1000000);
    },
    mCDMperHour() {
      return (
        Math.round((this.mCDMperRun / this.mCtotalTime[0]) * 360000000) / 100000
      );
    },
  },
  methods: {
    initMoveLayout(event) {
      this.panX = event.deltaX;
      this.panY = event.deltaY;
    },
    moveLayout(event) {
      this.padding.top += event.deltaY - this.panY;
      this.panY = event.deltaY;
      this.padding.right -= event.deltaX - this.panX;
      this.panX = event.deltaX;
    },
    zoomLayout(event) {
      this.zoom = this.zoom * ((event.scale - 1) / 50 + 1);
    },
    toHHMMSS(sec) {
      const hours = Math.floor(sec / 3600);
      let minutes = Math.floor((sec - (hours * 3600)) / 60);
      let seconds = sec - (hours * 3600) - (minutes * 60);
      if (minutes < 10) {
        minutes = `0${minutes}`;
      }
      if (seconds < 10) {
        seconds = `0${seconds}`;
      }
      return `${hours}:${minutes}:${seconds}`;
    },
    resetView() {
      this.zoom = 0.3;
      this.padding = { top: 30, right: 15 };
    },
    clearMod() {
      this.installedList = [];
    },
    tileCoordGen(coord, position) {
      switch (position) {
        case 'bottomLeft':
          return [coord[0] + 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)];
        case 'bottomRight':
          return [coord[0] + 1, coord[1] - (coord[0] % 2 ? 1 : 0)];
        case 'bottom':
          return [coord[0] + 2, coord[1]];
        case 'mostBottomLeft':
          return [coord[0] + 2, coord[1] + 1];
        case 'mostBottomRight':
          return [coord[0] + 2, coord[1] - 1];
        case 'left':
          return [coord[0], coord[1] + 1];
        case 'right':
          return [coord[0], coord[1] - 1];
        case 'top':
          return [coord[0] - 2, coord[1]];
        case 'topLeft':
          return [coord[0] - 1, coord[1] + 1 - (coord[0] % 2 ? 1 : 0)];
        case 'topRight':
          return [coord[0] - 1, coord[1] - (coord[0] % 2 ? 1 : 0)];
        default:
          return coord;
      }
    },
    tileClick(coord) {
      if (this.module.size === 0 && this.module.item > 20) {
        // S sized aircraft exception prevention
        return;
      }
      this.undoLog();
      this.installedList.push([
        coord, // 0
        this.module.size, // 1
        this.module.item, // 2
        this.module.level, // 3
        this.modId, // 4
      ]);
      switch (this.module.size) {
        case 3: // M+
          this.tileExpand(this.tileCoordGen(coord, 'bottomLeft'), 10);
          this.tileExpand(this.tileCoordGen(coord, 'bottomRight'), 11);
          this.tileExpand(this.tileCoordGen(coord, 'bottom'), 12);
          break;
        case 1: // M
          this.tileExpand(this.tileCoordGen(coord, 'bottomLeft'), 5);
          this.tileExpand(this.tileCoordGen(coord, 'bottomRight'), 6);
          break;
        case 2: // L
          this.tileExpand(this.tileCoordGen(coord, 'bottomLeft'), 7);
          this.tileExpand(this.tileCoordGen(coord, 'bottomRight'), 8);
          this.tileExpand(this.tileCoordGen(coord, 'bottom'), 9);
          this.tileExpand(this.tileCoordGen(coord, 'mostBottomLeft'), 5);
          this.tileExpand(this.tileCoordGen(coord, 'mostBottomRight'), 6);
          break;
        case 4: // L+
          this.tileExpand(this.tileCoordGen(coord, 'bottomLeft'), 15);
          this.tileExpand(this.tileCoordGen(coord, 'bottomRight'), 16);
          this.tileExpand(this.tileCoordGen(coord, 'left'), 10);
          this.tileExpand(this.tileCoordGen(coord, 'right'), 11);
          if (this.module.item < 11 || this.module.item > 20) {
            this.tileExpand(this.tileCoordGen(coord, 'topLeft'), 7);
            this.tileExpand(this.tileCoordGen(coord, 'topRight'), 8);
            this.tileExpand(this.tileCoordGen(coord, 'top'), 17);
          } else {
            this.tileExpand(this.tileCoordGen(coord, 'topLeft'), 13);
            this.tileExpand(this.tileCoordGen(coord, 'topRight'), 14);
          }
          break;
        default:
          break;
      }
    },
    tileExpand(coord, size) {
      const duplicate =
        this.installedList.find(el => el[0][0] === coord[0] && el[0][1] === coord[1]);
      if (typeof duplicate !== 'undefined') {
        this.removeMod(duplicate, false);
      }
      this.installedList.push([coord, size, this.module.item]);
    },
    removeMod(mod, human = true) {
      if (human) {
        this.undoLog();
      }
      this.installedList.splice(this.installedList.indexOf(mod), 1);
    },
    undoLog() {
      this.oldestInstalledList = this.olderInstalledList.slice();
      this.olderInstalledList = this.oldInstalledList.slice();
      this.oldInstalledList = this.installedList.slice();
    },
    undo() {
      this.installedList = this.oldInstalledList.slice();
      this.oldInstalledList = this.olderInstalledList.slice();
      this.olderInstalledList = this.oldestInstalledList.slice();
    },
    saveSkills() {
      localStorage.setItem('skills', JSON.stringify(this.skills));
    },
    loadSkills() {
      if (localStorage.getItem('skills') !== null) {
        this.skills = JSON.parse(localStorage.getItem('skills'));
      }
    },
    copyOutputText() {
      this.$refs.outputText.select();
      document.execCommand('copy');
    },
  },
  beforeMount() {
    this.loadSkills();
  },
};
</script>

<style scoped>
.select,
.slider,
.lbl-group {
  color: var(--dark-text-color);
  background-color: var(--bg-color);
  border-radius: 0;
  box-shadow: none;
}
.hl {
  display: block;
  color: var(--dark-text-color);
}
input[type="range"] {
  background-color: var(--bg-color);
}
.btn {
  background-color: var(--primary-color);
  color: var(--dark-text-color);
}
.btn:active {
  background-color: var(--alt-primary-color);
  color: var(--text-color);
}
.wrap {
  flex-wrap: wrap;
  overflow-y: auto;
  flex: 1 1 auto;
  max-height: 500px;
}
.build {
  background-color: var(--base-color);
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  margin: 48px 0 0 0;
  max-width: none;
  overflow: hidden;
  padding: 0;
}
.main-panel {
  z-index: 100;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  background-color: var(--bg-color);
  color: var(--dark-text-color);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  height: 36px;
  justify-content: center;
  align-items: center;

}
.hull-level-select {
  flex-grow: 0;
  width: 80px;
}
.icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
  flex-grow: 1;
  cursor: pointer;
}
.icon-btn:hover {
  background-color: var(--alt-text-color);
}
.icon-btn:active {
  background-color: var(--primary-color);
}
.v-touch {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  cursor: move;
}
.text-zone {
  position: absolute;
  left: 320px;
  top: 10px;
}
.fn-panel {
  background-color: var(--bg-color);
  z-index: 200;
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  padding: 5px;
  color: var(--dark-text-color);
  overflow-y: auto;
}
@media screen and (max-width: 700px) {
  .main-panel {
    width: 240px;
  }
  .text-zone {
    left: 260px;
  }
}
</style>
