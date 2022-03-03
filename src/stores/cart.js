import { acceptHMRUpdate, defineStore } from "pinia";
import { cartTotal } from "../_helper/cartTotal";
import Api from "../_services/Api";

const authtoken = localStorage.getItem("authtoken");

export const useCartStore = defineStore('cart', {
  state: () => ({
    cartItems: [],
  }),
  getters: {
    getCakeIds: (state ) => state.cartItems.map(item => item.cakeid),
    count: (state) =>  state.cartItems.length,
    total: (state) => cartTotal(state.cartItems),
    delivery: (state) => state.total >= 1000  ? 0 : 50
    // priceBreakUp: (state) => {
    //   // const total = cartTotal(state.cartItems)
    //   return {
    //     total: cartTotal(state.cartItems),
    //     delivery: cartTotal(state.cartItems) > 1000 ? 0 : 50,
    //     itemCount: state.cartItems.length
    //   }
    // }
  },
  
  actions: {
    async fill() {
      try {
        const { data } = await Api.post("/cakecart", {}, {
          headers: {authtoken}
        })
        if(data?.data) {
          this.cartItems = data.data;
          // this.calculatePriceBreakUp();
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
          headers: {authtoken}
        })
        if(data?.data) {
          let existingItem = this.cartItems.find((it) => it.cakeid === item.cakeid)
          if (!existingItem) {
            this.cartItems.push(item)
          } else {
            existingItem = {...existingItem, quantity: existingItem.quantity++ }
          }
          // this.calculatePriceBreakUp();
          return this.cartItems;
        }
        throw new Error (data?.message);

      } catch (error) {
        throw new Error (error);
      }
    },
    async removeAQuantity(cake) {
      const {cakeid, quantity} = cake;
      // const i = this.cartItems.lastIndexOf(item)
      // if (i > -1) this.cartItems.splice(i, 1)
      try {
        const { data } = await Api.post("/removeonecakefromcart", {cakeid}, {
          headers: {authtoken}
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
        // this.calculatePriceBreakUp();
        return this.cartItems;

      } catch (error) {
        throw new Error (error);
      }
    },
    async removeCartItem(cakeid) {
      try {
        const { data } = await Api.post("/removecakefromcart", {cakeid}, {
          headers: {authtoken}
        })
        if(data?.Error?.includes("Error")) {
          throw new Error (data?.message);
        }
        const existingItem = this.cartItems.find((it) => it.cakeid === cakeid);
        const index = this.cartItems.indexOf(existingItem)
        this.cartItems.splice(index,1);
        // this.calculatePriceBreakUp();
        return this.cartItems;

      } catch (error) {
        throw new Error (error);
      }
    },
    calculatePriceBreakUp() {
      const total = cartTotal(this.cartItems)
      this.priceBreakUp = {
        ...this.priceBreakUp,
        total,
        delivery: total > 1000 ? 0 : 50,
        itemCount: this.cartItems.length
      }
      console.log(this.priceBreakUp);
      return this.priceBreakUp;
    },
    async purchaseItems(order) {
      try {
        const { data } = await Api.post("/addcakeorder", {...order}, {
          headers: {authtoken}
        })
        if(data?.Error?.includes("Error")) {
          throw new Error (data?.message);
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