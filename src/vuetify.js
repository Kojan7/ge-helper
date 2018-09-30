import Vue from 'vue'
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VBtnToggle,
  VIcon,
  VGrid,
  VToolbar,
  VMenu,
  VCard,
  VDialog,
  VSelect,
  VSlider,
  transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VBtnToggle,
    VIcon,
    VGrid,
    VToolbar,
    VMenu,
    VCard,
    VDialog,
    VSelect,
    VSlider,
    transitions
  },
  theme: {
    primary: '#009688',
    secondary: '#263238',
    accent: '#00bcd4',
    error: '#ff5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'md',
})
