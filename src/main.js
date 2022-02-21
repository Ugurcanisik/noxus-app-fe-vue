import Vue from 'vue'
import App from './App.vue'
import {store} from "./store/store";
import {router} from "./router/router";


import VueMeta from 'vue-meta'


import {Vuelidate} from "vuelidate"
import ToggleButton from 'vue-js-toggle-button'
import {BootstrapVue} from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import datePicker from 'vue-bootstrap-datetimepicker';
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';


import axios from "axios";

axios.defaults.baseURL = "https://noxus-app-be-y4g5lbddia-ez.a.run.app/"
//axios.defaults.baseURL = "http://localhost:8081/";
//axios.defaults.withCredentials = true;
//axios.defaults.headers.token = this.$store.getters.isAuthenticated()
//axios.defaults.headers.common['token'] = store.getters.getToken;


axios.interceptors.request.use(function (config) {

  const token = store.getters.getToken
  config.headers.token = token;
  return config;

});


Vue.use(Vuelidate)
Vue.use(ToggleButton)
Vue.use(datePicker)
Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})
Vue.use(BootstrapVue)


Vue.filter("currency", (value) => {
  return parseFloat(value).toLocaleString(undefined) + " ₺"
})


store.dispatch('initAuth').then(response => {
  new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
  })
}).catch(e => {
  console.log(e)
})




