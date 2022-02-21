<script setup>
import { ref, computed } from 'vue';

import { register } from "./../_services/authService";

// auth api
let user = ref({
  name: "",
  email: "",
  password: ""
});

const isExist = ref(false);

const resetForm = () => {
  user.value = {};
}

const registerUser = (e) => {
  e.preventDefault();
  return register(user.value).then(res => {
    if(res.data?.message) {
      isExist.value = true;
      return;
    }
    resetForm();
    isExist.value = false;

  }, err => {
    console.error(err)
    isExist.value = false;
  });
}


</script>

<template>
  <form @submit="registerUser" class="row">
    <h4>Register yourself</h4>
    <br />

    <div v-if="isExist" >
      <div class="is-invalid">
      </div>
        <div class="invalid-feedback">
        user is already registered, Please try with different details!
      </div>
    </div>
    
    <div class="col-12 col-sm-12 col-md-4">
      <!-- Name input -->
      <div class="form-outline mb-3">
        <input
          v-model="user.name"
          type="text"
          id="form3Example4"
          class="form-control form-control-lg"
          placeholder="Enter Name"
        />
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input
          v-model="user.email"
          type="email"
          id="form3Example3"
          class="form-control form-control-lg"
          placeholder="Enter a valid email address"
        />
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input
          v-model="user.password"
          type="password"
          id="form3Example2"
          class="form-control form-control-lg"
          placeholder="Password"
        />
      </div>


      <div class="row pt-2">
        <div class="row">
      <div class="col-md-4">
        <button
            :disabled="!user.name || !user.email || !user.password"
            type="submit"
            class="btn btn-outline-primary btn-lg my-2"
            style="padding-left: 2.5rem; padding-right: 2.5rem"
          >
            Register
          </button>
        </div>
      <div class="col-md-4 offset-md-4 my-2">
        <input
            :disabled="!user.name || !user.email"
            type="button"
            class="btn btn-primary btn-lg"
            style="padding-left: 2.5rem; padding-right: 2.5rem"
            value="Reset"
            @click="resetForm"
          />
      </div>
    </div>
      </div>
    </div>


  </form>

</template>
