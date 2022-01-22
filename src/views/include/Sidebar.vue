<template>
  <!-- Sidebar -->
  <div class="sidebar sidebar-style-2">
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
      <div class="sidebar-content">
        <div class="user">
          <div class="avatar-sm float-left mr-2">
            <img src="assets/img/profile.jpg" alt="..." class="avatar-img rounded-circle">
          </div>
          <div class="info">
            <a data-toggle="collapse" href="" aria-expanded="true">
								<span>
									{{ userName }}
									<span class="user-level">Yetki</span>
								</span>
            </a>
            <div class="clearfix"></div>
          </div>
        </div>
        <ul class="nav nav-primary">

          <router-link
            active-class="active"
            to="/dashboard"
            tag="li"
            class="nav-item">
            <a>
              <i class="fas fa-home"></i>
              <p>Dashboard</p>
            </a>
          </router-link>


          <li class="nav-section">
							<span class="sidebar-mini-icon">
								<i class="fa fa-ellipsis-h"></i>
							</span>
            <h4 class="text-section">General</h4>
          </li>

          <router-link
            active-class="active"
            to="/ciro"
            tag="li"
            class="nav-item">
            <a>
              <i class="fas fa-dollar-sign"></i>
              <p>Gelir</p>
            </a>
          </router-link>

          <router-link
            active-class="active"
            to="/expenses"
            tag="li"
            class="nav-item">
            <a>
              <i class="fas fa-money-check"></i>
              <p>Giderler</p>
            </a>
          </router-link>

          <router-link
            active-class="active"
            to="/category"
            tag="li"
            class="nav-item">
            <a>
              <i class="fab fa-stack-overflow"></i>
              <p>Kategoriler</p>
            </a>
          </router-link>

          <router-link
            active-class="active"
            to="/products"
            tag="li"
            class="nav-item">
            <a>
              <i class="fas fa-utensils"></i>
              <p>Ürünler</p>
            </a>
          </router-link>

          <router-link
            active-class="active"
            to="/staff"
            tag="li"
            class="nav-item">
            <a>
              <i class="fas fa-user-tie"></i>
              <p>Personeller</p>
            </a>
          </router-link>

          <router-link
            active-class="active"
            to="/users"
            tag="li"
            class="nav-item">
            <a>
              <i class="fas fa-user-ninja"></i>
              <p>Kullanıcılar</p>
            </a>
          </router-link>

          <router-link
            active-class="active"
            to="/settings"
            tag="li"
            class="nav-item">
            <a>
              <i class="fas fa-gear"></i>
              <p>Ayarlar</p>
            </a>
          </router-link>

        </ul>
      </div>
    </div>
  </div>
  <!-- End Sidebar -->
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      userName: null
    }
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
