import axios from "axios";
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
  },
  getToken(state) {
    const token = state.token !== ""
    if (token) {
      return state.token
    } else {
      return 'token'
    }
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
    let token = localStorage.getItem("token")
    if (token) {
      return axios.get('/auth/' + token)
        .then(response => {
          if (response.data) {
            commit('setUser', response.data)
            commit("setToken", token)
            //router.push("/")
            return true
          } else {
            dispatch('logout')
            return false
          }
        })
    } else {
      return false
    }
  },
  login({commit, dispatch, state}, payload) {
    return axios.post('/auth/recaptcha', payload.recaptcha)
      .then(response => {
        const recaptcha = response.data

        if (recaptcha.action == 'login' && recaptcha.score > 0.5 && recaptcha.success == true) {
          return axios.post('/auth', payload.user)
            .then(response => {
              if (response.data != false) {
                let timer = 3000
                let token = response.data
                localStorage.setItem("token", token)
                commit("setToken", token)
                swal({
                  text: "Giriş Başarılı",
                  icon: "success",
                  button: false,
                  timer: timer,
                  closeOnClickOutside: false,
                });
                setTimeout(() => {
                  router.push("/")
                  //  router.replace('/')
                }, timer)
              } else {
                return false
              }
            })
        } else {
          return false
        }

      })
  },
  logout({commit, dispatch, state}) {
    commit("clearToken")
    localStorage.removeItem("token")
    router.push("/auth")
  },
}

export default {
  state,
  getters,
  mutations,
  actions
}

