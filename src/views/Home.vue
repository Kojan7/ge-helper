<template>
  <div class="home">

    <div class="card">
      <span class="hl">{{ $t('home.database') }}</span>
      <div class="content">
        <div v-if="dataCorrupt">{{ $t('home.dataCorrupt') }}</div>
        <div v-else-if="dataOutdated">{{ $t('home.dataOutdated') }}</div>
        <div v-else>{{ $t('home.currentVer') }}: {{ dataVersion }}</div>
      </div>
      <input type="file" id="uploaded-file" ref="uploadedFile" accept=".json, .txt"
        @change="handleFile"/>
      <div class="btn" @click="$refs.uploadedFile.click()">
        {{ $t('home.upload') }}
      </div>
      <div class="btn" @click="resetData">
        {{ $t('reset') }}
      </div>
    </div>

    <div class="card">
      <span class="hl">{{ $t('home.settings') }}</span>
      <div class="content">
        <app-radio-button
          :options="langs"
          :defaultChoice="$i18n.locale"
          @chose="changeLocale($event)">
        </app-radio-button>
      </div>
    </div>

    <div class="card">
      <span class="hl">{{ $t('home.about') }}</span>
      <div class="content">
        <div>{{ $t('home.currentVer') }}: {{ appVersion }}</div>
      </div>
      <div class="btn" @click="resetAll">
        {{ $t('resetAll') }}
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppRadioButton from '@/components/AppRadioButton.vue';

export default {
  name: 'Home',
  components: {
    AppRadioButton,
  },
  data() {
    return {
      langs: [
        { value: 'en', textzh: 'English', texten: 'English' },
        { value: 'zh', textzh: '中文', texten: '中文' },
      ],
    };
  },
  computed: mapState({
    appVersion: 'appVersion',
    dataVersion(state) {
      return `${state.data.version}: ${state.data.versionDate}`;
    },
    dataCorrupt(state) {
      if (typeof state.data.versionDate === 'string') {
        return false;
      }
      return true;
    },
    dataOutdated(state) {
      if (state.data.version === state.dataVersion) {
        return false;
      }
      return true;
    },
  }),
  methods: {
    handleFile(event) {
      const reader = new FileReader();
      // eslint-disable-next-line no-shadow
      reader.onload = (event) => {
        const data = JSON.parse(event.target.result);
        this.$store.commit('setData', data);
      };
      reader.readAsText(event.target.files[0]);
    },
    resetData() {
      this.$refs.uploadedFile.value = '';
      this.$store.commit('resetData');
    },
    resetAll() {
      localStorage.clear();
      window.location.reload();
    },
    changeLocale(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem('locale', JSON.stringify(locale));
    },
  },
};
</script>

<style scoped>
#uploaded-file {
  display: none;
}
</style>
