<template>

  <div>

    <b-button class="btn-round ml-auto" variant="primary" @click="openModal">
      <i class="fa fa-plus"></i>
      Kategori Ekle
    </b-button>


    <b-modal ref="categoryAdd" title="Kategori Ekle" hide-footer>
      <div class="modal-content">
        <div class="modal-body">

          <div class="form-group form-floating-label" :class="{'has-error': $v.name.$error}">
            <input
              id="categoryName"
              v-model="$v.name.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="categoryName" class="placeholder">Kategori Adı</label>
          </div>


        </div>
        <div class="modal-footer no-bd" style="margin: 0 auto">
          <b-button variant="primary" @click="save" :disabled="$v.$invalid">Kaydet</b-button>
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
      this.$refs['categoryAdd'].show()
    },
    closeModal() {
      this.$refs['categoryAdd'].hide()
    },
    save() {
      let newCategory = {
        name: this.name,
        isActive: true
      }
      this.$store.dispatch("saveCategory", newCategory)
        .then(response => {
          if (response) {
            this.$refs['categoryAdd'].hide()
          }
        })
    }
  },
  validations: {
    name: {required}
  }
}
</script>
