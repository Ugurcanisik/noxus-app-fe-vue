import axios from "axios";

const state = {
  expenses: [],
  find: {}
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
  }
}

const mutations = {
  updateExpensesList(state, payload) {
    state.expenses.push(payload);
  },
  updateExpenseModal(state, payload) {
    state.find = payload
  }
}

const actions = {
  initExpensesApp({commit}) {
    axios.get('/expenses')
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          for (let key in data) {
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
          payload.typeexpense = {id: response.data.typeexpense.id, name: response.data.typeexpense.name}
          if (payload.staff != null) {
            payload.staff = {id: response.data.staff.id, name: response.data.staff.name}
          }
          commit("updateExpensesList", payload);
          dispatch('alert', 'success')
          dispatch('initDashboardApp')
          return true
        } else {
          dispatch('alert', 'error')
        }
      })
  },
  findExpense({dispatch, commit, state}, payload) {
    const expense = getters.findOneExpense(payload)
    if (expense.length > 0) {
      commit('updateExpenseModal', expense)
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
            expense[0].total = payload.data.total
            if (payload.data.staff !== null) {
              expense[0].staff = {id: response.data.staff.id, name: response.data.staff.name}
            } else {
              expense[0].staff = null
            }
            expense[0].date = payload.data.date
            dispatch('alert', 'success')
            dispatch('initDashboardApp')
            return true
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

