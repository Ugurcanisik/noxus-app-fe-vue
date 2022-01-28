<template>
  <b-modal ref="updateUser" title="Kullanıcı Güncelle" hide-footer>
    <div class="modal-content">
      <div class="modal-body">

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateUser.name.$error}">
          <input
            id="name"
            v-model="$v.updateUser.name.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="name" class="placeholder">İsim</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateUser.lastName.$error}">
          <input
            id="lastName"
            v-model="$v.updateUser.lastName.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="lastName" class="placeholder">Soyisim</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateUser.userName.$error}">
          <input
            id="userName"
            v-model="$v.updateUser.userName.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="userName" class="placeholder">Kullanıcı Adı</label>
        </div>


      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update" :disabled="$v.updateUser.$invalid">Güncelle</b-button>
        <b-button variant="danger" @click="closeModal">Kapat</b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      updateUser: {
        name: null,
        lastName: null,
        userName: null
      },
      id: null
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateUser'].hide()
    },
    update() {
      this.$store.dispatch('loading', true)
      const updateUser = {
        id: this.id,
        data: {
          name: this.updateUser.name,
          lastName: this.updateUser.lastName,
          userName: this.updateUser.userName
        }
      }
      this.$store.dispatch("updateUser", updateUser)
        .then(response => {
          if (response) {
            setTimeout(() => {
              this.$refs['updateUser'].hide()
              this.$store.dispatch('loading', false)
              this.$store.dispatch('alert', 'success')
            }, 1000)
          }
        })
    }
  },
  computed: {
    ...mapGetters(['getUserModal']),
  },
  watch: {
    getUserModal(payload) {
      this.updateUser.name = payload[0].name
      this.updateUser.lastName = payload[0].lastName
      this.updateUser.userName = payload[0].userName
      this.id = payload[0].id
      this.$refs['updateUser'].show()
    }
  },
  validations: {
    updateUser: {
      name: {required},
      lastName: {required},
      userName: {required}
    }
  }
}
</script>
