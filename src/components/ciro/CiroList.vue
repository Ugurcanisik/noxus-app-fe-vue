<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <CiroAdd style="margin: 0 auto"></CiroAdd>
      </div>
    </div>
    <div class="card-body">
      <div style="width: 100%">

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
          :items="allCiro"
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

          <template #cell(actions)="row">
            <button
              type="button"
              data-toggle="tooltip" c
              class="btn btn-link btn-primary btn-lg"
              data-original-title="Güncelle"
              @click="update(row.item.id)"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
              type="button"
              data-toggle="tooltip"
              class="btn btn-link btn-danger"
              data-original-title="Sil"
              @click="del(row.item.id)"
            >
              <i class="fa fa-times"></i>
            </button>
          </template>


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
    </div>
  </div>
</template>
<script>
import CiroAdd from './CiroAdd'
import {mapGetters} from "vuex";


export default {
  components: {
    CiroAdd
  },
  data() {
    return {
      sortBy: 'date',
      sortDesc: true,
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      pageOptions: [20, 30, {value: 100, text: "All"}],
      filter: null,
      fields: [
        {key: 'total', label: 'Toplam', sortable: true, class: 'text-center'},
        {key: 'date', label: 'Tarih', sortable: true, class: 'text-center',},
        {key: 'actions', label: 'İşlemler', class: 'text-center'}
      ],
    }
  },
  methods: {
    update(id) {
      this.$store.dispatch('findCiro', id)
    },
    del(id) {
      swal({
        title: 'Silmek İstediğinize Emin Misiniz ?',
        text: "Bu İşlem Geri Alınamaz",
        type: 'warning',
        buttons: {
          confirm: {
            text: 'Evet, Sil!',
            className: 'btn btn-primary'
          },
          cancel: {
            visible: true,
            className: 'btn btn-danger'
          }
        }
      }).then((Delete) => {
        if (Delete) {
          this.$store.dispatch("deleteCiro", id)
            .then(response => {
              swal({
                title: 'Silindi!',
                type: 'success',
                buttons: {
                  confirm: {
                    className: 'btn btn-success'
                  }
                }
              });
            })
        } else {
          swal.close();
        }
      });
    },
    onFiltered(filteredItems) {
      this.perPage = filteredItems.length
      this.currentPage = 1
    }
  },
  computed: {
    ...mapGetters(["allCiro"]),
  },
  mounted() {
    setTimeout(() => {
      this.totalRows = this.allCiro.length
    }, 300)
  },
  watch: {
    allCiro() {
      this.totalRows = this.allCiro.length
    }
  }
}
</script>
