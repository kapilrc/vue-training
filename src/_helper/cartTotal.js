
export const cartTotal = (cart) => {
  if(!cart?.length) return 0;
  const values = cart?.map(item => item.price * item.quantity);
  return values.reduce((prevVal, newVal) => prevVal + newVal, 0)
}