import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Dashboard from "./components/Dashboard.vue";
import Users from "./components/Users.vue";
import CakeCard from "./components/CakeCard.vue";


const routes = [
  { path: "/", name: "Dashboard", component: Dashboard },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
  { path: "/dashboard", name: "Users", component: Users },
  { path: "/cakes", name: "Cakes", component: CakeCard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;