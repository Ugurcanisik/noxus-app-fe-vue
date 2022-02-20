import axios from "axios";

const state = {
  expenses: [],
  find: {},
  details: {}
}

const getters = {
  allExpenses(state) {
    return state.expenses;
  },
  findOneExpense(id) {
    return state.expenses.filter(element => {
      return element.id == id
    })
  },
  getExpenseModal(state) {
    return state.find
  },
  getDetailsExpenseModal(state) {
    return state.details
  }
}

const mutations = {
  updateExpensesList(state, payload) {
    state.expenses.push(payload);
  },
  updateExpenseModal(state, payload) {
    state.find = payload
  },
  updateDetailsExpenseModal(state, payload) {
    state.details = payload[0]
  }
}

const actions = {
  initExpensesApp({commit}) {
    return axios.get('/expenses')
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          state.expenses = []
          for (let key in data) {
            data[key].total = parseFloat(data[key].total) + ' ₺'
            commit("updateExpensesList", data[key]);
          }
        }
      })
  },
  saveExpense({dispatch, commit, state}, payload) {
    return axios.post("/expenses", payload)
      .then(response => {
        if (response.status === 201) {
          payload.id = response.data.id;
          payload.total = parseFloat(payload.total) + ' ₺'
          payload.typeexpense = {id: response.data.typeexpense.id, name: response.data.typeexpense.name}
          if (payload.staff != null) {
            payload.staff = {id: response.data.staff.id, name: response.data.staff.name}
          }
          commit("updateExpensesList", payload);
          dispatch('initDashboardApp')
          return true
        } else {
          return false
        }
      })
  },
  findExpense({dispatch, commit, state}, payload) {
    const expense = getters.findOneExpense(payload)
    if (expense.length > 0) {
      commit('updateExpenseModal', expense)
    }
  },
  findDetailsExpense({dispatch, commit, state}, payload) {
    state.details = {}
    const expense = getters.findOneExpense(payload)
    if (expense.length > 0) {
      commit('updateDetailsExpenseModal', expense)
    }
  },
  updateExpense({dispatch, commit, state}, payload) {
    const expense = getters.findOneExpense(payload.id)

    if (expense.length > 0) {
      return axios.patch("/expenses/" + payload.id, payload.data)
        .then(response => {
          if (response.status === 200) {
            expense[0].typeexpense = {id: response.data.typeexpense.id, name: response.data.typeexpense.name}
            expense[0].description = payload.data.description
            expense[0].total = parseFloat(payload.data.total) + ' ₺'
            if (payload.data.staff !== null) {
              expense[0].staff = {id: response.data.staff.id, name: response.data.staff.name}
            } else {
              expense[0].staff = null
            }
            expense[0].date = payload.data.date
            dispatch('initDashboardApp')
            return true
          } else {
            return false
          }
        })
    }

  },
  deleteExpense({dispatch, commit, state}, payload) {

    const expense = getters.findOneExpense(payload)

    if (expense.length > 0) {
      return axios.delete("/expenses/" + payload, payload)
        .then(response => {
          if (response.status === 200) {
            let data = state.expenses
            for (let i in data) {
              if (data[i].id == payload) {
                let index = data.indexOf(data[i])
                state.expenses.splice(index, 1)
              }
            }
            dispatch('initDashboardApp')
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

