<script setup>

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { login } from '../_services/authService';

  const router = useRouter();

  const user = ref({
    email: "",
    password: ""
  });

  const loginUser = (e) => {
    e.preventDefault();
    return login(user.value).then(res => {
      user.value = {};
      res.data?.token && router.push("/")
    }, err => {
      console.error("login error", err);
    });
  }
</script>

<style>
</style>

<template>
  <section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
          alt="Sample image">
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form @submit="loginUser" >

          <!-- Email input -->
          <div class="form-outline mb-4">
            <input v-model="user.email" type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" />
            <label class="form-label" for="form3Example3">Email address</label>
          </div>

          <!-- Password input -->
          <div class="form-outline mb-3">
            <input v-model="user.password" type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" />
            <label class="form-label" for="form3Example4">Password</label>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <!-- Checkbox -->
            <!-- <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div> -->
            <router-link to="/forgot-password" class="text-body">Forgot password?</router-link>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-primary btn-lg"
              style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <router-link to="/register"
                class="link-danger">Register</router-link></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>

</template>