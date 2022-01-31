import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from '../views/dashboard'
import Categories from '../views/categories'
import Ciro from '../views/ciro'
import Products from '../views/products'
import Staff from '../views/staff'
import Expenses from "../views/expenses";
import Settings from "../views/settings";
import Users from "../views/users";
import auth from "../views/auth";

import {store} from "../store/store"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    beforeEnter(to, from, next) {
      next('/dashboard')
    }
  },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.allDashboard.length > 0) {
          next()
        } else {
          store.dispatch('initDashboardApp')
            .then(response => {
              next()
            })
        }
      } else {
        next('/auth')
      }
    }
  },
  {
    path: "/category",
    component: Categories,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.allCategories.length > 0) {
          next()
        } else {
          store.dispatch('initCategoryApp')
            .then(response => {
              next()
            })
        }
      } else {
        next('/auth')
      }
    }
  },
  {
    path: "/ciro",
    component: Ciro,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.allCiro.length > 0) {
          next()
        } else {
          store.dispatch('initCiroApp').then(response => {
            next()
          })
        }
      } else {
        next('/auth')
      }
    }
  },
  {
    path: "/products",
    component: Products,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next()
      } else {
        next('/auth')
      }
    }
  },
  {
    path: "/staff",
    component: Staff,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.allStaff.length > 0) {
          next()
        } else {
          store.dispatch('initStaffApp')
            .then(response => {
              next()
            })
        }
      } else {
        next('/auth')
      }
    }
  },
  {
    path: "/expenses",
    component: Expenses,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.allExpenses.length > 0) {
          next()
        } else {
          store.dispatch('initExpensesApp')
            .then(response => {
              next()
            })
        }
      } else {
        next('/auth')
      }
    }
  },
  {
    path: "/settings",
    component: Settings,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.allSettings.length > 0) {
          next()
        } else {
          store.dispatch('initSettingsApp').then(response => {
            next()
          })
        }
      } else {
        next('/auth')
      }
    }
  },
  {
    path: "/users",
    component: Users,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        if (store.getters.allUsers.length > 0) {
          next()
        } else {
          store.dispatch('initUsersApp').then(response => {
            next()
          })
        }
      } else {
        next('/auth')
      }
    }
  },
  {
    path: "/auth",
    component: auth,
    beforeEnter(to, from, next) {
      if (store.getters.isAuthenticated) {
        next('/dashboard')
      } else {
        next()
      }
    }
  },
  {
    path: "*", redirect: "/",
  }
];

export const router = new VueRouter({
  mode: "history",
  routes
});
