<template>
  <b-modal ref="updateCategory" title="Kategori Güncelle" hide-footer>
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
        <b-button variant="primary" @click="update" :disabled="$v.$invalid">Güncelle</b-button>
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
      name: null,
      id: null
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateCategory'].hide()
    },
    update() {
      this.$store.dispatch('loading', true)
      const updateCategory = {
        id: this.id,
        data: {
          name: this.name
        }
      }
      this.$store.dispatch("updateCategory", updateCategory)
        .then(response => {
          if (response) {
            setTimeout(() => {
              this.$refs['updateCategory'].hide()
              this.$store.dispatch('loading', false)
              this.$store.dispatch('alert', 'success')
            }, 1000)
          }
        })
    }
  },
  computed: {
    ...mapGetters(['getCategoryModal']),
  },
  watch: {
    getCategoryModal(payload) {
      this.name = payload[0].name
      this.id = payload[0].id
      this.$refs['updateCategory'].show()
    }
  },
  validations: {
    name: {required}
  }
}
</script>
