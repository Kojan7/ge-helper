<template>
  <v-app>
    <the-sidebar></the-sidebar>
    <the-topbar></the-topbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import TheTopbar from '@/components/TheTopbar.vue'
import TheSidebar from '@/components/TheSidebar.vue'

export default {
  components: {
    TheTopbar,
    TheSidebar
  }
}
</script>

<style>
.main-view {
  max-width: 700px;
  margin: auto;
}
</style>
