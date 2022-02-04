<template>
  <div class="row page-inner mt--5">
    <div class="col-sm-6 col-md-3">
      <div class="card card-stats card-round">
        <div class="card-body ">
          <div class="row">
            <div class="col-5">
              <div class="icon-big text-center">
                <i class="flaticon-coins text-success"></i>
              </div>
            </div>
            <div class="col-7 col-stats">
              <div class="numbers">
                <p class="card-category">Günlük Ciro</p>
                <h4 class="card-title">{{ ciroYesterday | currency }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="card card-stats card-round">
        <div class="card-body ">
          <div class="row">
            <div class="col-5">
              <div class="icon-big text-center">
                <i class="flaticon-graph-2 text-info"></i>
              </div>
            </div>
            <div class="col-7 col-stats">
              <div class="numbers">
                <p class="card-category">Ortalama Ciro</p>
                <h4 class="card-title">{{ ciroAverage | currency }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="card card-stats card-round">
        <div class="card-body">
          <div class="row">
            <div class="col-5">
              <div class="icon-big text-center">
                <i class="flaticon-graph text-warning"></i>
              </div>
            </div>
            <div class="col-7 col-stats">
              <div class="numbers">
                <p class="card-category">Aylık Ciro</p>
                <h4 class="card-title">{{ ciroMonth | currency }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="card card-stats card-round">
        <div class="card-body">
          <div class="row">
            <div class="col-5">
              <div class="icon-big text-center">
                <i class="flaticon-network text-danger"></i>
              </div>
            </div>
            <div class="col-7 col-stats">
              <div class="numbers">
                <p class="card-category">Günlük Gider</p>
                <h4 class="card-title">{{ expenseToday | currency }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      ciroYesterday: null,
      ciroAverage: null,
      ciroMonth: null,
      expenseToday: null
    }
  },
  computed: {
    ...mapGetters(["allDashboard"]),
  },
  mounted() {
    if (this.$store.getters.allDashboard.length > 0) {
      this.ciroYesterday = this.allDashboard[0].yesterday,
        this.ciroAverage = this.allDashboard[0].average,
        this.ciroMonth = this.allDashboard[0].month,
        this.expenseToday = this.allDashboard[1].today
    }
  },
  watch: {
    allDashboard(payload) {
      this.ciroYesterday = payload[0].yesterday,
        this.ciroAverage = payload[0].average,
        this.ciroMonth = payload[0].month,
        this.expenseToday = payload[1].today
    }
  },
}
</script>
