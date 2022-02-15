import axios from "axios";

const state = {
  types: [],
  find: {}
}

const getters = {
  allTypes(state) {
    return state.types;
  },
  findOneType(id) {
    return state.types.filter(element => {
      return element.id == id
    })
  },
  getTypeModal(state) {
    return state.find
  }
}

const mutations = {
  updateTypesList(state, payload) {
    state.types.push(payload);
  },
  updateTypeModal(state, payload) {
    state.find = payload
  }
}

const actions = {
  initTypesApp({commit}) {
    axios.get('/typeexpenses')
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          state.types = []
          for (let key in data) {
            commit("updateTypesList", data[key]);
          }
        }
      })
  },
  saveType({dispatch, commit, state}, payload) {
    return axios.post("/typeexpenses", payload)
      .then(response => {
        if (response.status === 201) {
          payload.id = response.data.id;
          commit("updateTypesList", payload);
          return true
        } else {
          return false
        }
      })
  },
  findType({dispatch, commit, state}, payload) {
    const type = getters.findOneType(payload)
    if (type.length > 0) {
      commit('updateTypeModal', type)
    }
  },
  updateType({dispatch, commit, state}, payload) {
    const type = getters.findOneType(payload.id)

    if (type.length > 0) {
      return axios.patch("/typeexpenses/" + payload.id, payload.data)
        .then(response => {
          if (response.status === 200) {
            type[0].name = payload.data.name
            return true
          } else {
            return false
          }
        })
    }

  },
  deleteType({dispatch, commit, state}, payload) {

    const type = getters.findOneType(payload)

    if (type.length > 0) {
      return axios.delete("/typeexpenses/" + payload, payload)
        .then(response => {
          if (response.status === 200) {
            let data = state.types
            for (let i in data) {
              if (data[i].id == payload) {
                let index = data.indexOf(data[i])
                state.types.splice(index, 1)
              }
            }
            return true
          } else {
            return false
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

