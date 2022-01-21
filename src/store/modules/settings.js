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
    axios.get('/settings')
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          for (let key in data) {
            data[key].id = key;
            commit("updateSettingsList", data[key]);
          }
        }
      })
  },

  updateSettings({dispatch, commit, state}, payload) {
    const setting = getters.findOneSetting(payload.id)

    if (setting.length > 0) {
      return axios.patch("/settings/" + payload.id + '.json', payload.data)
        .then(response => {
          if (response.status === 200) {
            setting[0].logo = payload.data.logo
            setting[0].ico = payload.data.ico
            setting[0].title = payload.data.title
            setting[0].description = payload.data.description
            setting[0].keywords = payload.data.keywords
            setting[0].companyName = payload.data.companyName
            dispatch('alert', 'success')
            return true
          }
        })
    }

  },

}

export default {
  state,
  getters,
  mutations,
  actions
}

