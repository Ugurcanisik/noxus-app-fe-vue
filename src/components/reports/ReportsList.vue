<template>
  <div class="card">
    <div class="card-body">

      <div style="text-align: center">
        <DTA
          type="date"
          range
          :format="'DD.MM.YYYY'"
          v-model="$v.reports.dates.$model"
          :shortcuts="shortcuts"
          placeholder="Tarih Seçiniz!"
        >
        </DTA>
        <br>
        <b-form-select
          v-model="$v.reports.type.$model"
          style="width: 300px"
          class="form-control input-border-bottom"
          :options="listTypes()"
        ></b-form-select>
        <br>
        <b-button
          :disabled="$v.reports.$invalid"
          variant="primary"
          size="sm"
          style="margin-top: 15px"
          @click="query"
        >Sorgula
        </b-button>
      </div>

      <div v-if="false" style="width: 100%;">

        <span>Listele  </span>
        <b-form-select
          id="per-page-select"
          v-model="perPage"
          :options="pageOptions"
          size="sm"
          style="width: 100px;"
        ></b-form-select>


        <b-form-group
          label="Arama"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          style="float:right;"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
            ></b-form-input>

          </b-input-group>
        </b-form-group>


        <b-table
          :items="allReports"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          @filtered="onFiltered"
          hover
          head-variant="light"
        >


        </b-table>


        <div>

          <span style="float: left; margin-top: 15px">{{ totalRows }} kayıttan 1 - {{ perPage }} arasındaki kayıtlar gösteriliyor</span>

          <b-pagination
            style="float: right; margin-top: 15px"
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            pills
          ></b-pagination>
        </div>


      </div>
      <b-alert style="margin-top: 20px" show variant="secondary" v-else>Veri Bulunamadı!</b-alert>


    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import {numeric, required} from "vuelidate/lib/validators";

export default {
  components: {
    DTA: DatePicker
  },
  data() {
    return {
      reports: {
        dates: null,
        type: null
      },
      sortBy: 'date',
      sortDesc: true,
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [20, 30, {value: 100, text: "All"}],
      filter: null,
      fields: [
        {key: 'date', label: 'Tarih', sortable: true, class: 'text-center'},
        {key: 'total', label: 'Toplam', sortable: true, class: 'text-center'},
      ],
      shortcuts: [
        {
          text: 'Bugün',
          onClick() {
            const date = new Date();
            return [date, date]
          },
        },
        {
          text: 'Dün',
          onClick() {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            return [date, date]
          },
        },
        {
          text: 'Son 7 Gün',
          onClick() {
            const start = new Date();
            const end = new Date();
            end.setTime(end.getTime() - 7 * 24 * 3600 * 1000);
            return [end, start];
          },
        },
        {
          text: 'Son 30 Gün',
          onClick() {
            const start = new Date();
            const end = new Date();
            end.setTime(end.getTime() - 30 * 24 * 3600 * 1000);
            return [end, start];
          },
        },
        {
          text: 'Bu Ay',
          onClick() {
            const start = new Date();
            start.setDate(1);
            const today = new Date();
            const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            return [start, end];
          },
        },
        {
          text: 'Geçen Ay',
          onClick() {
            const start = new Date();
            const end = new Date();
            end.setMonth(end.getMonth() - 1)
            return [end, start];
          },
        },
        {
          text: 'Son 3 Ay',
          onClick() {
            const start = new Date();
            const end = new Date();
            end.setMonth(end.getMonth() - 3)
            return [end, start];
          },
        },
      ],
    }
  },
  methods: {
    listTypes() {
      const types = this.allTypes
      let typesArray = []

      typesArray.push({value: null, text: 'Gider Türü Seçiniz', disabled: true})
      typesArray.push({value: 'gelir', text: 'Tolam Gelir'})
      typesArray.push({value: 'gider', text: 'Toplam Gider'})

      for (let i in types) {
        typesArray.push({value: types[i].id, text: types[i].name})
      }

      return typesArray
    },
    query() {
      this.$store.dispatch('loading', true)

      const date = {
        startDate: new Date(this.reports.dates[0]).toLocaleString().split(' ')[0],
        endDate: new Date(this.reports.dates[1]).toLocaleString().split(' ')[0],
        type: this.reports.type
      }

      this.$store.dispatch("queryReport", date)
        .then(response => {
          if (response) {
            this.$store.dispatch('loading', false)
          } else {
            this.$store.dispatch('loading', false)
          }
        })


    },
    onFiltered(filteredItems) {
      this.perPage = filteredItems.length
      this.currentPage = 1
    }
  },
  computed: {
    ...mapGetters(["allTypes"]),
    ...mapGetters(["allReports"]),
  },
  validations: {
    reports: {
      dates: {required},
      type: {required}
    },
  }
}
</script>
