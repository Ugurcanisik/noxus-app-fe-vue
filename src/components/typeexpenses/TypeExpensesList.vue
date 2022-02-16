<template>
  <div>

    <b-button class="btn-round ml-auto" variant="primary" @click="openListModal">
      <i class="fa fa-plus"></i>
      Gider Türü Ekle
    </b-button>



    <b-modal ref="typeExpenses" title="Gider Türleri" hide-footer>
      <div class="modal-content">
        <div class="modal-body">

          <b-table
            :items="allTypes"
            :fields="fields"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            hover
            head-variant="light"
            sticky-header
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


        </div>
        <div class="modal-footer no-bd" style="margin: 0 auto">
          <AddTypeExpenses></AddTypeExpenses>
          <b-button variant="danger" @click="closeListModal">Kapat</b-button>
        </div>
      </div>
    </b-modal>
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
      fields: [
        {key: 'name', label: 'Gider Türü Adı', sortable: true, class: 'text-center'},
        {key: 'actions', label: 'İşlemler', class: 'text-center'}
      ],
    }
  },
  methods: {
    openListModal() {
      this.$refs['typeExpenses'].show()
    },
    closeListModal() {
      this.$refs['typeExpenses'].hide()
    },
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
  },
  computed: {
    ...mapGetters(["allTypes"]),
  },
}

</script>
