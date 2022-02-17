<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Kullanıcı Bilgileri</h2>
          </div>
        </div>
      </div>
    </div>


    <div class="page-inner mt--5">
      <div class="row mt--2">
        <div class="col-md-6">
          <div class="card full-height">
            <div class="card-body">
              <div class="card-title">Kişisel Bilgier</div>
              <div class="d-flex flex-wrap justify-content-around pb-2 pt-4">

                <div class="form-group form-floating-label col-md-12" :class="{'has-error': $v.user.name.$error}">
                  <input
                    id="logo"
                    v-model="$v.user.name.$model"
                    type="text" class="form-control input-border-bottom" required>
                  <label for="logo" class="placeholder">İsim</label>
                </div>

                <div class="form-group form-floating-label col-md-12" :class="{'has-error': $v.user.lastName.$error}">
                  <input
                    id="ico"
                    v-model="$v.user.lastName.$model"
                    type="text" class="form-control input-border-bottom" required>
                  <label for="ico" class="placeholder">Soyisim</label>
                </div>

                <div class="form-group form-floating-label col-md-12" :class="{'has-error': $v.user.userName.$error}">
                  <input
                    id="title"
                    v-model="$v.user.userName.$model"
                    type="text" class="form-control input-border-bottom" required>
                  <label for="title" class="placeholder">Kullanıcı Adı</label>
                </div>

                <div class="modal-footer no-bd" style="margin: 0 auto">
                  <b-button variant="primary" @click="updateUser" :disabled="$v.user.$invalid">Güncelle</b-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card full-height">
            <div class="card-body">
              <div class="card-title">Parola Güncelle</div>
              <div class="d-flex flex-wrap justify-content-around pb-2 pt-4">

                <div class="form-group form-floating-label col-md-12"
                     :class="{'has-error': $v.userPassword.oldPassword.$error}">
                  <input
                    id="oldPassword"
                    v-model="$v.userPassword.oldPassword.$model"
                    type="password" class="form-control input-border-bottom" required>
                  <label for="oldPassword" class="placeholder">Eski Parola</label>
                </div>

                <div class="form-group form-floating-label col-md-12"
                     :class="{'has-error': $v.userPassword.newPassword.$error}">
                  <input
                    id="newPassword"
                    v-model="$v.userPassword.newPassword.$model"
                    type="password" class="form-control input-border-bottom" required>
                  <label for="newPassword" class="placeholder">Yeni Parola</label>
                </div>

                <div class="form-group form-floating-label col-md-12"
                     :class="{'has-error': $v.userPassword.repeatPassword.$error}">
                  <input
                    id="repeatPassword"
                    v-model="$v.userPassword.repeatPassword.$model"
                    type="password" class="form-control input-border-bottom" required>
                  <label for="repeatPassword" class="placeholder">Yeni Parola Tekrarı</label>
                </div>

                <div class="modal-footer no-bd" style="margin: 0 auto">
                  <b-button variant="primary" @click="updatePassword" :disabled="$v.userPassword.$invalid">Güncelle
                  </b-button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


  </div>
</template>
<script>


import {required, sameAs} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      user: {
        name: null,
        lastName: null,
        userName: null,
      },
      userPassword: {
        oldPassword: null,
        newPassword: null,
        repeatPassword: null
      },
      id: null
    }
  },
  methods: {
    updateUser() {
      this.$store.dispatch('loading', true)
      const user = {
        data: {
          name: this.user.name,
          lastName: this.user.lastName,
          userName: this.user.userName,
        },
        id: this.id
      }

      this.$store.dispatch('updateUser', user)
        .then(response => {
          if (response) {
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'success')
            this.getUser.name = this.user.name
            this.getUser.lastName = this.user.lastName
            this.getUser.userName = this.user.userName
          } else {
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'error')
          }
        })
    },
    updatePassword() {
      const password = {
        id: this.id,
        data: {
          oldPassword: this.userPassword.oldPassword,
          newPassword: this.userPassword.newPassword
        }
      }

      this.$store.dispatch('updatePassword', password)
        .then(response => {
          if (response) {
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'success')
          } else {
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'error')
          }
        })
    }
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  mounted() {
    this.user.name = this.getUser.name
    this.user.lastName = this.getUser.lastName
    this.user.userName = this.getUser.userName
    this.id = this.getUser.id
  },
  validations: {
    user: {
      name: {required},
      lastName: {required},
      userName: {required},
    },
    userPassword: {
      oldPassword: {required},
      newPassword: {required},
      repeatPassword: {required, sameAs: sameAs('newPassword')}
    }
  }
}
</script>

