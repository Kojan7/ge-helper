<template>
  <v-navigation-drawer app v-model="isDrawerShown">
    <v-list >
      <v-list-tile
        v-for="link in links"
        :key="link.title"
        :to="{path: '/' + link.title}"
      >
        <v-list-tile-action>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title> {{ $t(link.title + '.title') }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'TheSidebar',
  data() {
    return {
      links: [
        { title: 'home', icon: 'dashboard' },
        { title: 'module', icon: 'all_out' },
        { title: 'hull', icon: 'send' },
        { title: 'build', icon: 'gamepad' },
        { title: 'legion', icon: 'group' }
      ]
    };
  },
  computed: {
    isDrawerShown: {
      get() {
        return this.$store.state.isDrawerShown;
      },
      set(value) {
        this.$store.commit('setIsDrawerShown', value);
      }
    }
  }
};
</script>
