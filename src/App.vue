<template>
  <div>
    <Auth v-if="auth()"></Auth>

    <div class="wrapper" v-else>

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
import {store} from "./store/store";

export default {
  components: {
    Header,
    Sidebar,
    Footer,
    Auth
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
      // this.$store.dispatch("initAuth");
      this.$store.dispatch("initCategoryApp");
      this.$store.dispatch("initCiroApp");
      //this.$store.dispatch("initProductsApp");
      this.$store.dispatch("initStaffApp");
      this.$store.dispatch("initTypesApp");
      this.$store.dispatch("initExpensesApp");
      this.$store.dispatch("initSettingsApp");
      this.$store.dispatch("initUsersApp");
      this.$store.dispatch('initDashboardApp')
    }
  },
  mounted() {
    if (this.$store.getters.isAuthenticated !== false) {
      this.initApps()
    }
  },
  watch: {
    isAuthenticated(value) {
      if (value !== false) {
        this.initApps()
      }
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
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
