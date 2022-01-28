<template>

  <div>

    <b-button class="btn-round ml-auto" variant="primary" @click="openModal">
      <i class="fa fa-plus"></i>
      Kullanıcı Ekle
    </b-button>

    <b-modal ref="userAdd" title="Kullanıcı Ekle" hide-footer>
      <div class="modal-content">
        <div class="modal-body">

          <div class="form-group form-floating-label" :class="{'has-error': $v.newUser.name.$error}">
            <input
              id="name"
              v-model="$v.newUser.name.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="name" class="placeholder">İsim</label>
          </div>

          <div class="form-group form-floating-label" :class="{'has-error': $v.newUser.lastName.$error}">
            <input
              id="lastName"
              v-model="$v.newUser.lastName.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="lastName" class="placeholder">Soyisim</label>
          </div>

          <div class="form-group form-floating-label" :class="{'has-error': $v.newUser.userName.$error}">
            <input
              id="userName"
              v-model="$v.newUser.userName.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="userName" class="placeholder">Kullanıcı Adı</label>
          </div>

          <div class="form-group form-floating-label" :class="{'has-error': $v.newUser.password.$error}">
            <input
              id="password"
              v-model="$v.newUser.password.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="password" class="placeholder">Parola</label>
          </div>

        </div>
        <div class="modal-footer no-bd" style="margin: 0 auto">
          <b-button variant="primary" @click="save" :disabled="$v.newUser.$invalid">Kaydet</b-button>
          <b-button variant="danger" @click="closeModal">Kapat</b-button>
        </div>
      </div>
    </b-modal>
  </div>


</template>
<script>
import {required} from "vuelidate/lib/validators"

export default {
  data() {
    return {
      newUser: {
        name: null,
        lastName: null,
        userName: null,
        password: null
      }
    }
  },
  methods: {
    openModal() {
      this.newUser.name = null
      this.newUser.lastName = null
      this.newUser.userName = null
      this.newUser.password = null
      this.$refs['userAdd'].show()
    },
    closeModal() {
      this.$refs['userAdd'].hide()
    },
    save() {
      this.$store.dispatch('loading', true)
      let newUser = {
        name: this.newUser.name,
        lastName: this.newUser.lastName,
        userName: this.newUser.userName,
        password: this.newUser.password,

      }
      this.$store.dispatch("saveUser", newUser)
        .then(response => {
          if (response) {
            setTimeout(() => {
              this.$refs['userAdd'].hide()
              this.$store.dispatch('loading', false)
              this.$store.dispatch('alert', 'success')
            }, 1000)
          }
        })
    }
  },
  validations: {
    newUser: {
      name: {required},
      lastName: {required},
      userName: {required},
      password: {required}
    }
  }
}
</script>
