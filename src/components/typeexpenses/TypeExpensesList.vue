<template>
  <div>
    <div class="card">
      <div class="card-header">
        <div class="d-flex align-items-center">
          <AddTypeExpenses style="margin: 0 auto"></AddTypeExpenses>
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
            :items="allTypes"
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
  </div>
</template>
<script>

import {mapGetters} from "vuex";
import AddTypeExpenses from './AddTypeExpenses'

export default {
  components:{
    AddTypeExpenses
  },
  data() {
    return {
      sortBy: 'name',
      sortDesc: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 30, 50, {value: 100, text: "All"}],
      filter: null,
      fields: [
        {key: 'name', label: 'Gider Türü Adı', sortable: true, class: 'text-center'},
        {key: 'actions', label: 'İşlemler', class: 'text-center'}
      ],
    }
  },
  methods: {
    update(id) {
      this.$store.dispatch('findType', id)
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
          this.$store.dispatch("deleteType", id)
            .then(response => {
              if (response) {
                swal({
                  title: 'Silindi!',
                  icon : "success",
                  type: 'success',
                  buttons: {
                    confirm: {
                      className: 'btn btn-success'
                    }
                  }
                });
              } else {
                swal({
                  title: 'Hata!',
                  icon: "error",
                  buttons: {
                    confirm: {
                      className: 'btn btn-danger'
                    }
                  },
                });
              }
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
    ...mapGetters(["allTypes"]),
  },
  mounted() {
    this.totalRows = this.allTypes.length
  },
  watch: {
    allTypes() {
      this.totalRows = this.allTypes.length
    }
  }
}

</script>
