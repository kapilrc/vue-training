
import Api from './Api';
import { getToken } from './authService';


export const getCart = async () => await Api.post("/cakecart", {}, {
    headers: {
      "authtoken": getToken()
    }
  }
);

export const removeItemFromCart = async(id) => await Api.delete(`/removeitemfromcart?cakeid=${id}`, {
  headers: {
    "authtoken": getToken()
  }
})