<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Ciro İşlemleri</h2>
          </div>
        </div>
      </div>
    </div>
    <CiroList></CiroList>
    <CiroUpdate></CiroUpdate>
  </div>
</template>
<script>
import CiroList from "./CiroList";
import CiroUpdate from "./CiroUpdate";
import {mapGetters} from "vuex";

export default {
  components: {
    CiroList,
    CiroUpdate
  },
}
</script>

