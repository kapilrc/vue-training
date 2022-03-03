<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cart";
import { cartTotal } from "../_helper/cartTotal";

  const {showBtn} = defineProps(["showBtn"]);
  const cartStore = useCartStore();

  const delivery = cartStore.total >= 1000  ? 0 : 50;

</script>

<style scoped>
.checkout {
    height: fit-content;
  }
  .total {
    border-top: 1px dashed #dcdcdc;
    border-bottom: 1px dashed #dcdcdc;
  }
</style>

<template>
<div class="checkout col-12 col-sm-3">
  <div class="card p-3">
    <h6 class="px-1 mb-3">PRICE DETAILS </h6>
    <div class="row p-2">
      <div class="col-9">
        Price ({{cartStore.count}} items):
      </div>
      <div class="col-3 text-end">
        {{cartStore.total}}
      </div>
    </div>
    <div class="row p-2">
      <div class="col-9">
        Delivery Charges:
      </div>
      <div class="col-3 text-end">
        {{cartStore.delivery}}
      </div>
    </div>
    <div class="row total p-2 mb-3">
      <div class="col-9">
        Cart total:
      </div>
      <div class="col-3 text-end">
        {{cartStore.total + cartStore.delivery}}
      </div>
    </div>
    <router-link v-if="showBtn" to="/checkout/summary" type="button" class="btn btn-warning btn-lg">Checkout </router-link>
  </div></div>
</template>