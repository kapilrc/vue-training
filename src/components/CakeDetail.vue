<script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
import { useCartStore } from '../stores/cart';
  import { addCakeToCart, getCakeDetails } from '../_services/cakeService';

  const route = useRoute();
  const router = useRouter();
  const cakeid = route.params.id;

  const cartStore = useCartStore();

  let cake = ref();

  const fetchCakeDetails = () =>  {
    return getCakeDetails(cakeid).then(
      res => cake.value = res.data?.data,
      err => {
        console.error(err);
      }
    );
  }


  const addToCart = (cake, backToHome) => {
    const {cakeid, name, price, image, weight} = cake;
    
    return addCakeToCart({cakeid, name, price, image, weight}).then(res => {
      // navigate to card page
      const item = res.data?.data;
      if(item) {
        cartStore.addCartItem(item);
        const path = backToHome ? "/" : "/cart";
        router.push(path);
        return;
      }
      console.error(res.data?.message);
    }, err => console.error(err));
  }

  onMounted(fetchCakeDetails);
</script>

<style scoped>
  .container {
    height: 400px;
    overflow: hidden;
    /* background: black;
    color: white; */
  }
  .col-4 {
    /* background: black;
    color: white; */
  }
  .image-gradient {
    /* background: linear-gradient(to left, #030b17, rgba(0,0,0,0)); */
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 4;
    height: 400px;
  }
  img {
    position: absolute;
    width: 100%;
    height: 400px;
  }
  .col-md-5 {
    position: relative;
    padding: 0
  }
  .bg-image {
    position: absolute;
    width: 100%;
    height: 400px;
    background: url(cake?.image});
  }
</style>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-5">
        <div class="image-gradient">
      </div>
        <img :src="cake?.image" alt="loading..." />
      </div>

      <div class="col-12 col-md-7 ps-5">
          <h4>{{cake?.name}} <span class="text-muted">({{cake?.weight}} kg)</span></h4>
          <div>{{cake?.ratings}} <span class="text-muted">({{cake?.reviews}} Reviews)</span></div>
          <br />

          <h3>Rs. {{cake?.price}}</h3>
          <br />
          <h5>Ingredients</h5>
          <ul>
            <li v-for="item in cake?.ingredients" :key="item">{{item}}</li>
          </ul>

          <br />
          <div class="row">
            <div class="col-6">
              <button 
                type="button"
                class="btn btn-warning"
                style="width: 100%"
                @click="() => addToCart(cake, true)"
              >Add to cart</button>
            </div>
            <div class="col-6">
              <button 
                type="button" 
                class="btn btn-success"
                style="width: 100%"
                @click="() => addToCart(cake)"
                 >Buy Now</button>
            </div>
          </div>
      </div>
    </div>
  </div>
  <h1>
  </h1>
</template>