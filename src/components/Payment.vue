<script setup>

import { useRouter } from 'vue-router';
import { useAddressStore } from '../stores/address';
import { useCartStore } from '../stores/cart';

  const router = useRouter();

  const { cartItems, purchaseItems, getCakeIds, total } = useCartStore();
  const { address } = useAddressStore();

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      await purchaseItems({...address, cakes: cartItems, price: total });
      router.push("/order-response")
    }catch (err) {
      console.error("error placing order ", err)
    }

  }

</script>

<style>
</style>

<template>
  <h5 class="my-3">
    Payment
  </h5>
  <form @submit="placeOrder">
    <div class="form-check">
      <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
      <label class="form-check-label" for="flexRadioDefault2">
        Cash on delivery
      </label>
    </div>
    <button class="float-end mt-5 btn btn-warning">Confirm Order</button>
  </form>
</template>