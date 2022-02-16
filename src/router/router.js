import Vue from "vue";
import VueRouter from "vue-router";

import Dashboard from '../views/dashboard'
import ChildView from '../views/childView'
import Categories from '../views/categories'
import Ciro from '../views/ciro'
import Products from '../views/products'
import Staff from '../views/staff'
import Expenses from "../views/expenses";
import Settings from "../views/settings";
import Users from "../views/users";
import Auth from "../views/auth";
import accountSettings from "../views/accountSettings";
import Reports from "../views/reports";
import typeExpenses from "../views/typeexpenses";
import {store} from "../store/store";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: ChildView,
    children: [
      {
        path: '', redirect: '/dashboard',
      },
      {
        path: '/dashboard', component: Dashboard,
      },
      {
        path: '/ciro', component: Ciro,
        beforeEnter: (to, from, next) => {
          const role = store.getters.getUser.role.ciro
          if (role) {
            next();
          } else {
            next('/dashboard');
          }
        }
      },
      {
        path: '/expenses', component: Expenses,
        beforeEnter: (to, from, next) => {
          const role = store.getters.getUser.role.expenses
          if (role) {
            next();
          } else {
            next('/dashboard');
          }
        }
      },
      {
        path: '/typeexpenses', component: typeExpenses,
        beforeEnter: (to, from, next) => {
          const role = store.getters.getUser.role.typeexpenses
          if (role) {
            next();
          } else {
            next('/dashboard');
          }
        }
      },
      {
        path: '/categories', component: Categories,
        beforeEnter: (to, from, next) => {
          const role = store.getters.getUser.role.categories
          if (role) {
            next();
          } else {
            next('/dashboard');
          }
        }
      },
      {
        path: '/products', component: Products,
        beforeEnter: (to, from, next) => {
          const role = store.getters.getUser.role.products
          if (role) {
            next();
          } else {
            next('/dashboard');
          }
        }
      },
      {
        path: '/staff', component: Staff,
        beforeEnter: (to, from, next) => {
          const role = store.getters.getUser.role.staff
          if (role) {
            next();
          } else {
            next('/dashboard');
          }
        }
      },
      {
        path: '/users', component: Users,
        beforeEnter: (to, from, next) => {
          const role = store.getters.getUser.role.users
          if (role) {
            next();
          } else {
            next('/dashboard');
          }
        }
      },
      {
        path: '/settings', component: Settings,
        beforeEnter: (to, from, next) => {
          const role = store.getters.getUser.role.settings
          if (role) {
            next();
          } else {
            next('/dashboard');
          }
        }
      },
      {
        path: '/reports', component: Reports,
        beforeEnter: (to, from, next) => {
          const role = store.getters.getUser.role.reports
          if (role) {
            next();
          } else {
            next('/dashboard');
          }
        }
      },
      {
        path: '/accountSettings', component: accountSettings,
      },
    ]
  },
  {
    path: "/auth",
    component: Auth
  },
  {
    path: "*", redirect: "/",
  }
];


export const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach((to, from, next) => {
  if (store.getters.isAuthenticated) {
    if (to.fullPath == '/auth') {
      next('/')
    } else {
      next()
    }
  } else {
    if (to.fullPath != '/auth') {
      next('/auth')
    } else {
      next()
    }
  }
})
