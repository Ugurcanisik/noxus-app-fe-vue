<template>


  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <b-form-select
          class="col-md-2"
          style="float: right"
          :options="listCategory()"
          v-model="selected"
          @change="chanceCategory($event)"
        ></b-form-select>
        <ProductAdd style="margin-left: 30%" :categoryId="selected" ></ProductAdd>
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
          :items="allProducts"
          :fields="fields"
          v-sortable="allProducts"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          @filtered="onFiltered"
          hover
          head-variant="light"
        >


          <template v-slot:cell(rank)="row">
            <span :id="'paper_'+row.item.id" :values="JSON.stringify(row.item.id)"></span>
            <i class="fas fa-align-justify"></i>
          </template>


          <template #cell(isActive)="row">
            <toggle-button
              :value="row.item.isActive"
              @change="isActive({id: row.item.id, data:{isActive:$event.value}})"
            />
          </template>

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
import ProductAdd from './ProductsAdd'
import Sortable from 'sortablejs';
import {mapGetters} from "vuex";


export default {
  components: {
    ProductAdd
  },
  data() {
    return {
      selected: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      pageOptions: [{value: 100, text: "All"}, 40, 50,],
      filter: null,
      fields: [
        {key: 'rank', label: 'Sıralama', class: 'text-center'},
        {key: 'name', label: 'Ürün Adı', sortable: true, class: 'text-center'},
        {key: 'description', label: 'Ürün Açıklaması', class: 'text-center'},
        {key: 'price', label: 'Ürün Fiyatı', sortable: true, class: 'text-center'},
        {key: 'isActive', label: 'Aktif mi ?', class: 'text-center',},
        {key: 'actions', label: 'İşlemler', class: 'text-center'}
      ],
    }
  },
  methods: {
    update(id) {
      this.$store.dispatch('findProduct', id)
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
          this.$store.dispatch("deleteProduct", id)
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
    isActive(payload) {
      this.$store.dispatch("isActiveProduct", payload)
    },
    onFiltered(filteredItems) {
      this.perPage = filteredItems.length
      this.currentPage = 1
    },
    listCategory() {
      const category = this.allCategories
      let categoryArray = []

      categoryArray.push({value: null, text: 'Bir Kategori Seçiniz!', disabled: true})

      for (let i in category) {
        categoryArray.push({value: category[i].id, text: category[i].name})
      }
      return categoryArray
    },
    chanceCategory(payload) {
      this.$store.dispatch('chanceCategory', payload)
    }
  },
  computed: {
    ...mapGetters(["allProducts"]),
    ...mapGetters(["allCategories"]),
  },
  watch: {
    allProducts(payload) {
        this.totalRows = this.allProducts.length
    }
  },
  directives: {
    sortable: {
      bind(el, binding, vnode) {
        Sortable.create(el.querySelector('tbody'), {
          ...binding.value,
          vnode: vnode,
          onEnd: (e) => {
            const store = vnode.context.$store;
            let items = el.querySelectorAll("span[id^=paper_]")
            let ranks = []

            for (let i = 0; i < items.length; i++) {
              let item = JSON.parse(items[i].getAttribute('values'))
              let rank = {
                id: item,
                rank: i
              }
              ranks.push(rank)
            }
            store.dispatch('sortableProducts', ranks)
          },
        });
      },
    }
  }
}
</script>
