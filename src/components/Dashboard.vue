<script setup>
  import { onMounted, ref } from "vue";

  import Carousal from "./Carousal.vue";
  import CakeCard from "./CakeCard.vue";


  // import mock data
  // import cakes from "./_db/cakes.json"
  import { getCakes } from "./../_services/cakeService";

  const cakes = ref([]);

  const fetchCakes = () =>  {
    return getCakes().then(
      res => cakes.value = res.data?.data?.splice(0, 10),
      err => {
        console.error(err);
      }
    );
  }

  onMounted(() => {
    fetchCakes();
  });
</script>

<template>
  <Carousal />
    <h4>Cake listing </h4> 

    <div class="row">
      <CakeCard v-for="cake in cakes" :key="cake.name" :cake="cake" />
    </div>
</template>