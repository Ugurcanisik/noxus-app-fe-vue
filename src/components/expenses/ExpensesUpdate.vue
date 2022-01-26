<template>
  <b-modal ref="updateExpense" title="Gider Güncelle" hide-footer>
    <div class="modal-content">
      <div class="modal-body">

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateExpense.typeId.$error}">
          <b-form-select
            v-model="$v.updateExpense.typeId.$model"
            class="form-control input-border-bottom"
            :options="listTypes()"
            @change="chanceType($event)"
          ></b-form-select>
        </div>

        <div class="form-group form-floating-label">
          <input
            id="expenseDescription"
            v-model="$v.updateExpense.description.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="expenseDescription" class="placeholder">Açıklama</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateExpense.total.$error}">
          <input
            v-model="$v.updateExpense.total.$model"
            id="expenseTotal"
            type="text" class="form-control input-border-bottom" required>
          <label for="expenseTotal" class="placeholder">Toplam</label>
        </div>

        <div class="form-group form-floating-label">
          <b-form-select
            v-model="$v.updateExpense.staffId.$model"
            class="form-control input-border-bottom"
            :options="listStaffs()"
            :disabled="selectStaff"
          ></b-form-select>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateExpense.date.$error}">
          <date-picker
            class="form-control input-border-bottom"
            :config="{format: 'DD.MM.YYYY HH:mm:ss'}"
            v-model="$v.updateExpense.date.$model"
          >

          </date-picker>
          <label class="placeholder">Tarih</label>
        </div>


      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update" :disabled="$v.updateExpense.$invalid">Güncelle</b-button>
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
      updateExpense: {
        typeId: null,
        description: null,
        total: null,
        staffId: null,
        date: null
      },
      id: null,
      selectStaff: true
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateExpense'].hide()
    },
    update() {
      const updateExpense = {
        id: this.id,
        data: {
          typeexpense: this.updateExpense.typeId,
          description: this.updateExpense.description,
          total: this.updateExpense.total,
          staff: this.updateExpense.staffId,
          date: this.updateExpense.date
        }
      }
      this.$store.dispatch("updateExpense", updateExpense)
        .then(response => {
          if (response) {
            this.$refs['updateExpense'].hide()
          }
        })
    },
    listTypes() {
      const types = this.allTypes
      let typesArray = []

      typesArray.push({value: null, text: 'Gider Türü Seçiniz'})

      for (let i in types) {
        typesArray.push({value: types[i].id, text: types[i].name})
      }

      return typesArray
    },
    listStaffs() {
      const staff = this.allStaff
      let staffArray = []

      staffArray.push({value: null, text: 'Personel Seçiniz'})

      for (let i in staff) {
        staffArray.push({value: staff[i].id, text: staff[i].name})
      }

      return staffArray

    },
    chanceType(id) {
      let types = this.listTypes()
      let findType = types.filter(element => {
        return element.value == id
      })

      if (findType[0].text === 'Maaş') {
        this.selectStaff = false
      } else {
        this.updateExpense.staffId = null
        this.selectStaff = true
      }
    }
  },
  computed: {
    ...mapGetters(['getExpenseModal']),
    ...mapGetters(["allTypes"]),
    ...mapGetters(["allStaff"]),
  },
  watch: {
    getExpenseModal(payload) {
      this.updateExpense.typeId = payload[0].typeexpense.id
      this.updateExpense.description = payload[0].description
      this.updateExpense.total = payload[0].total
      if (payload[0].staff !== null) {
        this.updateExpense.staffId = payload[0].staff.id
        this.selectStaff = false
      } else {
        this.updateExpense.staffId = null
        this.selectStaff = true
      }
      this.updateExpense.date = payload[0].date
      this.id = payload[0].id
      this.$refs['updateExpense'].show()
    }
  },
  validations: {
    updateExpense: {
      typeId: {required},
      description: {},
      total: {required, numeric},
      staffId: {},
      date: {required}
    }
  }
}
</script>
