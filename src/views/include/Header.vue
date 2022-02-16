<template>
  <div class="main-header">
    <!-- Logo Header -->
    <div class="logo-header" data-background-color="blue">

      <router-link
        to="/dashboard"
        tag="a"
        class="logo">
        <img src="assets/img/logo.svg" alt="navbar brand" class="navbar-brand">

      </router-link>

      <button @click="openNav()" class="navbar-toggler sidenav-toggler ml-auto" type="button">
					<span class="navbar-toggler-icon">
						<i class="icon-menu"></i>
					</span>
      </button>
      <button @click="openTopBar" class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
      <div class="nav-toggle">
        <button class="btn btn-toggle toggle-sidebar">
          <i class="icon-menu"></i>
        </button>
      </div>
    </div>
    <!-- End Logo Header -->

    <!-- Navbar Header -->
    <nav class="navbar navbar-header navbar-expand-lg" data-background-color="blue2">

      <div class="container-fluid">
        <ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
          <li class="nav-item dropdown hidden-caret">
            <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false">
              <div class="avatar-sm">
                <img src="assets/img/profile.jpg" alt="..." class="avatar-img rounded-circle">
              </div>
            </a>
            <ul class="dropdown-menu dropdown-user animated fadeIn">
              <div class="dropdown-user-scroll scrollbar-outer">
                <li>
                  <router-link
                    to="accountSettings"
                    tag="a"
                    class="dropdown-item">
                    Account Setting
                  </router-link>

                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click="logout">Logout</a>
                </li>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <!-- End Navbar -->
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    openNav() {
      const el = document.getElementById('openNav')
      el.classList.forEach(element => {
        if (element === 'nav_open') {
          el.classList.remove('nav_open');
          el.classList.remove('topbar_open');
        } else {
          el.classList.add('nav_open')
        }
      })
    },
    openTopBar() {
      const el = document.getElementById('openNav')
      el.classList.forEach(element => {
        if (element === 'topbar_open') {
          el.classList.remove('topbar_open');
        } else {
          el.classList.add('topbar_open')
        }
      })
    }
  },
  data() {
    return {
      userName: null
    }
  },
  mounted() {
    if (this.getUser) {
      this.userName = this.getUser.fullName
    }
  },
  created() {
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  watch: {
    getUser(value) {
      this.userName = value.fullName
    }
  }
}
</script>
