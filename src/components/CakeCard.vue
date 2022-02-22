<script setup>
defineProps(['cake']);



// const showTypeBadge = {
//   BEST_SELLER: {className: "badge bg-success", type: "Best Seller"},
//   NEW_ARRIVAL: {className: "badge bg-warning", type: "New Arrival"},
//   PREMIUM: {className: "badge bg-danger", type: "Premium"}
// }
</script>

<style>
</style>

<template>
  <div class="card" style="width: 18rem;">
    <img :src="cake.image" class="card-img-top" alt="...">
    <div class="card-body">
      <!-- <span :class="showTypeBadge[cake.type].className">{{showTypeBadge[cake.type].type}}</span> -->
      <h5 class="card-title">{{cake.name}}</h5>
      <p class="card-text">{{cake.description}}</p>
      <a :href="cake.url" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>