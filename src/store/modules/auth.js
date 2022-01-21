import axios from "axios";
import VueCookies from 'vue-cookies'
import {router} from '../../router/router'


const state = {
  token: ""
}

const getters = {
  isAuthenticated(state) {
    return state.token !== ""
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = ""
  }
}

const actions = {
  initAuth({commit}) {

    let token = VueCookies.get('token')
    if (token) {
      commit("setToken", token)
    } else {
      commit("setToken", "")
    }


  },
  login({commit, dispatch, state}, payload) {
    axios.post('/users/auth', payload)
      .then(response => {
        if (response.data != false) {
          let token = response.data
          VueCookies.set('token', token)
          dispatch('alert', 'login')
          setTimeout(() => {
            commit("setToken", token)
            router.replace('/')
          }, 2000)
        } else {
          dispatch('alert', 'warning')
        }
      })


  },
  logout({commit}) {
    VueCookies.remove('token')
    commit("clearToken")
    router.push("/auth")
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

