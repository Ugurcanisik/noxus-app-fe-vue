<template>
  <b-modal ref="updateExpense" hide-header hide-footer>
    <div class="modal-content">
      <div class="modal-body">


        <p>
          {{ details }}
        </p>


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
      details: ""
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateExpense'].hide()
    },
  },
  computed: {
    ...mapGetters(['getDetailsExpenseModal']),

  },
  watch: {
    getDetailsExpenseModal(payload) {
      this.details = ""
      if (payload.description || payload.staff) {
        if (payload.description) {
          this.details = 'Açıklama : ' + payload.description
        }

        if (payload.staff) {
          this.details += payload.staff.name + ' : ' + payload.total
        }
        this.$refs['updateExpense'].show()
      }

    }
  },

}
</script>
