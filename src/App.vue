<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  computed: {
    ...mapGetters(['isAuthenticated']),
  },
  watch: {
    isAuthenticated(payload) {
      // user sisteme girmek istediğinde token olmadığı için verileri api den alamıyor
      // giriş yaptıkdan sonra token değeri true donüyor ve api ye tekrar token ile istek atıyor
      if (payload === true) {
        this.$store.dispatch('initAuth').then(response => {
        })
      }
    }
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
