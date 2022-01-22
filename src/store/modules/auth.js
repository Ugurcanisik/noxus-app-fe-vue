import axios from "axios";
import VueCookies from 'vue-cookies'
import {router} from '../../router/router'


const state = {
  token: "",
  user: null
}

const getters = {
  isAuthenticated(state) {
    return state.token !== ""
  },
  getUser(state) {
    return state.user
  }
}

const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = ""
  },
  setUser(state, payload) {
    state.user = payload
  }
}

const actions = {
  initAuth({commit, dispatch, state}) {
    let token = VueCookies.get('token')
    if (token) {
      return axios.get('/auth')
        .then(response => {
          if (response.status == 200) {
            if (response.data != false) {
              commit("setToken", token)
              commit('setUser', response.data)
              return
            } else {
              commit("setToken", "")
            }
          }
        })
    } else {
      commit("setToken", "")
    }


  },
  login({commit, dispatch, state}, payload) {
    axios.post('/auth', payload)
      .then(response => {
        if (response.data != false) {
          let token = response.data
          VueCookies.set('token', token)
          dispatch('alert', 'login')
          setTimeout(() => {
            commit("setToken", token)
            router.replace('/dashboard')
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

