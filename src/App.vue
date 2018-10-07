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
  --primary-color: #3f51b5;
  --alt-primary-color: #d5dbf3;
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
.hl {
  font-size: 24px;
  line-height: 32px;

}
.content {
  padding: 20px 10px;
}
.card {
  display: block;
  box-shadow: var(--elevation);
  background-color: var(--base-color);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 20px;
}
.btn {
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid var(--primary-color);
  color:var(--primary-color);
  display: inline-block;
  line-height: 32px;
  padding: 0 15px;
  user-select: none;
}
.btn:hover {
  background-color: var(--alt-primary-color);
}
.btn:active {
  background-color: var(--primary-color);
  color: var(--dark-text-color);
}
.select {
  background-color: var(--base-color);
  width: 100%;
  border-radius: 0;
  border-style: none;
  height: 36px;
  font-size: 16px;
  box-shadow: var(--elevation);
  border-radius: 3px;
}
</style>
