import Vue from 'vue'
import App from './App.vue'
import {router} from "./router/router";
import {store} from "./store/store";


import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})


import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

Vue.use(datePicker)

import axios from "axios";

axios.defaults.baseURL = "https://noxus-app-be-y4g5lbddia-ez.a.run.app/"
//axios.defaults.baseURL = "http://localhost:8081/"
//axios.defaults.withCredentials = true;
//axios.defaults.headers.token = this.$store.getters.isAuthenticated()
//axios.defaults.headers.common['token'] = store.getters.getToken;
axios.interceptors.request.use(function (config) {

  const token = store.getters.getToken
  config.headers.token = token;
  return config;

});

import {Vuelidate} from "vuelidate"

Vue.use(Vuelidate)


import ToggleButton from 'vue-js-toggle-button'

Vue.use(ToggleButton)


import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)



Vue.filter("currency", (value) => {
  return parseFloat(value).toLocaleString(undefined) + " ₺"
})


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
