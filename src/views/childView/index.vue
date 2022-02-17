<template>
  <div>
    <div class="wrapper">

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
import Header from '../include/Header'
import Sidebar from '../include/Sidebar'
import Footer from '../include/Footer'
import {mapGetters} from "vuex";


export default {
  components: {
    Header,
    Sidebar,
    Footer,
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
    }
  },
  methods: {
    initApps() {
      const path = this.$route.path
      const role = JSON.parse(this.getUser.role)



      if (path == '/reports' || path == '/accountSettings') {
        this.isLoad = false
      }

      this.$store.dispatch("initDashboardApp")
        .then(response => {
          if (path == '/dashboard' || path == '/') {
            this.isLoad = false
          }
        })


      if (role.ciro) {
        this.$store.dispatch("initCiroApp")
          .then(response => {
            if (path == '/ciro') {
              this.isLoad = false
            }
          })
      }

      if (role.categories) {
        this.$store.dispatch("initCategoryApp")
          .then(response => {
            if (path == '/categories') {
              this.isLoad = false
            }
          })
      }

      if (role.typeexpenses) {
        this.$store.dispatch("initTypesApp")
          .then(response => {
            if (path == '/typeexpenses') {
              this.isLoad = false
            }
          })
      }

      if (role.expenses) {
        this.$store.dispatch("initExpensesApp")
          .then(response => {
            if (path == '/expenses') {
              this.isLoad = false
            }
          })
      }

      if (role.staff) {
        this.$store.dispatch("initStaffApp")
          .then(response => {
            if (path == '/staff') {
              this.isLoad = false
            }
          })
      }

      if (role.settings) {
        this.$store.dispatch("initSettingsApp")
          .then(response => {
            if (path == '/settings') {
              this.isLoad = false
            }
          })
      }

      if (role.users) {
        this.$store.dispatch("initUsersApp")
          .then(response => {
            if (path == '/users') {
              this.isLoad = false
            }
          })
      }
    }
  },
  computed: {
    ...mapGetters(['getLoading']),
    ...mapGetters(['allSettings']),
    ...mapGetters(['getUser']),
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
    getLoading(value) {
      this.isLoad = value
    },
    allSettings(payload) {
      this.settings.title = payload[0].title
      this.settings.ico = payload[0].ico
      this.settings.description = payload[0].description
      this.settings.keywords = payload[0].keywords
    },
  },
  created() {
    this.isLoad = true
    this.initApps()
  },
  metaInfo() {
    return {
      title: this.settings.title,
      htmlAttrs: {
        lang: 'en',
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
