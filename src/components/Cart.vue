<script setup>
  import { onMounted, ref } from '@vue/runtime-core';
  import { getCart, removeItemFromCart } from '../_services/cartService';


const cart = ref([]);
let total = ref(0);
const deliveryCharges = 50;

const calculateTotal = () => {
  const values = cart.value.map(item => item.price);
  total.value = values.reduce((prevVal, newVal) => prevVal + newVal, 0)
}

const removeItem = (cake) => {
  return removeItemFromCart(cake.cakeid).then(res => console.log("item removed", res), err => console.error(err))
}

const loadCart = () => {
  return getCart().then(res => {
    cart.value = res.data?.data;
    calculateTotal();
  }, err => console.error(err));
}

onMounted(loadCart);

</script>

<style scoped>
  .card {
    padding: 15px 10px;
    margin-bottom: 20px;
  }
  .card:last-child {
    margin: 0;
  }
  .price, .btn-danger {
    position: absolute;
    right: 15px;
    top: 0;
    font-weight: normal;
  }
  .btn-danger {
    bottom: 0;
    top: auto;
  }

  .checkout {
    height: fit-content;
  }
  .total {
    border-top: 1px dashed #dcdcdc;
    border-bottom: 1px dashed #dcdcdc;
  }
  h6 {
    border-bottom: 1px dashed #dcdcdc;
  }

</style>

<template>
  <div class="row">
    <div class="card col-12 col-sm-8">
      <h6 class="pb-2 mb-3">MY CART </h6>
      <div class="card" v-for="(cake) in cart" :key="cake.cakeid">
        <div class="row">
          <div class="col-2">
            <img width="100" height="100" :src="cake?.image" />
          </div>
          <div class="col-10">
            <h5>{{cake?.name}} <span class="text-muted">({{cake?.weight}} kg)</span></h5>
            <div>Estimated delivery: <span class="text-success">Today</span></div>
            <br />
            <div>Qty: {{cake?.eggless ? "Eggless" : "Veg" }}</div>
            <div>Type: {{cake?.eggless ? "Eggless" : "Veg" }}</div>

            <h5 class="price">Rs. {{cake?.price}}</h5>
            <button @click="() => removeItem(cake)" class="btn btn-danger">Remove </button>
          </div>
        </div>
        </div>
    </div>
    <div class="card checkout col-12 col-sm-3 ms-3">
      <h6 class="pb-2 mb-3">PRICE DETAILS </h6>
      <div class="row p-2">
        <div class="col-9">
          Price ({{cart?.length}} items):
        </div>
        <div class="col-3 text-end">
          {{total}}
        </div>
      </div>
      <div class="row p-2">
        <div class="col-9">
          Delivery Charges:
        </div>
        <div class="col-3 text-end">
          {{deliveryCharges}}
        </div>
      </div>
      <div class="row total p-2 mb-3">
        <div class="col-9">
          Cart total:
        </div>
        <div class="col-3 text-end">
          {{total + deliveryCharges}}
        </div>
      </div>
      <button type="button" class="btn btn-warning btn-lg">Place Order </button>
    </div>
  </div>
</template>