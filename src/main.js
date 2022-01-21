import Vue from 'vue'
import App from './App.vue'
import {router} from "./router/router";
import {store} from "./store/store";


import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

Vue.use(datePicker)

import axios from "axios";

axios.defaults.baseURL = "http://localhost:8081"

import {Vuelidate} from "vuelidate"

Vue.use(Vuelidate)


import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)


import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

router.beforeEach((to, from, next) => {
  store.dispatch("initAuth");
  next()
})


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
