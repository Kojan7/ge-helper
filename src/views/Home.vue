<template>
  <v-layout justify-center>
    <v-flex sm6>
      <v-card>
        <v-card-title primary-title>
          <div class="headline">{{ $t('home.database') }}</div>
        </v-card-title>
        <v-card-text>
          <div v-if="dataCorrupt">{{ $t('home.dataCorrupt') }}</div>
          <div v-else-if="dataOutdated">{{ $t('home.dataOutdated') }}</div>
          <div v-else>Current version: {{ dataVersion }} </div>
        </v-card-text>
          <input type="file" id="uploaded-file" ref="uploadedFile" accept=".json" @change="handleFile"/>
        <v-card-actions>
          <v-btn flat color="primary" @click="$refs.uploadedFile.click()">
            {{ $t('home.upload') }}
          </v-btn>
        <v-btn flat color="error" @click="resetData">
          {{ $t('reset') }}
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      showError: false
    };
  },
  computed: {
    dataVersion() {
      return (
        this.$store.state.data.version +
        ':' +
        this.$store.state.data.versionDate
      );
    },
    dataCorrupt() {
      if (typeof this.$store.state.data.versionDate === 'string') {
        return false;
      } else {
        return true;
      }
    },
    dataOutdated() {
      if (this.$store.state.data.version === this.$store.state.dataVersion) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    handleFile(event) {
      let reader = new FileReader();
      reader.onload = event => {
        let data = JSON.parse(event.target.result);
        this.$store.commit('setData', data);
      };
      reader.readAsText(event.target.files[0]);
    },
    resetData() {
      this.$refs.uploadedFile.value = '';
      this.$store.commit('resetData', undefined);
    }
  }
};
</script>
<style scoped>
#uploaded-file {
  display: none;
}
</style>
