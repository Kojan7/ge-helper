<template>
  <div id="app">
    <div id="nav">
      <div id="nav-wrap">
        <router-link class='router-link' to="/home">{{ $t('home.title') }}</router-link>
        <router-link class='router-link' to="/ship">{{ $t('ship.title') }}</router-link>
        <router-link class='router-link' to="/module">{{ $t('module.title') }}</router-link>
        <router-link class='router-link' to="/build">{{ $t('build.title') }}</router-link>
        <router-link class='router-link' to="/legion">{{ $t('legion.title') }}</router-link>
      </div>
    </div>
    <router-view id='router-view'/>
  </div>
</template>

<style>
:root {
  --dark-color: #263238;
  --highlight-color: #00bcd4;
  --bg-color: #fafbfc;
  --chrome-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
}
body {
  margin: 0;
  background-color: #e6ebed;
}
#app {
  font-family: Arial, "Microsoft YaHei", sans-serif;
  text-align: center;
}

#nav {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 300px;
  background-color: var(--dark-color);
  height: 40px;
  justify-content: center;
  font-size: 16px;
  margin-bottom: 12px;
  font-weight: bold;
  z-index: 1000;
}

#nav-wrap {
  display: flex;
  width: 500px;
  height: 100%;
}

.router-link {
  display: inline-flex;
  height: 100%;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  color: #cfd8dc;
  flex-basis: 0;
  flex-grow: 1;
}

.router-link-active {
  box-shadow: inset 0 -4px var(--highlight-color);
  color: var(--bg-color);
}

.selection {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.select {
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

input[type="range"] {
  flex-grow: 1;
}

.cont-card {
  box-sizing: border-box;
  justify-content: center;
  background-color: var(--bg-color);
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
  display: flex;
  align-items: center;
  height: 36px;
  margin: 5px;
  padding: 3px;
  flex-grow: 1;
  cursor: default;
  user-select: none;
}

.btn {
  font-size: 16px;
  line-height: 36px;
  text-align: center;
  background-color: var(--highlight-color);
  box-shadow: var(--chrome-shadow);
  border-radius: 3px;
  display: inline-block;
  height: 36px;
  margin: 5px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  color: var(--bg-color);
  font-weight: bold;
}
</style>