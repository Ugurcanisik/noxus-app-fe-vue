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
      isLoad: false
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
      this.$store.dispatch("initCategoryApp").then(response => {
        this.isLoad = false
      })
      this.$store.dispatch('initDashboardApp').then(response => {
        this.isLoad = false
      })
      this.$store.dispatch("initCiroApp");
      this.$store.dispatch("initStaffApp");
      this.$store.dispatch("initTypesApp");
      this.$store.dispatch("initExpensesApp");
      this.$store.dispatch("initSettingsApp");
      this.$store.dispatch("initUsersApp")
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
    ...mapGetters(['getLoading']),
    ...mapGetters(['allDashboard']),
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
  }
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
