<template>
  <b-modal ref="updateProductPicture" title="Ürün Resmi Güncelle" hide-footer>
    <div class="modal-content">
      <div class="modal-body">

        <div class="form-group form-floating-label">
          <b-form-file
            class="form-control input-border-bottom"
            v-model="picture"
            ref="file"
          ></b-form-file>
        </div>

      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update" :disabled="!picture">Güncelle</b-button>
        <b-button variant="danger" @click="closeModal">Kapat</b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>

import {mapGetters} from "vuex";

export default {
  data() {
    return {
      picture: null,
      id: null
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateProductPicture'].hide()
    },
    update() {
      this.$store.dispatch('loading', true)
      const picture = {
        id: this.id,
        data: {
          picture: this.picture
        }
      }
      this.$store.dispatch("updatePicture", picture)
        .then(response => {
          if (response) {
            this.$refs['updateProductPicture'].hide()
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'success')
          } else {
            this.$store.dispatch('loading', false)
            this.$store.dispatch('alert', 'error')
          }
        })
    },
  },
  computed: {
    ...mapGetters(['getProductPictureModal'])
  },
  watch: {
    getProductPictureModal(payload) {
      this.picture = null
      this.id = payload[0].id
      this.$refs['updateProductPicture'].show()
    }
  },
}
</script>
