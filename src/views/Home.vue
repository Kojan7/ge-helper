<template>
  <div class="home">
    <h1>{{ $t('title') }} 0.5.3</h1>
    <locale-changer></locale-changer>
    <h3 style="color:red">{{ $t('important') }}</h3>
    <p>{{ $t('repo') }}</p>
    <a href="https://github.com/zyntuz/era-plus">https://github.com/zyntuz/era-plus</a>
    <br>
    <div class="btn" @click="clearStorage">{{ $t('clear') }}</div>
    <p>{{ $t('clearDesc') }} </p>
    <p>{{ $t('dataVer') }}2018-07-31</p>
    <h3>{{ $t('buildDesc') }}</h3>
    <p>{{ $t('computer') }}</p>
    <p>{{ $t('warning') }}</p>
  </div>
</template>

<script>
import LocaleChanger from "@/components/LocaleChanger.vue";

export default {
  name: "Home",
  components: {
    LocaleChanger
  },
  methods: {
    clearStorage() {
      localStorage.clear();
    }
  }
};
</script>
<style scoped>
.home {
  padding: 8px;
  min-width: 300px;
  max-width: 600px;
  margin: auto;
  background-color: var(--bg-color);
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
  text-align: left;
}
</style>

<i18n>
{
  "en": {
    "title": "Era+",
    "repo": "Source code is on GitHub. Contributions are welcomed. This app is provided without warranty of any kind.",
    "clear": "Clear saved data",
    "clearDesc": " You may need to click after update. You can also try this button if any bug occurs.",
    "appVer": "App version: ",
    "dataVer": "Database version: ",
    "buildDesc": "Build page description",
    "computer": "Mobile support is somehow usable.",
    "warning": "Note: Energy, shield, armor and damage do not takes buffs into account. Module only takes one slot regardless of size.",
    "important": "This page is no longer updated. Contributions are welcomed."
  },
  "zh": {
    "title": "Era+",
    "repo": "锌兔制作。源代码在 GitHub 上公开，欢迎贡献。一切计算、查询结果本人不保证准确率也不负责（滑稽）。",
    "clear": "清除本页面缓存",
    "clearDesc": " 在大更新后，可能需要按一下并刷新页面才能正常使用。出 bug 或者查询器被玩坏了也可以试试这个按钮。",
    "appVer": "应用版本：",
    "dataVer": "数据库版本：",
    "buildDesc": "装配页面说明",
    "computer": "移动端配船勉强可以用",
    "warning": "注意：能源、护盾、装甲和伤害未计算技能和船体加成。组件不管大小都只占1格。",
    "important": "本页面不再更新。欢迎贡献。"
  }
}
</i18n>