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
import accountSettings from "../views/accountSettings";

import {store} from "../store/store"


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: '/dashboard'
  },
  {
    path: "/dashboard",
    component: Dashboard,
  },
  {
    path: "/category",
    component: Categories,
    beforeEnter(to, from, next) {
      if (store.getters.allCategories.length > 0) {
        next()
      } else {
        store.dispatch('initCategoryApp')
          .then(response => {
            next()
          })
      }
    }
  },
  {
    path: "/ciro",
    component: Ciro,
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/staff",
    component: Staff,
  },
  {
    path: "/expenses",
    component: Expenses,
  },
  {
    path: "/settings",
    component: Settings,
  },
  {
    path: "/users",
    component: Users,
    beforeEnter(to, from, next) {
      if (store.getters.allUsers.length > 0) {
        next()
      } else {
        store.dispatch('initUsersApp').then(response => {
          next()
        })
      }
    }
  },
  {
    path: "/accountSettings",
    component: accountSettings,
    beforeEnter(to, from, next) {
      if (store.getters.getUser.length > 0) {
        next()
      } else {
        store.dispatch('initAuth').then(response => {
          next()
        })
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

router.beforeEach((to, from, next) => {
  store.dispatch('initAuth').then((response) => {
    next()
  })
})
