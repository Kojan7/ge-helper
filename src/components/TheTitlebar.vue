<template>
  <div>
    <div class="title-bar">
      <div class="title">{{ $t('title') }}</div>
      <div class="links" :class="{ showLinks }">
        <router-link class="link"
          v-for="link in links"
          :key="link"
          @click.native="showLinks = false"
          :to="'/' + link">
          {{ $t(link + '.title') }}
        </router-link>
      </div>
      <div class="menu" @click="showLinks = !showLinks">
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="var(--dark-text-color)"/>
        </svg>
      </div>
    </div>
    <div :class="{ showNotice }">{{ $t('dbNotice') }}</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TheTitlebar',
  data() {
    return {
      links: ['home', 'module', 'hull', 'build', 'legion'],
      showLinks: false,
    };
  },
  computed: mapState({
    showNotice(state) {
      if (typeof state.data.versionDate === 'string') {
        return false;
      }
      return true;
    },
  }),
};
</script>

<style scoped>
.title-bar {
  font-size: 18px;
  height: 48px;
  position: fixed;
  top: 0; left: 0; right: 0;
  background-color: var(--menu-color);
  color: var(--dark-text-color);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  box-shadow: var(--elevation);
  z-index: 1000;
}
.title, .link, .menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.title {
  padding: 0 12px;
  font-size: 20px;
  font-weight: bold;
}
.links {
  display: inline-flex;
  flex-grow: 1;
  max-width: 600px;
  background-color: var(--menu-color);
}
.link {
  text-decoration: none;
  flex-basis: 0;
  flex-grow: 1;
  color: var(--alt-text-color);
}
.link:hover {
  color: var(--dark-text-color);
}
.router-link-active {
  color: var(--dark-text-color);
  box-shadow: inset 0 -4px var(--primary-color);
}
.menu {
  display: none;
  width: 48px;
  flex-grow: 0;
}
@media screen and (max-width: 500px) {
  .links {
    display: none;
    flex-direction: column;
    position: fixed;
    top: 48px; left: 0; right: 0;
  }
  .link {
    height: 48px;
    display: flex;
  }
  .router-link-active {
    box-shadow: none;
  }
  .showLinks {
    display: block;
  }
  .menu {
    display: inline-flex;
  }
}

.showNotice {
  position: relative;
  top: 48px;
  background-color: #ef2929;
  color: white;
  font-weight: bold;
  z-index: 900;
  padding: 5px;
}
</style>
