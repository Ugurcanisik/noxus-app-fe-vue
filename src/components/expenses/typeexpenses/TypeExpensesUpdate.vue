<template>
  <b-modal ref="updateType" title="Gider Türü Güncelle" hide-footer>
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
        <b-button variant="primary" @click="update" :disabled="$v.name.$invalid">Güncelle</b-button>
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
      this.$refs['updateType'].hide()
    },
    update() {
      this.$store.dispatch('loading', true)
      const updateType = {
        id: this.id,
        data: {
          name: this.name
        }
      }
      this.$store.dispatch("updateType", updateType)
        .then(response => {
          if (response) {
            this.$refs['updateType'].hide()
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'success')
          }else{
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'error')
          }
        })
    }
  },
  computed: {
    ...mapGetters(['getTypeModal']),
  },
  watch: {
    getTypeModal(payload) {
      this.name = payload[0].name
      this.id = payload[0].id
      this.$refs['updateType'].show()
    }
  },
  validations: {
    name: {required}
  }
}
</script>
