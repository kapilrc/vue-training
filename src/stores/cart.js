import { acceptHMRUpdate, defineStore, storeToRefs } from "pinia";
import { cartTotal } from "../_helper/cartTotal";
import Api from "../_services/Api";

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    getCakeIds: (state ) => state.cartItems.map(item => item.cakeid),
    count: (state) =>  state.cartItems.length,
    total: (state) => cartTotal(state.cartItems),
    delivery: (state) => state.total >= 1000  ? 0 : 50,
    authtoken: (state) => localStorage.getItem('authtoken')
  },
  
  actions: {
    async fill() {
      // authtoken = localStorage.getItem("authtoken");
      try {
        const { data } = await Api.post("/cakecart", {}, {
          headers: {authtoken: this.authtoken}
        })
        if(data?.data) {
          this.cartItems = data.data;
          return this.cartItems;
        }
        throw new Error (data?.message);

      } catch (error) {
        throw new Error (error);
      }
    },
    async addCartItem(item) {
      try {
        const { data } = await Api.post("/addcaketocart", item, {
          headers: {authtoken: this.authtoken}
        })
        if(data?.data) {
          let existingItem = this.cartItems.find((it) => it.cakeid === item.cakeid)
          if (!existingItem) {
            this.cartItems.push(item)
          } else {
            existingItem = {...existingItem, quantity: existingItem.quantity++ }
          }
          return this.cartItems;
        }
        throw new Error (data?.message);

      } catch (error) {
        throw new Error (error);
      }
    },
    async removeAQuantity(cake) {
      const {cakeid, quantity} = cake;
      try {
        const { data } = await Api.post("/removeonecakefromcart", {cakeid}, {
          headers: {authtoken: this.authtoken}
        })
        if(data?.Error?.includes("Error")) {
          throw new Error (data?.message);
        }
        let existingItem = this.cartItems.find((it) => it.cakeid === cakeid)
        const newQuantity = quantity - 1,
          index = this.cartItems.indexOf(existingItem)
        if(newQuantity){
          this.cartItems[index].quantity = newQuantity;
        }else {
          this.cartItems.splice(index,1);
        }
        return this.cartItems;

      } catch (error) {
        throw new Error (error);
      }
    },
    async removeCartItem(cakeid) {
      try {
        const { data } = await Api.post("/removecakefromcart", {cakeid}, {
          headers: {authtoken: this.authtoken}
        })
        if(data?.error?.includes("Error")) {
          throw new Error (data?.message);
        }
        const existingItem = this.cartItems.find((it) => it.cakeid === cakeid);
        const index = this.cartItems.indexOf(existingItem)
        this.cartItems.splice(index,1);
        return this.cartItems;

      } catch (error) {
        throw new Error (error);
      }
    },
    // calculatePriceBreakUp() {
    //   const total = cartTotal(this.cartItems)
    //   this.priceBreakUp = {
    //     ...this.priceBreakUp,
    //     total,
    //     delivery: total > 1000 ? 0 : 50,
    //     itemCount: this.cartItems.length
    //   }
    //   console.log(this.priceBreakUp);
    //   return this.priceBreakUp;
    // },
    async purchaseItems(order) {
      try {
        const { data } = await Api.post("/addcakeorder", {...order}, {
          headers: {authtoken: this.authtoken}
        })
        if(data?.error) {
          throw new Error (data.error);
        }
        this.cartItems = [];
        return this.cartItems

      }catch(error) {
        throw new Error (error);
      }

    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}

