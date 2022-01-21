<template>
  <b-modal ref="updateProduct" title="Ürün Güncelle" hide-footer>
    <div class="modal-content">
      <div class="modal-body">


        <div class="form-group form-floating-label">
          <b-form-file
            class="form-control input-border-bottom"
            v-model="$v.updateProduct.picture.$model"
            ref="file"
          ></b-form-file>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateProduct.name.$error}">
          <input
            id="productName"
            v-model="$v.updateProduct.name.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="productName" class="placeholder">Ürün Adı</label>
        </div>

        <div class="form-group form-floating-label">
          <input
            id="prodcutDescription"
            v-model="$v.updateProduct.description.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="prodcutDescription" class="placeholder">Ürün Açıklaması</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateProduct.price.$error}">
          <input
            id="productPrice"
            v-model="$v.updateProduct.price.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="productPrice" class="placeholder">Ürün Fiyatı</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateProduct.categoryId.$error}">
          <b-form-select
            class="form-control input-border-bottom"
            v-model="$v.updateProduct.categoryId.$model"
            :options="listCategory()"
          ></b-form-select>
        </div>

      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update" :disabled="$v.updateProduct.$invalid">Güncelle</b-button>
        <b-button variant="danger" @click="closeModal">Kapat</b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      updateProduct: {
        picture: null,
        name: null,
        description: null,
        price: null,
        categoryId: null
      },
      id: null
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateProduct'].hide()
    },
    update() {
      const updateProduct= {
        id: this.id,
        data: {
          picture: this.updateProduct.picture,
          name: this.updateProduct.name,
          description: this.updateProduct.description,
          price: this.updateProduct.price,
          category: this.updateProduct.categoryId
        }
      }
      this.$store.dispatch("updateProduct", updateProduct)
        .then(response => {
          if (response) {
            this.$refs['updateProduct'].hide()
          }
        })
    },
    listCategory() {
      const category = this.allCategories
      let categoryArray = []

      categoryArray.push({value: null, text: 'Ürün Kategorisi Seçiniz'})

      for (let i in category) {
        categoryArray.push({value: category[i].id, text: category[i].name})
      }

      return categoryArray

    }
  },
  computed: {
    ...mapGetters(['getProductModal']),
    ...mapGetters(["allCategories"]),
  },
  watch: {
    getProductModal(payload) {
      this.updateProduct.name = payload[0].name
      this.updateProduct.description = payload[0].description
      this.updateProduct.price = payload[0].price
      this.updateProduct.categoryId = payload[0].category.id
      this.id = payload[0].id
      this.$refs['updateProduct'].show()
    }
  },
  validations: {
    updateProduct: {
      picture: {},
      name: {required},
      price: {required},
      description: {},
      categoryId: {required}
    }
  }
}
</script>
