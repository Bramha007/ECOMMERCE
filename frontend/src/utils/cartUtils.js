export const addDecimals = (num) => Math.round((num * 100) / 100).toFixed(2);

export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    Number(
      state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  );
  // Calculate shipping price (If over $100 then free or else $10)
  state.shippingPrice = addDecimals(Number(state.itemsPrice > 100 ? 0 : 10));
  //Calculate tax price
  state.taxPrice = addDecimals(Number(state.itemsPrice * 0.15).toFixed(2));
  //Calcute total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
