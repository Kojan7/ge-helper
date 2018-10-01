<template>
  <v-layout class="main-view" column justify-center>
      <v-card class="margin-top">
        <v-card-title primary-title>
          <div class="headline">{{ $t('home.database') }}</div>
        </v-card-title>
        <v-card-text>
          <div v-if="dataCorrupt">{{ $t('home.dataCorrupt') }}</div>
          <div v-else-if="dataOutdated">{{ $t('home.dataOutdated') }}</div>
          <div v-else>{{ $t('home.currentVer') }}: {{ dataVersion }} </div>
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

      <v-card class="margin-top">
        <v-card-title primary-title>
          <div class="headline">{{ $t('home.plugins') }}</div>
        </v-card-title>
        <v-list>
          <v-list-tile
            v-for="(plugin, index) in plugins"
            :key="index">
            <v-list-tile-content>
              <v-list-tile-title v-text="plugin.name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn flat color="error" icon @click="removePlugin(index)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>

          </v-list-tile>
        </v-list>
        <v-card-actions>
          <v-dialog
            v-model="pluginAddPanel"
            width="500">
            <v-btn slot="activator" flat color="primary">
              {{ $t('add') }}
            </v-btn>
            <v-card>
              <v-card-text>
                <v-text-field
                  label="name"
                  v-model="plugin.name"
                  placeholder="my plugin"
                  outline
                ></v-text-field>
                <v-text-field
                  label="Material icon"
                  v-model="plugin.icon"
                  placeholder="extension"
                  outline
                ></v-text-field>
                <v-text-field
                  label="src"
                  v-model="plugin.src"
                  placeholder="https://www.abc.com/abc.html"
                  outline
                ></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  flat
                  @click="addPlugin">
                  {{ $t('add') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
      </v-card>

      <v-card class="margin-top">
        <v-card-title primary-title>
          <div class="headline">{{ $t('home.about') }}</div>
        </v-card-title>
        <v-card-text>
          <div>{{ $t('home.currentVer') }}: {{ appVersion }} </div>
        </v-card-text>
        <v-card-actions>
          <v-btn flat color="error" @click="resetAll">
            {{ $t('resetAll') }}
          </v-btn>
        </v-card-actions>
      </v-card>

  </v-layout>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      pluginAddPanel: false,
      plugin: {
        name: 'My plugin',
        icon: 'extension',
        src: 'https://www.abc.com/abc.html'
      }
    }
  },
  computed: {
    appVersion() {
      return this.$store.state.appVersion
    },
    dataVersion() {
      return (
        this.$store.state.data.version +
        ':' +
        this.$store.state.data.versionDate
      );
    },
    plugins() {
      return this.$store.state.plugins
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
      this.$store.commit('resetData');
    },
    removePlugin(index) {
      this.$store.commit('removePlugin', index);
    },
    addPlugin() {
      this.$store.commit('addPlugin', this.plugin);
      this.pluginAddPanel = false
    },
    resetAll() {
      localStorage.clear();
      location.reload();
    }
  }
};
</script>
<style scoped>
#uploaded-file {
  display: none;
}
</style>
