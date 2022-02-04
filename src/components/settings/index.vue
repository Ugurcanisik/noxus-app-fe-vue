<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Genel Ayarlar</h2>
          </div>
        </div>
      </div>
    </div>


    <div class="modal-content col-md-8" style="margin: 20px auto">
      <div class="modal-body ">

        <div class="form-group form-floating-label" :class="{'has-error': $v.settings.logo.$error}">
          <input
            id="logo"
            v-model="$v.settings.logo.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="logo" class="placeholder">Logo</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.settings.ico.$error}">
          <input
            id="ico"
            v-model="$v.settings.ico.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="ico" class="placeholder">İco</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.settings.title.$error}">
          <input
            id="title"
            v-model="$v.settings.title.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="title" class="placeholder">Başlık</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.settings.description.$error}">
          <input
            id="description"
            v-model="$v.settings.description.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="description" class="placeholder">Açıklama</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.settings.keywords.$error}">
          <input
            id="keywords"
            v-model="$v.settings.keywords.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="keywords" class="placeholder">Anahtar Kelimeler</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.settings.companyName.$error}">
          <input
            id="companyName"
            v-model="$v.settings.companyName.$model"
            type="text" class="form-control input-border-bottom" required>
          <label for="companyName" class="placeholder">Firma Adı</label>
        </div>

      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update" :disabled="$v.settings.$invalid">Kaydet</b-button>
      </div>
    </div>


  </div>
</template>
<script>


import {required} from "vuelidate/lib/validators";
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      settings: {
        logo: null,
        ico: null,
        title: null,
        description: null,
        keywords: null,
        companyName: null
      },
      id: null
    }
  },
  methods: {
    update() {
      this.$store.dispatch("updateSettings", {id: this.id, data: this.settings})
    }
  },
  computed: {
    ...mapGetters(['allSettings'])
  },
  mounted() {
    const settings = this.allSettings
    this.settings.logo = settings[0].logo
    this.settings.ico = settings[0].ico
    this.settings.title = settings[0].title
    this.settings.description = settings[0].description
    this.settings.keywords = settings[0].keywords
    this.settings.companyName = settings[0].companyName
    this.id = settings[0].id

  },
  watch: {
    allSettings(settings) {
      this.settings.logo = settings[0].logo
      this.settings.ico = settings[0].ico
      this.settings.title = settings[0].title
      this.settings.description = settings[0].description
      this.settings.keywords = settings[0].keywords
      this.settings.companyName = settings[0].companyName
      this.id = settings[0].id

    }
  },
  validations: {
    settings: {
      logo: {required},
      ico: {required},
      title: {required},
      description: {required},
      keywords: {required},
      companyName: {required}
    }
  }
}
</script>

