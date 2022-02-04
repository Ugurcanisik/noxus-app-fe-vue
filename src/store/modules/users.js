import axios from "axios";
import {get} from "vue-js-toggle-button/src/utils";

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
  initUsersApp({dispatch, commit, state}) {
    return axios.get('/users')
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
          return true
        } else {
          return false
        }
      })
  },
  findUser({dispatch, commit, state}, payload) {
    const user = getters.findOneUser(payload)
    if (user.length > 0) {
      commit('updateUserModal', user)
    }
  },
  findAccountSettingsUser({dispatch, commit, state}, payload) {
    const user = getters.findOneUser(payload)
    if (user.length > 0) {
      return user
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
            return true
          } else {
            return false
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

