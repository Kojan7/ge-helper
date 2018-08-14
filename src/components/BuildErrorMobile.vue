<template>
  <div class="mobile-warn">
  <svg width="180" height="180">
    <path fill="none" stroke="var(--dark-color)" stroke-width="16" stroke-linecap="round" d="M89,9a81,81 0 1,0 2,0zm1,38v58m0,25v1"/>
  </svg>
    <p>{{ $t('text') }}</p>
    <p>⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄</p>
  </div>
</template>
<style scoped>
.mobile-warn {
  position: absolute;
  left: 0;
  right:0;
  top:60px;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e6ebed;
  z-index: 100;
}
@media (min-width: 750px) and (min-height: 550px) {
  .mobile-warn {
    display: none;
  }
}
</style>
<i18n>
{
  "en": {
    "text": "Oopsie woopsie! Youw scween is too small! "
  },
  "zh": {
    "text": "你的屏幕太小啦！"
  }
}
</i18n>