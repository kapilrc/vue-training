<script setup>
  import { onMounted, ref } from "vue";

  import Carousal from "./Carousal.vue";
  import CakeCard from "./CakeCard.vue";
import { getToken } from "../_services/authService";
import { useUserStore } from "../stores/user";

  const router = useRouter();

  const {user, authtoken} = useUserStore();

  if(!authtoken){
    router.push("/login")
  }

  import { getCakes } from "./../_services/cakeService";
  import { useRouter } from "vue-router";

  const cakes = ref([]);

  const fetchCakes = () =>  {
    return getCakes().then(
      res => cakes.value = res.data?.data?.splice(0, 10),
      err => {
        console.error(err);
      }
    );
  }

  onMounted(fetchCakes);
</script>

<template>
  <Carousal />
  <br />
    <h4>Cake listing </h4> 

    <div class="row row-cols-4">
      <CakeCard v-for="cake in cakes" :key="cake.name" :cake="cake" />
    </div>
</template>