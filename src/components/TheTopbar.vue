<template>
  <v-toolbar dark color="secondary" app>
    <v-toolbar-side-icon @click="$store.commit('toggleIsDrawerShown')"></v-toolbar-side-icon>
    <v-toolbar-title></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu>
      <v-btn icon slot="activator">
        <v-icon>translate</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="lang in langs"
          :key="lang.locale"
          @click="$i18n.locale = lang.locale">
          <v-list-tile-title>{{ lang.name }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </v-toolbar>
</template>

<script>
export default {
  name: 'TheTopbar',
  data() {
    return {
      langs: [
        { locale: 'en', name: 'English' },
        { locale: 'zh', name: '中文' }
      ]
    };
  }
};
</script>
