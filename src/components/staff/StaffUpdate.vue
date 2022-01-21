<template>
  <b-modal ref="updateStaff" title="Personel Güncelle" hide-footer>
    <div class="modal-content">
      <div class="modal-body">

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateStaff.name.$error}">
          <input
            id="totalCiro"
            v-model="$v.updateStaff.name.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="totalCiro" class="placeholder">Personel Adı</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateStaff.startDate.$error}">
          <date-picker
            class="form-control input-border-bottom"
            v-model="$v.updateStaff.startDate.$model"
            :config="{format: 'DD.MM.YYYY'}"
          >

          </date-picker>
          <label class="placeholder">Başlangıç Tarihi</label>
        </div>

        <div class="form-group form-floating-label">
          <date-picker
            class="form-control input-border-bottom"
            v-model="$v.updateStaff.endDate.$model"
            :config="{format: 'DD.MM.YYYY'}"
          >

          </date-picker>
          <label class="placeholder">Çıkış Tarihi</label>
        </div>

      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update" :disabled="$v.updateStaff.$invalid">Güncelle</b-button>
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
      updateStaff: {
        name: null,
        startDate: null,
        endDate: null
      },
      id: null
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateStaff'].hide()
    },
    update() {
      const updateStaff= {
        id: this.id,
        data: {
          name:this.updateStaff.name,
          startDate:this.updateStaff.startDate,
          endDate:this.updateStaff.endDate
        }
      }
      this.$store.dispatch("updateStaff", updateStaff)
        .then(response => {
          if (response) {
            this.$refs['updateStaff'].hide()
          }
        })
    }
  },
  computed: {
    ...mapGetters(['getStaffModal']),
  },
  watch: {
    getStaffModal(payload) {
      this.updateStaff.name = payload[0].name
      this.updateStaff.startDate = payload[0].startDate
      this.updateStaff.endDate = payload[0].endDate
      this.id = payload[0].id
      this.$refs['updateStaff'].show()
    }
  },
  validations: {
    updateStaff: {
      name: {required},
      startDate: {required},
      endDate: {},
    }
  }
}
</script>
