<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Kategori İşlemleri</h2>
          </div>
        </div>
      </div>
    </div>
    <CategoryList></CategoryList>
    <CategoryUpdate></CategoryUpdate>
  </div>
</template>
<script>
import CategoryList from "./CategoryList";
import CategoryUpdate from "./CategoryUpdate";
import {mapGetters} from "vuex";

export default {
  components: {
    CategoryList,
    CategoryUpdate
  },
  created() {
    if (this.$store.getters.allCategories.length === 0) {
      this.$store.dispatch('initCategoryApp')
        .then(response => {
          this.$store.dispatch('loading', false)
        })
    }
  }
}
</script>

