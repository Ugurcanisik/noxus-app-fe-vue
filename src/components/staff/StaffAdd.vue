<template>

  <div>

    <b-button class="btn-round ml-auto" variant="primary" @click="openModal">
      <i class="fa fa-plus"></i>
      Personel Ekle
    </b-button>

    <b-modal ref="staffAdd" title="Personel Ekle" hide-footer>
      <div class="modal-content">
        <div class="modal-body">

          <div class="form-group form-floating-label" :class="{'has-error': $v.newStaff.name.$error}">
            <input
              id="totalCiro"
              v-model="$v.newStaff.name.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="totalCiro" class="placeholder">Personel Adı</label>
          </div>

          <div class="form-group form-floating-label" :class="{'has-error': $v.newStaff.startDate.$error}">
            <date-picker
              class="form-control input-border-bottom"
              v-model="$v.newStaff.startDate.$model"
              :config="{format: 'DD.MM.YYYY'}"
            >
            </date-picker>
            <label class="placeholder">Başlangıç Tarihi</label>
          </div>

        </div>
        <div class="modal-footer no-bd" style="margin: 0 auto">
          <b-button variant="primary" @click="save" :disabled="$v.newStaff.$invalid">Kaydet</b-button>
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
      newStaff: {
        name: null,
        startDate: null,
      }
    }
  },
  methods: {
    openModal() {
      this.newStaff.name = null
      this.newStaff.startDate = new Date().toLocaleDateString()
      this.$refs['staffAdd'].show()
    },
    closeModal() {
      this.$refs['staffAdd'].hide()
    },
    save() {
      let newStaff = {
        name: this.newStaff.name,
        startDate: this.newStaff.startDate,
        isActive: true
      }
      this.$store.dispatch("saveStaff", newStaff)
        .then(response => {
          if (response) {
            this.$refs['staffAdd'].hide()
          }
        })
    }
  },
  validations: {
    newStaff: {
      name: {required},
      startDate: {required},
    }
  }
}
</script>
