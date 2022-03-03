import { acceptHMRUpdate, defineStore } from "pinia";
import { useCartStore } from './cart';
import Api from "../_services/Api";

export const useUserStore = defineStore('AuthUserStore', {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || {},
    authtoken: null,
    storedUser: null
    // ...
  }),

  getters: {
    authtoken: (state) => localStorage.getItem("authtoken"),
    storedUser: (state) => localStorage.getItem("user")
  },

  actions: {
    async registerUser(user) {
      return await Api.post("/register", user)
    },


    setToken(token) {
      localStorage.setItem("authtoken", token);
    },

    setUser(user) {
      localStorage.setItem("user", JSON.stringify(user));
    },

    async loginUser(user) {
      try {
        const { data } = await Api.post("/login", user);
        if(data?.token) {
          const { name, email } = data;
          this.user = data;
          this.setToken(data.token);
          this.setUser({ name, email })
          return this.user
        }
        throw new Error (data?.message);
      } catch (error) {
        throw new Error (error);
      }
    },

    async logoutUser () {
      return Promise.resolve({data: { message: "success" } });
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
