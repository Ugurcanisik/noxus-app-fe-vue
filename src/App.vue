<template>
  <div>

    <div class="wrapper">

      <Header :style="display()"></Header>
      <Sidebar :style="display()"></Sidebar>

      <div class="main-panel">
        <div class="content">

          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>

        </div>
        <Footer :style="display()"></Footer>
      </div>

    </div>


  </div>


</template>

<script>
import Header from './views/include/Header'
import Sidebar from './views/include/Sidebar'
import Footer from './views/include/Footer'

import {mapGetters} from "vuex";

export default {
  components: {
    Header,
    Sidebar,
    Footer
  },
  methods: {
    display() {
      if (this.isAuthenticated) {
        return {'display': 'inline'}
      } else {
        return {'display': 'none'}
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
