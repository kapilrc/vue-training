<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { searchCakes } from '../_services/cakeService';
import CakeCard from './CakeCard.vue';

  const route = useRoute();
  const searchResults = ref([]);
  // const query = route.query.q;

  console.log(route.query.q)

  watch(() => route.query.q, value => {
    console.log(value);
    searchQuery(value);
  });

  const searchQuery = (value) =>  {
    return searchCakes(value).then(
      res => searchResults.value = res.data?.data,
      err => {
        console.error(err);
      }
    );
  }

  onMounted(() => searchQuery(route.query.q))
</script>

<style>
</style>

<template>
    <div class="row row-cols-4">
      <CakeCard v-for="cake in searchResults" :key="cake.name" :cake="cake" />
    </div>
  <!-- <div>{{JSON.stringify(searchResults)}}</div> -->
</template>