<script setup>
import { addCakeToCart } from "../_services/cakeService";

defineProps(['cake']);


// const showTypeBadge = {
//   BEST_SELLER: {className: "badge bg-success", type: "Best Seller"},
//   NEW_ARRIVAL: {className: "badge bg-warning", type: "New Arrival"},
//   PREMIUM: {className: "badge bg-danger", type: "Premium"}
// }

const addToCart = (cake) => {
  return addCakeToCart(cake).then(res => console.log(res), err => console.error(err));
}
</script>

<style scoped>
  .card {
    transition: transform .3s cubic-bezier(0.33, 0.04, 0.63, 0.93) 0.25s;
  }
  .card:hover {
   transform: scale(1.15, 1.15);
  }
  .quick-add {
    display: none;
  }
  .card:hover .quick-add {
    display: inline;
    position: absolute;
    transform: translate(-50%, 60px);
    left: 50%;
    animation: fadeInFromNone 0.8s ease-out;
  }
  .card-body {
    cursor: pointer;
  }
  .base h5, .base p {
    text-decoration: none !important;
  }
</style>

<template>
  <div class="p-3">
    <div class="card col">
      <img :src="cake.image" class="card-img-top" alt="..." height="150">
      <div class="card-body">
        <!-- <span :class="showTypeBadge[cake.type].className">{{showTypeBadge[cake.type].type}}</span> -->
        <router-link :to="`/cake/detail/${cake.cakeid}`" class="link-dark" style="text-decoration: none;">
          <h5 class="card-title">{{cake.name}}</h5>
          <p class="card-text">{{cake.description}}</p>
          <br />
        </router-link>

        <!-- <input type="button"  class="btn btn-primary" value="details" /> -->
        <router-link :to="`/cake/detail/${cake.cakeid}`" class="btn btn-primary">See details</router-link>
      </div>
      <button class="quick-add btn btn-primary" @click="() => addToCart(cake)">Quick Add + </button>
    </div>
  </div>
</template>