<template>
  <div>


    <Auth v-if="auth()"></Auth>

    <div class="wrapper" v-else>

      <div class="loading" :style="isLoading">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>


      <Header></Header>
      <Sidebar></Sidebar>


      <div class="main-panel">
        <div class="content">

          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>

        </div>
        <Footer></Footer>
      </div>

    </div>

  </div>

</template>

<script>
import Header from './views/include/Header'
import Sidebar from './views/include/Sidebar'
import Footer from './views/include/Footer'
import Auth from './views/auth'

import {mapGetters} from "vuex";

export default {
  components: {
    Header,
    Sidebar,
    Footer,
    Auth
  },
  data() {
    return {
      isLoad: false,
      settings: {
        title: null,
        ico: null,
        description: null,
        keywords: null,
      },
      deneme: 'asdasdsad'
    }
  },
  metaInfo() {
    return {
      title: this.settings.title,
      titleTemplate: '%s Yönetim',
      htmlAttrs: {
        lang: 'en'
      },
      link: [
        {rel: 'icon', href: 'https://storage.cloud.google.com/noxus-up-file/' + this.settings.ico, type: "image/x-icon"}
      ],
      meta: [
        {charset: 'utf-8'},
        {name: 'http-equiv', content: 'IE=edge'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1.0, shrink-to-fit=no'},
        {name: 'description', content: this.settings.description},
        {name: 'keywords', content: this.settings.keywords},

      ]
    }
  },
  methods: {
    auth() {
      const path = this.$route.path
      if (path == '/auth') {
        return true
      } else {
        return false
      }
    },
    initApps() {
      this.$store.dispatch("initTypesApp")
      this.$store.dispatch("initSettingsApp")
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(['getLoading']),
    ...mapGetters(['allDashboard']),
    ...mapGetters(['allSettings']),
    isLoading() {
      if (this.isLoad) {
        return {
          display: "block"
        }
      } else {
        return {
          display: "none"
        }
      }
    },
  },
  watch: {
    isAuthenticated(value) {
      if (value !== false) {
        this.isLoad = true
        this.initApps()
      }
    },
    getLoading(value) {
      this.isLoad = value
    },
    allSettings(payload) {
      this.settings.title = payload[0].title
      this.settings.ico = payload[0].ico
      this.settings.description = payload[0].description
      this.settings.keywords = payload[0].keywords
    }
  },
}
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity .3s ease-out;
}

.fade-leave {
}

.fade-leave-active {
  transition: opacity .3s ease-out;
  opacity: 0;
}
</style>
