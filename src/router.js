import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Dashboard from "./components/Dashboard.vue";
import Users from "./components/Users.vue";
import CakeCard from "./components/CakeCard.vue";
import AddCake from "./components/AddCake.vue";
import CakeDetail from "./components/CakeDetail.vue";
import Search from "./components/Search.vue";
import PageNotFound from "./components/PageNotFound.vue";
import Cart from "./components/Cart.vue";


const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/dashboard", name: "Users", component: Users },
  { path: "/cakes", name: "Cakes", component: CakeCard },
  { path: "/add-cake", name: "Add Cake", component: AddCake },
  { path: "/cake/detail/:id", name: "Cake Detail", component: CakeDetail },
  { path: "/search", name: "Search", component: Search },
  { path: "/cart", name: "Cart", component: Cart },


  // otherwise redirect to 404
  { path: '/:pathMatch(.*)*', component: PageNotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;