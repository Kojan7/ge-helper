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
      <div class="btn" @click="useDefault">
        {{ $t('home.useDefault') }}
      </div>
    </div>

    <div class="card">
      <span class="hl">{{ $t('home.settings') }}</span>
      <div class="content">
        <app-radio-button
          :options="langs"
          v-model="lang" />
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
      <div class="btn" onclick="window.open('https://github.com/zyntuz/ge-helper','Github');">
        GitHub
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
        { value: 'en', zh: 'English', en: 'English' },
        { value: 'zh', zh: '中文', en: '中文' },
      ],
      lang: this.$i18n.locale,
    };
  },
  computed: mapState({
    appVersion: 'appVersion',
    dataVersion(state) {
      return `${state.data.date} (${state.data.version})`;
    },
    dataCorrupt(state) {
      if (typeof state.data.date === 'string') {
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
  watch: {
    lang(locale) {
      this.$i18n.locale = locale;
      localStorage.setItem('locale', JSON.stringify(locale));
    },
  },
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
    useDefault() {
      this.$store.commit('useDefaultData');
    },
    resetAll() {
      localStorage.clear();
      window.location.reload();
    },
  },
};
</script>

<style scoped>
#uploaded-file {
  display: none;
}
</style>
