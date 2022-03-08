<script setup>
  import { storeToRefs } from 'pinia';
  import { onMounted } from 'vue';
  import { useCartStore } from '../stores/cart';
  import { useUserStore } from '../stores/user';
  import IconCart from './icons/IconCart.vue';

  const {authtoken} = storeToRefs(useUserStore());
  const cartStore = useCartStore();

  const fillCart = async () => {
    if(!authtoken.value) return;

    try {
      const data = await cartStore.fill();
      console.log(data);
    }catch(err) {
      console.error(err);
    }
  }

  onMounted(fillCart);
</script>

<template>
  <div class="">
    <router-link to="/cart" class="me-2 link-dark">
      <span class="badge rounded-pill bg-danger">{{cartStore.count}}</span>
      <IconCart />
    </router-link>
  </div>
    
  
</template>

<style scoped>
  .badge {
    position: absolute;
    right: 1px;
    z-index: 1;
  }
</style>
