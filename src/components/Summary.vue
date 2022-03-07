<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
import { cartTotal } from '../_helper/cartTotal';
import { getCart } from '../_services/cartService';

const router = useRouter();
const cartStore = useCartStore();
const cart = ref(cartStore.cartItems);

if(!cart.value.length) {
  router.push("/cart");
}
</script>

<style>
</style>

<template>
  <h6 class="pb-2 mb-3">Order Summary </h6>
  <div class="card p-3" v-for="(cake) in cart" :key="cake.cakeid">
    <div class="row">
      <div class="col-2">
        <img width="110" height="110" :src="cake?.image" />
        <!-- <div class="qty-box row text-center mt-2">
          <button type="button" @click="removeQuantity(cake, index)" class="col-3 btn btn-light">-</button>
          <button type="button" class="col-3 qty-btn btn btn-light">{{cake.quantity}}</button>
          <button type="button" @click="addQuantity(cake, index)" class="col-3 btn btn-light">+</button>
        </div> -->
      </div>
      <div class="col-9 gx-5">
        <h5>{{cake?.name}} <span class="text-muted">({{cake?.weight}} kg)</span></h5>
        <div>Estimated delivery: <span class="text-success">Today</span></div>
        <div>Type: {{cake?.eggless ? "Eggless" : "Veg" }}</div>

        <h5 class="price">Rs. {{cake?.price * cake?.quantity}}</h5>
      </div>
    </div>
  </div>
  <div class="col-12 float-end">
    <router-link to="address" class=" mt-3 float-end btn btn-warning" >Continue</router-link>
  </div>
</template>