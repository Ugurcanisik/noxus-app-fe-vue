<template>
  <div class="page-inner mt--5">
    <div class="row mt--2">
      <div class="col-md-6">
        <div class="card full-height">
          <div class="card-body">
            <div class="card-title" style="text-align: center">Gelir</div>
            <div class="row py-3">
              <div class="col-md-4 d-flex flex-column justify-content-around">
                <div>
                  <h6 class="fw-bold text-uppercase op-8">Max Ciro</h6>
                  <h3 class="fw-bold">{{ ciroMax | currency }}</h3>
                </div>
                <div>
                  <h6 class="fw-bold text-uppercase op-8">Toplam Gelir</h6>
                  <h3 class="fw-bold">{{ ciroTotal | currency }}</h3>
                </div>
              </div>
              <div class="col-md-8">
                <div id="chart-container">
                  <canvas id="totalIncomeChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="card full-height">
          <div class="card-body">
            <div class="card-title" style="text-align: center">Gider</div>
            <div class="row py-3">
              <div class="col-md-4 d-flex flex-column justify-content-around">
                <div>
                  <h6 class="fw-bold text-uppercase op-8">Aylık Gider</h6>
                  <h3 class="fw-bold">{{ expenseMonth | currency }}</h3>
                  <div>
                  </div>
                  <h6 class="fw-bold text-uppercase op-8">Toplam Gider</h6>
                  <h3 class="fw-bold">{{ expenseTotal| currency }}</h3>
                </div>
              </div>
              <div class="col-md-8">
                <div id="chart-container2">
                  <canvas id="totalIncomeChart2"></canvas>
                </div>
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
      ciroMax: null,
      ciroTotal: null,
      expenseMonth: null,
      expenseTotal: null
    }
  },
  methods: {
    month(value) {
      const month = {
        '01': 'Ocak',
        '02': 'Şubat',
        '03': 'Mart',
        '04': 'Nisan',
        '05': 'Mayıs',
        '06': 'Haziran',
        '07': 'Temmuz',
        '08': 'Ağustos',
        '09': 'Eylül',
        '10': 'Ekim',
        '11': 'Kasım',
        '12': 'Aralık'
      }
      return month[value]
    },
    chartCiro() {
      const ciro = this.$store.getters.allDashboard
      let monthName = []
      for (const i in ciro.ciro.chart.month) {
        monthName.push(this.month(ciro.ciro.chart.month[i]))
      }
      let totalIncomeChart = document.getElementById('totalIncomeChart').getContext('2d');
      let mytotalIncomeChart = new Chart(totalIncomeChart, {
        type: 'bar',
        data: {
          labels: monthName,
          datasets: [{
            label: "Total Income",
            backgroundColor: '#ff9e27',
            borderColor: 'rgb(23, 125, 255)',
            data: ciro.ciro.chart.total,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              }
            }]
          },
        }
      });
    },
    charExpense() {
      const ciro = this.$store.getters.allDashboard
      let monthName = []
      for (const i in ciro.expense.chart.month) {
        monthName.push(this.month(ciro.expense.chart.month[i]))
      }
      let totalIncomeChart = document.getElementById('totalIncomeChart2').getContext('2d');
      let mytotalIncomeChart = new Chart(totalIncomeChart, {
        type: 'bar',
        data: {
          labels: monthName,
          datasets: [{
            label: "Total Income",
            backgroundColor: '#ff9e27',
            borderColor: 'rgb(23, 125, 255)',
            data: ciro.expense.chart.total,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          scales: {
            xAxes: [{
              gridLines: {
                drawBorder: false,
                display: false
              }
            }]
          },
        }
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.chartCiro()
      this.charExpense()
    }, 300)
  },
  computed: {
    ...mapGetters(["allDashboard"]),
  },
  watch: {
    allDashboard(payload) {
      this.ciroMax = payload.ciro.max,
        this.ciroTotal = payload.ciro.total,
        this.expenseMonth = payload.expense.month,
        this.expenseTotal = payload.expense.total
    }
  }
}
</script>
