import axios from "axios";

const state = {
  ciro: [],
  find: {}
}

const getters = {
  allCiro(state) {
    return state.ciro;
  },
  findOneCiro(id) {
    return state.ciro.filter(element => {
      return element.id == id
    })
  },
  getCiroModal(state) {
    return state.find
  }
}

const mutations = {
  updateCiroList(state, payload) {
    state.ciro.push(payload);
  },
  updateCiroModal(state, payload) {
    state.find = payload
  }
}

const actions = {
  initCiroApp({commit}) {
    axios.get('/ciro',)
      .then(response => {
        if (response.status === 200) {
          state.ciro = []
          let data = response.data;
          for (let key in data) {
            data[key].total = parseFloat(data[key].total).toLocaleString() + ' TL'
            commit("updateCiroList", data[key]);
          }
        }
      })
  },
  saveCiro({dispatch, commit, state}, payload) {
    return axios.post("/ciro", payload)
      .then(response => {
        if (response.status === 201) {
          payload.id = response.data.id;
          commit("updateCiroList", payload);
          dispatch('alert', 'success')
          dispatch('initDashboardApp')
          return true
        } else {
          dispatch('alert', 'error')
        }
      })
  },
  findCiro({dispatch, commit, state}, payload) {
    const ciro = getters.findOneCiro(payload)
    if (ciro.length > 0) {
      commit('updateCiroModal', ciro)
    }
  },
  updateCiro({dispatch, commit, state}, payload) {
    const ciro = getters.findOneCiro(payload.id)

    if (ciro.length > 0) {
      return axios.patch("/ciro/" + payload.id, payload.data)
        .then(response => {
          if (response.status === 200) {
            ciro[0].total = payload.data.total
            ciro[0].date = payload.data.date
            dispatch('alert', 'success')
            dispatch('initDashboardApp')
            return true
          }
        })
    }

  },
  deleteCiro({dispatch, commit, state}, payload) {

    const ciro = getters.findOneCiro(payload)

    if (ciro.length > 0) {
      return axios.delete("/ciro/" + payload, payload)
        .then(response => {
          if (response.status === 200) {
            let data = state.ciro
            for (let i in data) {
              if (data[i].id == payload) {
                let index = data.indexOf(data[i])
                state.ciro.splice(index, 1)
              }
            }
            dispatch('initDashboardApp')
          }
        })
    }

  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

