import axios from "axios";

const state = {
  settings: [],
}

const getters = {
  allSettings(state) {
    return state.settings;
  },
  findOneSetting(id) {
    return state.settings.filter(element => {
      return element.id == id
    })
  },
}

const mutations = {
  updateSettingsList(state, payload) {
    state.settings.push(payload);
  },
}

const actions = {
  initSettingsApp({commit}) {
    return axios.get('/settings')
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          for (let key in data) {
            commit("updateSettingsList", data[key]);
          }
        }
      })
  },

  updateSettings({dispatch, commit, state}, payload) {

    return axios.patch("/settings/" + payload.id, payload.data)
      .then(response => {
        if (response.status === 200) {
          state.settings = []
          payload.data.id = payload.id
          commit('updateSettingsList', payload.data)
          dispatch('alert', 'success')
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

