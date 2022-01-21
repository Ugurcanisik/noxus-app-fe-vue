import axios from "axios";

const state = {
  users: [],
  find: {}
}

const getters = {
  allUsers(state) {
    return state.users;
  },
  findOneUser(id) {
    return state.users.filter(element => {
      return element.id == id
    })
  },
  getUserModal(state) {
    return state.find
  }
}

const mutations = {
  updateUsersList(state, payload) {
    state.users.push(payload);
  },
  updateUserModal(state, payload) {
    state.find = payload
  }
}

const actions = {
  initUsersApp({commit}) {
    axios.get('/users')
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          for (let key in data) {
            commit("updateUsersList", data[key]);
          }
        }
      })
  },
  saveUser({dispatch, commit, state}, payload) {
    return axios.post("/users", payload)
      .then(response => {
        if (response.status === 201) {
          payload.id = response.data.id;
          commit("updateUsersList", payload);
          dispatch('alert', 'success')
          return true
        } else {
          dispatch('alert', 'error')
        }
      })
  },
  findUser({dispatch, commit, state}, payload) {
    const user = getters.findOneUser(payload)
    if (user.length > 0) {
      commit('updateUserModal', user)
    }
  },
  updateUser({dispatch, commit, state}, payload) {
    const user = getters.findOneUser(payload.id)

    if (user.length > 0) {
      return axios.patch("/users/" + payload.id, payload.data)
        .then(response => {
          if (response.status === 200) {
            user[0].name = payload.data.name
            user[0].lastName = payload.data.lastName
            user[0].userName = payload.data.userName
            dispatch('alert', 'success')
            return true
          }
        })
    }

  },
  deleteUser({dispatch, commit, state}, payload) {

    const user = getters.findOneUser(payload)

    if (user.length > 0) {
      return axios.delete("/users/" + payload, payload)
        .then(response => {
          if (response.status === 200) {
            let data = state.users
            for (let i in data) {
              if (data[i].id == payload) {
                let index = data.indexOf(data[i])
                state.users.splice(index, 1)
              }
            }
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

