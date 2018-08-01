<template>
  <div id="app">
    <div id="nav">
      <router-link class='router-link' to="/ship">舰体</router-link>
      <router-link class='router-link' to="/module">组件</router-link>
      <router-link class='router-link' to="/build">组装</router-link>
    </div>
    <router-view id='router-view'/>
  </div>
</template>

<style>
body {
  margin: 0;
}
#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav {
  display: flex;
  align-items: center;
  width: 100%;
  background-color: #383c4a;
  height: 40px;
  justify-content: center;
  font-size: 16px;
  margin-bottom: 12px;
}

.router-link {
  display: inline-flex;
  height: 100%;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  color: #d3dae3;
  flex-basis: 0;
  flex-grow: 1;
}

.router-link-active {
  background-color: #5294e2;
  color: #fff;
}

#router-view {
  max-width: 360px;
  margin: auto;
}

.selection {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select {
  background-color: #d3dae3;
  flex-grow: 1;
  border-radius: 0;
  border-style: none;
  height: 36px;
  font-size: 16px;
  margin: 5px;
}
</style>
