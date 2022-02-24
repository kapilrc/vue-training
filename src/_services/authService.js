
import Api from './Api';

export const register = async (user) => await Api.post("/register", user);


export const login = async (user) => await Api.post("/login", user).then(res => {
  localStorage.setItem("authtoken", res.data?.token);
  return Promise.resolve(res);
}, err => Promise.reject(err));

export const getToken = () => localStorage.getItem("authtoken") || null;

export const logout = async () => {
  localStorage.clear()
  return Promise.resolve({data: { message: "success" } });
  // try {
  //   await Api.get("/logout", {
  //     headers: {
  //       "authtoken": getToken()
  //     }
  //   });
  //   return Promise.resolve(res);
  // } catch(e) {
  //   console.error(e);
  // } finally {
  //   localStorage.clear()
  // }
}

