<template>
  <b-modal ref="updateCiro" title="Gelir Güncelle" hide-footer>
    <div class="modal-content">
      <div class="modal-body">

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateCiro.total.$error}">
          <input
            id="totalCiro"
            v-model="$v.updateCiro.total.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="totalCiro" class="placeholder">Toplam</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateCiro.date.$error}">
          <date-picker
            class="form-control input-border-bottom"
            v-model="$v.updateCiro.date.$model"
            :config="{format: 'DD.MM.YYYY'}"
          >

          </date-picker>
          <label class="placeholder">Tarih</label>
        </div>


      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update" :disabled="$v.updateCiro.$invalid">Güncelle</b-button>
        <b-button variant="danger" @click="closeModal">Kapat</b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
import {required, numeric} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      updateCiro: {
        total: null,
        date: null
      },
      id: null
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateCiro'].hide()
    },
    update() {
      this.$store.dispatch('loading', true)
      const updateCiro = {
        id: this.id,
        data: {
          total: this.updateCiro.total,
          date: this.updateCiro.date
        }
      }
      this.$store.dispatch("updateCiro", updateCiro)
        .then(response => {
          if (response) {
            setTimeout(() => {
              this.$refs['updateCiro'].hide()
              this.$store.dispatch('loading', false)
              this.$store.dispatch('alert', 'success')
            }, 1000)
          }
        })
    }
  },
  computed: {
    ...mapGetters(['getCiroModal']),
  },
  watch: {
    getCiroModal(payload) {
      this.updateCiro.total = payload[0].total
      this.updateCiro.date = payload[0].date
      this.id = payload[0].id
      this.$refs['updateCiro'].show()
    }
  },
  validations: {
    updateCiro: {
      total: {required, numeric},
      date: {required}
    }
  }
}
</script>
