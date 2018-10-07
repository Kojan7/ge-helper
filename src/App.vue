<template>
  <div id="app">
    <the-titlebar/>
    <router-view class="view"/>
  </div>
</template>
<script>
import TheTitlebar from '@/components/TheTitlebar.vue';

export default {
  components: {
    TheTitlebar,
  },
};
</script>

<style>
:root {
  --base-color: #eeeeec;
  --bg-color: #3e4446;
  --menu-color: #2c3133;
  --text-color: black;
  --dark-text-color: white;
  --alt-text-color: grey;
  --primary-color: #4a90d9;
  --elevation:
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
}
#app {
  font-family: Arial, Helvetica, sans-serif;
}
.view {
  margin: auto;
  margin-top: 48px;
  padding: 10px;
  max-width: 700px;
}
.card {
  display: flex;
  box-shadow: var(--elevation);
  background-color: var(--base-color);
  border-radius: 3px;
  padding: 10px;
}
</style>
