<template>

  <div>

    <b-button class="btn-round ml-auto" variant="primary" @click="openModal">
      <i class="fa fa-plus"></i>
      Ürün Ekle
    </b-button>


    <b-modal ref="productAdd" title="Ürün Ekle" hide-footer>
      <div class="modal-content">
        <div class="modal-body">

          <!--

          <div class="form-group form-floating-label">
            <b-form-file
              class="form-control input-border-bottom"
              v-model="newProduct.picture"
            ></b-form-file>
          </div>
-->

          <div class="form-group form-floating-label" :class="{'has-error': $v.newProduct.name.$error}">
            <input
              id="productName"
              v-model="$v.newProduct.name.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="productName" class="placeholder">Ürün Adı</label>
          </div>

          <div class="form-group form-floating-label">
            <input
              id="prodcutDescription"
              v-model="$v.newProduct.description.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="prodcutDescription" class="placeholder">Ürün Açıklaması</label>
          </div>

          <div class="form-group form-floating-label" :class="{'has-error': $v.newProduct.price.$error}">
            <input
              id="productPrice"
              v-model="$v.newProduct.price.$model"
              type="text" class="form-control input-border-bottom" required>
            <label for="productPrice" class="placeholder">Ürün Fiyatı</label>
          </div>

          <div class="form-group form-floating-label" :class="{'has-error': $v.selected.$error}">
            <b-form-select
              class="form-control input-border-bottom"
              v-model="$v.selected.$model"
              :options="listCategory()"
            ></b-form-select>
          </div>

        </div>
        <div class="modal-footer no-bd" style="margin: 0 auto">
          <b-button variant="primary" @click="save" :disabled="$v.newProduct.$invalid || $v.selected.$invalid">Kaydet
          </b-button>
          <b-button variant="danger" @click="closeModal">Kapat</b-button>
        </div>
      </div>
    </b-modal>
  </div>


</template>
<script>
import {required} from "vuelidate/lib/validators"
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  props: ['categoryId'],
  data() {
    return {
      selected: null,
      newProduct: {
        name: null,
        description: null,
        price: null,
      },
    }
  },
  watch: {
    categoryId(payload) {
      this.selected = payload
    }
  },
  methods: {
    openModal() {
      this.newProduct.name = null
      this.newProduct.description = null
      this.newProduct.price = null
      this.newProduct.categoryId = null
      this.$refs['productAdd'].show()
    },
    closeModal() {
      this.$refs['productAdd'].hide()
    },
    save() {
      this.$store.dispatch('loading', true)
      let newProduct = {
        name: this.newProduct.name,
        description: this.newProduct.description,
        price: this.newProduct.price,
        isActive: true,
        category: this.selected
      }
      this.$store.dispatch("saveProduct", newProduct)
        .then(response => {
          if (response) {
            this.$refs['productAdd'].hide()
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'success')
          } else {
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'error')
          }
        })
    },
    listCategory() {
      const category = this.allCategories
      let categoryArray = []

      categoryArray.push({value: null, text: 'Ürün Kategorisi Seçiniz', disabled: true})

      for (let i in category) {
        if (category[i].isActive == true) {
          categoryArray.push({value: category[i].id, text: category[i].name})
        }
      }

      return categoryArray

    }
  },
  computed: {
    ...mapGetters(["allCategories"]),
  },
  validations: {
    newProduct: {
      name: {required},
      price: {required},
      description: {},
    },
    selected: {required}
  }
}
</script>
