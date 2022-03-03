<script setup>
  import { ref } from 'vue';
import router from '../router';
  import { useAddressStore } from '../stores/address';


  const addressStore = useAddressStore();
  const addressDetails = ref(addressStore.address);

  const isEdit = ref(!addressDetails.value.address);

  const saveAddress = (e) => {
    e.preventDefault();
    isEdit.value = false;
    addressStore.save(addressDetails.value);
  }

  const editAddress = () => isEdit.value = !isEdit.value;
</script>

<style>
</style>

<template>
    <div v-if="!isEdit" class="row">
      <h5>{{addressDetails.name}} 
        <span class="float-end">
          <button type="button" @click="editAddress" class="btn btn-light">Edit</button>
        </span>
        </h5>
      <p>{{addressDetails.address}}, {{addressDetails.city}}</p>
      <p>{{addressDetails.pin}}, Phone - {{addressDetails.phone}}</p>

      <div class="col-auto">
      <router-link to="payment" @click="editAddress" class="btn btn-primary">Save and Deliver Here</router-link>
      </div>
      
    </div>
    <form v-if="isEdit" @submit="saveAddress" class="row ps-3">
      <div class="row g-3">
        <div class="col-auto">
          <input v-model="addressDetails.name" type="text" class="form-control" placeholder="Name">
        </div>
        <div class="col-auto">
          <input v-model="addressDetails.phone" type="number" class="form-control" placeholder="Phone">
        </div>
      </div>
      <div class="row g-3">
        <div class="col-auto">
          <input type="number" class="form-control" v-model="addressDetails.pin" placeholder="Pin">
        </div>
        <div class="col-auto">
          <input type="text" class="form-control" v-model="addressDetails.city" placeholder="City">
        </div>
      </div>
      <div class="row g-3">
        <div class="col-9">
          <textarea class="form-control" style="resize: none;" rows="5" v-model="addressDetails.address" placeholder="Address"></textarea>
        </div>
      </div>
      <div class="row g-3">
        <div class="col-auto">
          <button type="submit" class="btn btn-lg btn-primary mb-3">Confirm Address</button>
        </div>
      </div>
  </form>
</template>