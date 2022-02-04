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


    <div class="modal-content col-md-8" style="margin: 20px auto">
      <div class="modal-body ">

        <div class="form-group form-floating-label" :class="{'has-error': $v.user.name.$error}">
          <input
            id="logo"
            v-model="$v.user.name.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="logo" class="placeholder">İsim</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.user.lastName.$error}">
          <input
            id="ico"
            v-model="$v.user.lastName.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="ico" class="placeholder">Soyisim</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.user.userName.$error}">
          <input
            id="title"
            v-model="$v.user.userName.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="title" class="placeholder">Kullanıcı Adı</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.user.password.$error}">
          <input
            id="description"
            v-model="$v.user.password.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="description" class="placeholder">Parola</label>
        </div>

      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update" :disabled="$v.user.$invalid">Kaydet</b-button>
      </div>
    </div>


  </div>
</template>
<script>


import {required} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      user: {
        name: null,
        lastName: null,
        userName: null,
        password: null,

      },
      id: null
    }
  },
  methods: {
    update() {
      this.$store.dispatch("updateSettings", {id: this.id, data: this.settings})
    }
  },
  computed: {
    ...mapGetters(['getUser'])
  },
  mounted() {
    const id = this.getUser.id
    this.$store.dispatch('findAccountSettingsUser', id).then(response => {
      this.user.name=response[0].name
      this.user.lastName=response[0].lastName
      this.user.userName=response[0].userName
    })
  },
  validations: {
    user: {
      name: {required},
      lastName: {required},
      userName: {required},
      password: {},
    }
  }
}
</script>

