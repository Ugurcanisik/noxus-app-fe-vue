import Vue from "vue";
import Vuex from "vuex";
import category from "./modules/category";
import ciro from "./modules/ciro";
import product from "./modules/product";
import staff from "./modules/staff";
import TypeExpenses from "./modules/typeExpenses";
import expenses from "./modules/expenses";
import settings from "./modules/settings";
import users from './modules/users'
import auth from './modules/auth'
import dashboard from './modules/dashboard'

import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loading: null
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
  },
  mutations: {
    updateLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    alert({dispatch, commit, state}, type) {
      switch (type) {
        case 'success':
          iziToast.success({
            title: 'OK',
            message: 'İşlem Başarılı!',
            position: 'topRight'
          });
          break
        case 'error':
          iziToast.error({
            title: 'Error',
            message: 'Illegal operation',
            position: 'topRight'
          });
          break
        case 'warning':
          iziToast.warning({
            title: 'Caution',
            message: 'Bilinmeye Hata!',
            position: 'topRight'
          });
          break
        case 'login':
          swal({
            icon: "success",
            title: "Giriş Başarılı",
            button: false,
            closeOnClickOutside: false,
            width: '600px',
            timer: 2000,
          });
          break
      }
    },
    loading({dispatch, commit, state}, payload) {
      commit("updateLoading", payload);
    }
  },
  modules: {
    category,
    ciro,
    product,
    staff,
    TypeExpenses,
    expenses,
    settings,
    users,
    auth,
    dashboard
  }
});
