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
          const role = JSON.parse(store.getters.getUser.role).ciro
          if (role.read) {
            next();
          } else {
            next('/dashboard');
          }

        }
      },
      {
        path: '/expenses', component: Expenses,
      },
      {
        path: '/category', component: Categories,
      },
      {
        path: '/products', component: Products,
      },
      {
        path: '/staff', component: Staff,
      },
      {
        path: '/users', component: Users,
      },
      {
        path: '/settings', component: Settings,
      },
      {
        path: '/accountSettings', component: accountSettings,
      },
      {
        path: '/reports', component: Reports,
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
