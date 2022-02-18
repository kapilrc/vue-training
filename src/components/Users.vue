<script setup>
  import { ref } from 'vue';
  import Divider from './Divider.vue';

  const users = ref([{name: 'asdsad', email: 'sdas@asd', id: 1}, {name: 'kapil', email: 'asdas@ads.c', id: 2}, {name: 'kaasdsa', email: 'sadsa@asd.ds', id: 3}]);
  const user = ref({});

  const addUser = (e) => {
    e.preventDefault();
    users.value.push({...user.value, id: users.value.length+1});
    user.value = {}
    console.log(users.value)
  }
  const editUser = (currentUser) => {
    user.value = {...currentUser}
  }

  const deleteUser = (id) => {
    const index = users.value.indexOf(users.value.find(user => user.id === id))
    users.value.splice(index, 1)
  }
</script>

<template>
  <form @submit="addUser" class="row">

    <!-- Name input -->
    <h4>Add / Edit users</h4>
    <br />
    <div class="col-12 col-sm-12 col-md-4">
      <div class="form-outline mb-3">
        <input v-model="user.name" type="text" id="form3Example4" class="form-control form-control-lg"
          placeholder="Enter Name" />
      </div>

      <!-- Email input -->
      <div class="form-outline mb-4">
        <input v-model="user.email" type="email" id="form3Example3" class="form-control form-control-lg"
          placeholder="Enter a valid email address" />
      </div>

      <div class="text-lg-start mt-4 pt-2">
        <button :disabled="!user.name || !user.email" type="submit" class="btn btn-primary btn-lg"
          style="padding-left: 2.5rem; padding-right: 2.5rem;">Add</button>
      </div>
    </div>
  </form>
  <Divider />
  <table class="table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="user.name">
        <th scope="row">{{index+1}}</th>
        <td>{{user.name}}</td>
        <td>{{user.email}}</td>
        <td>
          <button class="btn btn-primary m-3" type="button" @click="() => editUser(user)" >Edit</button>
          <button class="btn btn-danger" type="button" @click="() => deleteUser(user.id)" >Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>