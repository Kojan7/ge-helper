<template>
  <div class="build">
    <div class="mobile-warn">
      <img src="@/assets/error.svg" width="180" height="180">
      <p>你的屏幕太小啦！</p>
    </div>
    <div class="desktop">
      测试
    </div>
  </div>
</template>

<script>
export default {
  name: "build"
};
</script>

<style scoped>
.mobile-warn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.desktop {
  display: none;
}
@media (min-width: 800px) and (min-height: 600px) {
  .mobile-warn {
    display: none;
  }
  .desktop {
    display: block;
  }
}
</style>
