<template>
  <b-modal ref="updateRoleUser" title="Yetki Güncelle" hide-footer>
    <div class="modal-content">
      <div class="modal-body" style="margin: 0 auto">

        <div style="float: left; ">
          <div class="form-group form-floating-label">
            <toggle-button
              v-model="role.ciro"
              :labels="{checked: 'Gelir', unchecked: 'Gelir'}"
              :width="70"
            />
          </div>

          <div class="form-group form-floating-label">
            <toggle-button
              v-model="role.expenses"
              :labels="{checked: 'Gider', unchecked: 'Gider'}"
              :width="70"
            />
          </div>

          <div class="form-group form-floating-label">
            <toggle-button
              v-model="role.reports"
              :labels="{checked: 'Raporlar', unchecked: 'Raporlar'}"
              :width="90"
            />
          </div>
        </div>

        <div style="float: left; ">
          <div class="form-group form-floating-label">
            <toggle-button
              v-model="role.typeexpenses"
              :labels="{checked: 'Gider Türleri', unchecked: 'Gider Türleri'}"
              :width="116"
            />
          </div>

          <div class="form-group form-floating-label">
            <toggle-button
              v-model="role.categories"
              :labels="{checked: 'Kategoriler', unchecked: 'Kategoriler'}"
              :width="110"
            />
          </div>

          <div class="form-group form-floating-label">
            <toggle-button
              v-model="role.products"
              :labels="{checked: 'Ürünler', unchecked: 'Ürünler'}"
              :width="86"
            />
          </div>
        </div>

        <div style="float: left">
          <div class="form-group form-floating-label">
            <toggle-button
              v-model="role.staff"
              :labels="{checked: 'Personeller', unchecked: 'Personeller'}"
              :width="110"
            />
          </div>

          <div class="form-group form-floating-label">
            <toggle-button
              v-model="role.users"
              :labels="{checked: 'Kullanıcılar', unchecked: 'Kullanıcılar'}"
              :width="110"
            />
          </div>

          <div class="form-group form-floating-label">
            <toggle-button
              v-model="role.settings"
              :labels="{checked: 'Ayarlar', unchecked: 'Ayarlar'}"
              :width="80"
            />
          </div>

        </div>

      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update">Güncelle</b-button>
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
      role: {
        ciro: false,
        expenses: false,
        reports: false,
        typeexpenses: false,
        categories: false,
        products: false,
        staff: false,
        users: false,
        settings: false,
      },
      id: null
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateRoleUser'].hide()
    },
    update() {
      this.$store.dispatch('loading', true)
      const updateUser = {
        id: this.id,
        data: {role: this.role},
      }
      this.$store.dispatch("updateRoleUser", updateUser)
        .then(response => {
          if (response) {
            this.$refs['updateRoleUser'].hide()
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
    ...mapGetters(['getUserRoleModal']),
  },
  watch: {
    getUserRoleModal(payload) {
      const role = JSON.parse(payload[0].role)

      this.role.ciro = role.ciro
      this.role.expenses = role.expenses
      this.role.reports = role.reports
      this.role.typeexpenses = role.typeexpenses
      this.role.categories = role.categories
      this.role.products = role.products
      this.role.staff = role.staff
      this.role.users = role.users
      this.role.settings = role.settings

      this.id = payload[0].id
      this.$refs['updateRoleUser'].show()
    }
  },
}
</script>
