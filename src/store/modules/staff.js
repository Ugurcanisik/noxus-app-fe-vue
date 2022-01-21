import axios from "axios";

const state = {
  staff: [],
  find: {}
}

const getters = {
  allStaff(state) {
    return state.staff;
  },
  findOneStaff(id) {
    return state.staff.filter(element => {
      return element.id == id
    })
  },
  getStaffModal(state) {
    return state.find
  }
}

const mutations = {
  updateStaffList(state, payload) {
    state.staff.push(payload);
  },
  updateStaffModal(state, payload) {
    state.find = payload
  }
}

const actions = {
  initStaffApp({commit}) {
    axios.get('/staff')
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          for (let key in data) {
            commit("updateStaffList", data[key]);
          }
        }
      })
  },
  saveStaff({dispatch, commit, state}, payload) {
    return axios.post("/staff", payload)
      .then(response => {
        if (response.status === 201) {
          payload.id = response.data.id;
          commit("updateStaffList", payload);
          dispatch('alert', 'success')
          return true
        } else {
          dispatch('alert', 'error')
        }
      })
  },
  findStaff({dispatch, commit, state}, payload) {
    const staff = getters.findOneStaff(payload)
    if (staff.length > 0) {
      commit('updateStaffModal', staff)
    }
  },
  updateStaff({dispatch, commit, state}, payload) {
    const staff = getters.findOneStaff(payload.id)

    if (staff.length > 0) {
      return axios.patch("/staff/" + payload.id, payload.data)
        .then(response => {
          if (response.status === 200) {
            staff[0].name = payload.data.name
            staff[0].startDate = payload.data.startDate
            staff[0].endDate = payload.data.endDate
            dispatch('alert', 'success')
            return true
          }
        })
    }

  },
  deleteStaff({dispatch, commit, state}, payload) {

    const staff = getters.findOneStaff(payload)

    if (staff.length > 0) {
      return axios.delete("/staff/" + payload, payload)
        .then(response => {
          if (response.status === 200) {
            let data = state.staff
            for (let i in data) {
              if (data[i].id == payload) {
                let index = data.indexOf(data[i])
                state.staff.splice(index, 1)
              }
            }
          }
        })
    }

  },
  isActiveStaff({dispatch, commit, state}, payload) {
    const staff = getters.findOneStaff(payload.id)
    if (staff.length > 0) {
      axios.patch("/staff/" + payload.id, payload.data)
        .then(response => {
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

