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
          <ShipInfoTile
            v-for="tile in layout"
            :coord="tile"
            :key="layout.indexOf(tile)"
            :padding="padding"
            :zoom="zoom"
            @selected="tileClick">
          </ShipInfoTile>
          <ShipInfoTileMod
            v-for="mod in installedList"
            :mod="mod"
            :key="installedList.indexOf(mod) + 500"
            :padding="padding"
            :zoom="zoom">
          </ShipInfoTileMod>
        </div>
    </div>
  </div>
</template>

<script>
import AppRadioButton from "@/components/AppRadioButton.vue";
//import ShipInfoEl from "@/components/ShipInfoEl.vue";
//import ShipBuff from "@/components/ShipBuff.vue";
import ShipInfoTile from "@/components/ShipInfoTile.vue";
import ShipInfoTileMod from "@/components/ShipInfoTileMod.vue";
import { GD_Shipbody, GD_Technology } from "@/data/game.js";
import { shipChoice } from "@/data/shipInfo.js";
import { mRetro, lRetro, modChoice } from "@/data/modInfo.js";
export default {
  name: "build",
  components: {
    ShipInfoTile,
    ShipInfoTileMod,
    AppRadioButton
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
      this.installedList.push({ coord: coord, modId: this.modId, spec: this.module });
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
/* @media (min-width: 800px) and (min-height: 600px) { */
@media (min-width: 100px) and (min-height: 100px) {
  .mobile-warn {
    display: none;
  }
  .desktop {
    display: flex;
  }
}
</style>
