import axios from "axios";

const state = {
  dash: {},
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
        console.log(response)
        commit("updateDashboard", response.data);
      })
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

