<template>
  <div>
    <div class="panel-header bg-primary-gradient">
      <div class="page-inner py-5">
        <div class="d-flex align-items-left align-items-md-center flex-column flex-md-row">
          <div>
            <h2 class="text-white pb-2 fw-bold">Personel İşlemleri</h2>
          </div>
        </div>
      </div>
    </div>
    <StaffList></StaffList>
    <StaffUpdate></StaffUpdate>
  </div>
</template>
<script>
import StaffList from "./StaffList";
import StaffUpdate from "./StaffUpdate";

export default {
  components: {
    StaffList,
    StaffUpdate
  }
}
</script>

