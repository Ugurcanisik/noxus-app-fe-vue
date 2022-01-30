<template>

  <div>
    <b-button class="btn-round ml-auto" variant="primary" @click="openModal">
      <i class="fa fa-plus"></i>
      Gelir Ekle
    </b-button>

    <b-modal ref="ciroAdd" title="Gelir Ekle" hide-footer>
      <div class="modal-content">
        <div class="modal-body">

          <div class="form-group form-floating-label" :class="{'has-error': $v.newCiro.total.$error}">
            <input
              id="totalCiro"
              v-model="$v.newCiro.total.$model"
              type="number" class="form-control input-border-bottom" required>
            <label for="totalCiro" class="placeholder">Toplam</label>
          </div>

          <div class="form-group form-floating-label" :class="{'has-error': $v.newCiro.date.$error}">
            <date-picker
              class="form-control input-border-bottom"
              v-model="$v.newCiro.date.$model"
              :config="{format: 'DD.MM.YYYY'}"
            >

            </date-picker>
            <label class="placeholder">Tarih</label>
          </div>

        </div>
        <div class="modal-footer no-bd" style="margin: 0 auto">
          <b-button variant="primary" @click="save" :disabled="$v.newCiro.$invalid">Kaydet</b-button>
          <b-button variant="danger" @click="closeModal">Kapat</b-button>
        </div>
      </div>
    </b-modal>
  </div>


</template>
<script>
import {required, numeric} from "vuelidate/lib/validators"

export default {
  data() {
    return {
      newCiro: {
        total: null,
        date: null
      }
    }
  },
  methods: {
    openModal() {
      this.newCiro.total = null
      this.newCiro.date = new Date().toLocaleDateString()
      this.$refs['ciroAdd'].show()
    },
    closeModal() {
      this.$refs['ciroAdd'].hide()
    },
    save() {
      this.$store.dispatch('loading', true)
      let newCiro = {
        total: this.newCiro.total,
        date: this.newCiro.date,
      }
      this.$store.dispatch("saveCiro", newCiro)
        .then(response => {
          if (response) {
            this.$refs['ciroAdd'].hide()
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'success')
          } else {
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'error')
          }
        })
    }
  },
  validations: {
    newCiro: {
      total: {required, numeric},
      date: {required}
    }
  }
}
</script>
