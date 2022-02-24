
import Api from './Api';
import { getToken } from './authService';


export const getCakes = async () => await Api.get("/allCakes");


export const getCakeDetails = async (id) => await Api.get(`/cake/${id}`);

export const searchCakes = async (q) => await Api.get(`/searchcakes?q=${q}`);

export const sendFileToServer = async (formData) => await Api.post("/upload", formData, {
  headers: {
    "Content-Type": "multipart/form-data",
    "authtoken": getToken()
  }
});

export const addCakeToCart = async (data) => await Api.post(`/addcaketocart`, data, {
  headers: {
    "authtoken": getToken()
  }
});






