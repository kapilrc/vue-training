
import Api from './Api';

export const register = async (user) => await Api.post("/register", user);


export const login = async (user) => await Api.post("/login", user).then(res => {
  localStorage.setItem("token", res.data?.token);
  return Promise.resolve(res);
}, err => Promise.reject(err));

export const getToken = () => localStorage.getItem("token");


