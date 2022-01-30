import axios from "axios";

const state = {
  categories: [],
  find: {}
}

const getters = {
  allCategories(state) {
    return state.categories;
  },
  findOneCategory(id) {
    return state.categories.filter(element => {
      return element.id == id
    })
  },
  getCategoryModal(state) {
    return state.find
  }
}

const mutations = {
  updateCategoryList(state, payload) {
    state.categories.push(payload);
  },
  updateCategoryModal(state, payload) {
    state.find = payload
  }
}

const actions = {
  initCategoryApp({commit}) {
    return axios.get('/categories')
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          for (let key in data) {
            commit("updateCategoryList", data[key]);
          }
        }
      })
  },
  saveCategory({dispatch, commit, state}, payload) {
    return axios.post("/categories", payload)
      .then(response => {
        if (response.status === 201) {
          payload.id = response.data.id;
          commit("updateCategoryList", payload);
          return true
        } else {
          return false
        }
      })
  },
  findCategory({dispatch, commit, state}, payload) {
    const category = getters.findOneCategory(payload)
    if (category.length > 0) {
      commit('updateCategoryModal', category)
    }
  },
  updateCategory({dispatch, commit, state}, payload) {
    const category = getters.findOneCategory(payload.id)

    if (category.length > 0) {
      return axios.patch("/categories/" + payload.id, payload.data)
        .then(response => {
          if (response.status === 200) {
            category[0].name = payload.data.name
            return true
          } else {
            return false
          }
        })
    }

  },
  isActiveCategory({dispatch, commit, state}, payload) {
    const category = getters.findOneCategory(payload.id)
    if (category.length > 0) {
      axios.patch("/categories/isActive/" + payload.id, payload.data)
        .then(response => {
        })
    }

  },
  deleteCategory({dispatch, commit, state}, payload) {
    const category = getters.findOneCategory(payload)

    if (category.length > 0) {
      return axios.delete("/categories/" + payload, payload)
        .then(response => {
          if (response.status === 200) {
            let data = state.categories
            for (let i in data) {
              if (data[i].id == payload) {
                let index = data.indexOf(data[i])
                state.categories.splice(index, 1)
              }
            }
            return true
          } else {
            return false
          }
        })
    }

  },
  sortableCategory({dispatch, commit, state}, payload) {
    axios.post("/categories/rank", payload)
      .then(response => {
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

