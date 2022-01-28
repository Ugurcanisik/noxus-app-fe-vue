import axios from "axios";

const state = {
  dash: null,
}

const getters = {
  allDashboard(state) {
    return state.dash;
  },
}

const mutations = {
  updateDashboard(state, payload) {
    state.dash = payload;
  },
}

const actions = {
  initDashboardApp({commit}) {
    axios.get('/dashboard',)
      .then(response => {
        if (response.status === 200) {
          state.dash = null
          commit("updateDashboard", response.data);
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

