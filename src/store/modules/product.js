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

    let formData = new FormData()
    formData.append('picture', payload.picture)
    formData.append('name', payload.name)
    formData.append('description', payload.description)
    formData.append('price', payload.price)
    formData.append('category', payload.category)

    return axios.post('/products', formData, {
      async: false,
      cache: false,
      contentType: false,
      processData: false,
    })
      .then(response => {
        if (response.status === 201) {
          payload.id = response.data.id;
          payload.isActive = true
          commit("updateProductsList", payload);
          return true
        } else {
          return false
        }
      })


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

      let formData = new FormData()
      formData.append('picture', payload.data.picture)
      formData.append('name', payload.data.name)
      formData.append('description', payload.data.description)
      formData.append('price', payload.data.price)
      formData.append('category', payload.data.category)

      return axios.patch("/products/" + payload.id, formData, {
        async: false,
        cache: false,
        contentType: false,
        processData: false,
      })
        .then(response => {
          if (response.status === 200) {
            product[0].name = payload.data.name
            product[0].description = payload.data.description
            product[0].price = payload.data.price
            product[0].categoryId = payload.data.category
            return true
          } else {
            return false
          }
        })


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
            return true
          } else {
            return false
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

