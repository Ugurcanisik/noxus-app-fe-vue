import axios from "axios";
import tr from "vue2-datepicker/locale/es/tr";

const state = {
  reports: [],
}

const getters = {
  allReports(state) {
    return state.reports;
  },

}

const mutations = {
  updateReportsList(state, payload) {
    state.reports.push(payload);
  },
}

const actions = {
  queryReport({dispatch, commit, state}, payload) {
    return axios.post("/reports", payload)
      .then(response => {
        if (response.status === 201) {
          let data = response.data;
          state.reports = []
          for (let key in data) {
            commit("updateReportsList", data[key]);
          }
        }
        return true
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

