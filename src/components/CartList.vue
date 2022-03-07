<script setup>
  const {
    cart, 
    removeQuantity, 
    addQuantity, 
    removeItem 
  } = defineProps(['cart', 'removeQuantity', 'addQuantity', 'removeItem'])

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
  <div class="card" v-for="(cake, index) in cart" :key="cake.cakeid">
    <div class="row">
      <div class="col-2">
        <img width="110" height="110" :src="cake?.image" />
        <div class="qty-box row text-center mt-2">
          <button type="button" @click="() => removeQuantity(cake, index)" class="col-3 btn btn-light">-</button>
          <button type="button" class="col-3 qty-btn btn btn-light">{{cake.quantity}}</button>
          <button type="button" @click="() => addQuantity(cake, index)" class="col-3 btn btn-light">+</button>
        </div>
      </div>
      <div class="col-9">
        <h5>{{cake?.name}} <span class="text-muted">({{cake?.weight}} kg)</span></h5>
        <div>Estimated delivery: <span class="text-success">Today</span></div>
        <br />
        <br />
        <br />
        <div>Type: {{cake?.eggless ? "Eggless" : "Veg" }}</div>

        <h5 class="price">Rs. {{cake?.price * cake?.quantity}}</h5>
        <button @click="() => removeItem(cake.cakeid, index)" class="btn btn-danger">Remove </button>
      </div>
    </div>
  </div>
</template>