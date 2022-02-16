<template>
  <div>


    <b-button class="btn-round ml-auto" variant="primary" @click="openModal">
      <i class="fa fa-plus"></i>
      Gider Ekle
    </b-button>
    <b-modal ref="expenseAdd" title="Gider Ekle" hide-footer>
      <div class="modal-content">
        <div class="modal-body">

          <div class="form-group form-floating-label" :class="{'has-error': $v.newExpense.typeId.$error}">
            <b-form-select
              v-model="$v.newExpense.typeId.$model"
              class="form-control input-border-bottom"
              :options="listTypes()"
              @change="chanceType($event)"
            ></b-form-select>
          </div>

          <div class="form-group form-floating-label">
            <input
              id="expenseDescription"
              v-model="$v.newExpense.description.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="expenseDescription" class="placeholder">Açıklama</label>
          </div>

          <div class="form-group form-floating-label" :class="{'has-error': $v.newExpense.total.$error}">
            <input
              v-model="$v.newExpense.total.$model"
              id="expenseTotal"
              type="number" class="form-control input-border-bottom" required>
            <label for="expenseTotal" class="placeholder">Toplam</label>
          </div>

          <div class="form-group form-floating-label">
            <b-form-select
              v-model="$v.newExpense.staffId.$model"
              class="form-control input-border-bottom"
              :options="listStaffs()"
              :disabled="selectStaff"
            ></b-form-select>
          </div>

          <div class="form-group form-floating-label" :class="{'has-error': $v.newExpense.date.$error}">
            <date-picker
              class="form-control input-border-bottom"
              :config="{format: 'DD.MM.YYYY HH:mm:ss'}"
              v-model="$v.newExpense.date.$model"
            >

            </date-picker>
            <label class="placeholder">Tarih</label>
          </div>

        </div>
        <div class="modal-footer no-bd" style="margin: 0 auto">
          <b-button variant="primary" @click="save" :disabled="$v.newExpense.$invalid">Kaydet</b-button>
          <b-button variant="danger" @click="closeModal">Kapat</b-button>
        </div>
      </div>
    </b-modal>


  </div>


</template>
<script>
import {required, numeric} from "vuelidate/lib/validators"
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      newExpense: {
        typeId: null,
        description: null,
        total: null,
        staffId: null,
        date: null
      },
      selectStaff: true
    }
  },
  methods: {
    openModal() {
      this.newExpense.typeId = null
      this.newExpense.description = null
      this.newExpense.total = null
      this.newExpense.staffId = null
      this.newExpense.date = new Date().toLocaleString()
      this.selectStaff = true
      this.$refs['expenseAdd'].show()
    },
    closeModal() {
      this.$refs['expenseAdd'].hide()
    },
    save() {
      this.$store.dispatch('loading', true)
      let newExpense = {
        typeexpense: this.newExpense.typeId,
        description: this.newExpense.description,
        total: this.newExpense.total,
        staff: this.newExpense.staffId,
        date: this.newExpense.date
      }
      this.$store.dispatch("saveExpense", newExpense)
        .then(response => {
          if (response) {
            this.$refs['expenseAdd'].hide()
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'success')
          } else {
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'error')
          }
        })
    },
    listTypes() {
      const types = this.allTypes
      let typesArray = []

      typesArray.push({value: null, text: 'Gider Türü Seçiniz', disabled: true})

      for (let i in types) {
        typesArray.push({value: types[i].id, text: types[i].name})
      }

      return typesArray
    },
    listStaffs() {
      const staff = this.allStaff
      let staffArray = []

      staffArray.push({value: null, text: 'Personel Seçiniz', disabled: true})

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
        this.newExpense.staffId = null
        this.selectStaff = true
      }
    }
  },
  computed: {
    ...mapGetters(["allTypes"]),
    ...mapGetters(["allStaff"]),
  },
  validations: {
    newExpense: {
      typeId: {required},
      description: {},
      total: {required, numeric},
      staffId: {},
      date: {required},
    }
  }
}
</script>
