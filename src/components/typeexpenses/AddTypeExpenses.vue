<template>
  <div>
    <b-button class="btn-round ml-auto" variant="primary" @click="openModal">
      <i class="fa fa-plus"></i>
      Gider Türü Ekle
    </b-button>

    <b-modal ref="typeExpensesAdd" title="Gider Türü Ekle" hide-footer>
      <div class="modal-content">
        <div class="modal-body">

          <div class="form-group form-floating-label" :class="{'has-error': $v.name.$error}">
            <input
              id="totalCiro"
              v-model="$v.name.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="totalCiro" class="placeholder">Gider Türü</label>
          </div>

        </div>
        <div class="modal-footer no-bd" style="margin: 0 auto">
          <b-button variant="primary" @click="save" :disabled="$v.name.$invalid">Kaydet</b-button>
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
      name: null
    }
  },
  methods: {
    openModal() {
      this.name = null
      this.$refs['typeExpensesAdd'].show()
    },
    closeModal() {
      this.$refs['typeExpensesAdd'].hide()
    },
    save() {
      this.$store.dispatch('loading', true)
      let newType = {
        name: this.name
      }
      this.$store.dispatch("saveType", newType)
        .then(response => {
          if (response) {
            this.$refs['typeExpensesAdd'].hide()
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
    name: {required}
  }
}
</script>
