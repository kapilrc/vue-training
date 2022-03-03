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
import Checkout from "./components/Checkout.vue";
import Summary from "./components/Summary.vue";
import Address from "./components/Address.vue";
import Payment from "./components/Payment.vue";
import OrderResponse from "./components/OrderResponse.vue";


const routes = [
  { path: "/", component: Dashboard },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/dashboard", component: Users },
  { path: "/cakes", component: CakeCard },
  { path: "/add-cake", component: AddCake },
  { path: "/cake/detail/:id", component: CakeDetail },
  { path: "/search", component: Search },
  { path: "/cart", component: Cart },
  { 
    path: "/checkout", 
    name: "Checkout", 
    component: Checkout, 
    children: [
      { path:"", redirect: "/checkout/summary"},
      { path:"summary", component: Summary},
      { path:"address", component: Address},
      { path:"payment", component: Payment}
    ] 
  },
  { path: "/order-response", component: OrderResponse },
  
  


  // otherwise redirect to 404
  { path: '/:pathMatch(.*)*', component: PageNotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;