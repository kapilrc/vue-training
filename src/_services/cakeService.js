
import Api from './Api';


export const getCakes = async () => await Api.get("/allCakes");
