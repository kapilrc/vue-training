
import Api from './Api';
import { getToken } from './authService';


export const getCart = async () => await Api.post("/cakecart", {}, {
    headers: {
      "authtoken": getToken()
    }
  }
);

export const removeItemFromCart = async(cakeid) => 
  await Api.post("/removecakefromcart", 
  {
    cakeid
  }, {
  headers: {
    "authtoken": getToken()
  }
});

export const removeAnItemFromCart = async(cakeid) => 
  await Api.post("/removeonecakefromcart", {cakeid}, {
  headers: {
    "authtoken": getToken()
  }
})