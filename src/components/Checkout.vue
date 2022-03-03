<script setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { cartTotal } from '../_helper/cartTotal';
import { getCart } from '../_services/cartService';
import PriceBreakup from './PriceBreakup.vue';

import { useRouter } from 'vue-router';
const router = useRouter();

const cart = ref([]);
let priceSummary = reactive({
  total: 0,
  deliveryCharge: 50,
  discount: 0,
  items: cart.value.length
});

watch(() => cart.value.map(item => item.quantity), (newVal, oldVal) => { // watch it
  cart.value = cart.value;
  const total = cartTotal(cart.value);

  priceSummary.total = total;
  priceSummary.discount = total;
  priceSummary.deliveryCharge = total > 1000 ? 0 : 50;
  priceSummary.items = cart.value.length;
  console.log("new priceSummary", priceSummary);
});

const loadCart = () => {
  return getCart().then(res => {
    cart.value = res.data?.data;
  }, err => console.error(err));
}

onMounted(loadCart);
</script>

<style scoped>
  .card {
    height: fit-content;
  }
</style>

<template>
  <div class="row">
    <div id="cart-stepper" class="col-2">

      <router-link 
        class="list-group-item list-group-item-action" 
        :class="router.currentRoute.value.path.includes('summary') ? 'active' : ''" 
        to="summary">
          Order Summary
      </router-link>
      <router-link 
        class="list-group-item list-group-item-action" 
        :class="router.currentRoute.value.path.includes('address') ? 'active' : ''" 
        to="address">
          Address
      </router-link>
      <router-link 
        class="list-group-item list-group-item-action" 
        :class="router.currentRoute.value.path.includes('payment') ? 'active' : ''" 
        to="payment">
          Payment
      </router-link>
    </div>
    <div class="card col-7 py-3">
      <router-view></router-view>
    </div>

    <PriceBreakup />

  </div>
</template>