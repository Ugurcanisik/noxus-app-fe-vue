import axios from "axios";

const state = {
  products: [],
  find: {}
}

const getters = {
  allProducts(state) {
    return state.products;
  },
  findOneProduct(id) {
    return state.products.filter(element => {
      return element.id == id
    })
  },
  getProductModal(state) {
    return state.find
  }
}

const mutations = {
  updateProductsList(state, payload) {
    state.products.push(payload);
  },
  updateProductModal(state, payload) {
    state.find = payload
  }
}

const actions = {
  initProductsApp({dispatch, commit, state}, payload) {
    axios.get('/products/' + payload)
      .then(response => {
        if (response.status === 200) {
          state.products = []
          let data = response.data;
          for (let key in data) {
            commit("updateProductsList", data[key]);
          }
        }
      })
  },
  saveProduct({dispatch, commit, state}, payload) {

    if (payload.picture === null) {
      return axios.post("/products", payload)
        .then(response => {
          if (response.status === 201) {
            payload.id = response.data.id;
            commit("updateProductsList", payload);
            dispatch('alert', 'success')
            return true
          } else {
            dispatch('alert', 'error')
          }
        })
    } else {
      //resim varsa
    }

  },
  findProduct({dispatch, commit, state}, payload) {
    const product = getters.findOneProduct(payload)
    if (product.length > 0) {
      commit('updateProductModal', product)
    }
  },
  updateProduct({dispatch, commit, state}, payload) {
    const product = getters.findOneProduct(payload.id)

    if (product.length > 0) {
      if (payload.data.picture == null) {
        return axios.patch("/products/" + payload.id, payload.data)
          .then(response => {
            if (response.status === 200) {
              product[0].picture = payload.data.picture
              product[0].name = payload.data.name
              product[0].description = payload.data.description
              product[0].price = payload.data.price
              product[0].categoryId = payload.data.categoryId
              dispatch('alert', 'success')
              return true
            }
          })
      } else {
        //resim varsa
      }

    }

  },
  isActiveProduct({dispatch, commit, state}, payload) {
    const product = getters.findOneProduct(payload.id)
    if (product.length > 0) {
      axios.patch("/products/isActive/" + payload.id, payload.data)
        .then(response => {
        })
    }

  },
  deleteProduct({dispatch, commit, state}, payload) {
    const product = getters.findOneProduct(payload)

    if (product.length > 0) {
      return axios.delete("/products/" + payload, payload)
        .then(response => {
          if (response.status === 200) {
            let data = state.products
            for (let i in data) {
              if (data[i].id == payload) {
                let index = data.indexOf(data[i])
                state.products.splice(index, 1)
              }
            }
          }
        })
    }

  },
  sortableProducts({dispatch, commit, state}, payload) {
    return axios.post("/products/rank", payload)
      .then(response => {
      })
  },
  chanceCategory({dispatch, commit, state}, payload) {
    dispatch('initProductsApp', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

