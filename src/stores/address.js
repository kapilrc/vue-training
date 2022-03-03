import { acceptHMRUpdate, defineStore } from "pinia";

export const useAddressStore = defineStore('address', {
  state: () => ({
    address: JSON.parse(localStorage.getItem("address")) || {}
  }),
  getters: {
    getAddress: (state) => state.address
  },
  actions: {
    save(address) {
      this.address = {...address};
      localStorage.setItem("address", JSON.stringify(this.address));
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAddressStore, import.meta.hot))
}