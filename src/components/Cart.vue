<script setup>
  import { onMounted, ref } from '@vue/runtime-core';
  import { reactive } from 'vue';

  import PriceBreakup from './PriceBreakup.vue';
  import CartList from './CartList.vue';
  import { useCartStore } from '../stores/cart';

  const { cartItems, fill,  addCartItem, removeAQuantity, removeCartItem } = useCartStore();

  let cart = ref(cartItems);

  const loadCart = async () => {
    if(cartItems.length) {
      cart.value = cartItems;
      return;
    }
    try {
      cart.value = await fill();
    }catch (err) {
      console.error(err)
    }
  }
  

  let priceSummary = reactive({
    total: 0,
    deliveryCharge: 50,
    discount: 0,
    items: cart.value.length  // cart.length
  });

  const addQuantity = async (cake, index) => {
    const {cakeid, name, price, image, weight, quantity} = cake;

    try {
      cart.value = await addCartItem({cakeid, name, price, image, weight, quantity});
    }catch(err) {
      err => console.error(err);
    }
  }

  const removeQuantity = async (cake, index) => {
    try {
      cart.value  = await removeAQuantity(cake)
    } catch(err) {
      err => console.error(err);
    }
  }

  const removeItem = async (cakeid) => {
    try {
      cart.value  = await removeCartItem(cakeid)
    } catch(err) {
      err => console.error(err);
    }
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
  h6 {
    border-bottom: 1px dashed #dcdcdc;
  }
  .qty-box {

  }
  .qty-box > * {
    text-align: center;
  }
  .qty-box .qty-btn {
    border-radius: 0;
  }
  .qty-box button {
    border-radius: 50%;
    border: 1px solid #dcdcdc;
    height: 35px;
    width: 35px;
    margin: 0 5px;
    line-height: 1;
  }

</style>

<template>
  <div class="row">
    <div class="card col-12 col-sm-8">
      <h6 class="pb-2 mb-3">MY CART </h6>
      <div class="card" v-for="(cake, index) in cart" :key="cake?.cakeid"> <!-- cart -->
        <div class="row">
          <div class="col-2">
            <router-link :to="`/cake/detail/${cake?.cakeid}`">
              <img width="110" height="110" :src="cake?.image" />
            </router-link>
            <div class="qty-box row text-center mt-2">
              <button type="button" @click="removeQuantity(cake, index)" class="col-3 btn btn-light">-</button>
              <button type="button" class="col-3 qty-btn btn btn-light">{{cake?.quantity}}</button>
              <button type="button" @click="addQuantity(cake, index)" class="col-3 btn btn-light">+</button>
            </div>
          </div>
          <div class="col-9 gx-3">
            <h5><router-link :to="`/cake/detail/${cake?.cakeid}`" class="link-dark">{{cake?.name}} </router-link><span class="text-muted">({{cake?.weight}} kg)</span></h5>
            <div>Estimated delivery: <span class="text-success">Today</span></div>
            <br />
            <br />
            <br />
            <div>Type: {{cake?.eggless ? "Eggless" : "Veg" }}</div>

            <h5 class="price">Rs. {{cake?.price * cake?.quantity}}</h5>
            <button @click="removeItem(cake.cakeid)" class="btn btn-danger">Remove </button>
          </div>
        </div>
      </div>
    </div>
    
    <PriceBreakup :showBtn="true" />
  </div>
</template>