import axios from "axios";

const state = {
  dash: [],
}

const getters = {
  allDashboard(state) {
    return state.dash;
  },
}

const mutations = {
  updateDashboard(state, payload) {
    state.dash.push(payload);
  },
}

const actions = {
  initDashboardApp({commit}) {
    return axios.get('/dashboard',)
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          for (let key in data) {
            commit("updateDashboard", data[key]);
          }
        }
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

