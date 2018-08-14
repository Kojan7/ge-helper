<template>
  <div class="misc">
    <h1>Era+ 查询器</h1>
    <p>锌兔制作，永久免费。嗯，大概吧。当然如果你们愿意支持开发者，我接受捐助，嘿嘿。一切计算、查询结果本人不保证准确率也不负责。</p>
    <p><button @click="clearStorage">清除本页面缓存</button> 在大更新后，可能需要按一下并刷新页面才能正常使用。出 bug 或者查询器被玩坏了也可以试试这个按钮。</p>
    <p>应用版本：0.2<br>数据库版本：2018-07-31</p>
    <h3>装配页面说明</h3>
    <p>目前只有电脑才能用，如果需求量大，可能会添加移动端支持。笔记本屏幕小可以尝试全屏或缩放一下</p>
    <p>注意：目前只剩下能源、护盾、装甲和伤害未计算科技和船体加成。也就是说所有跟矿船有关的都可正确计算。组件不管大小都只占1格。</p>
    <p>如果要清空组件布局，导入“[]”就可以了。不加按钮的目的是防止不小心按到。</p>
    <p>像技能和矿场难度等设置都在功能面板内。</p>
  </div>
</template>

<script>
export default {
  name: "misc",
  methods: {
    clearStorage() {
      localStorage.clear();
    }
  }
};
</script>
<style scoped>
.misc {
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
