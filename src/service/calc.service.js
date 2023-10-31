export const CalculateTotalPrice = (cart) => {
  const totalPrice = cart?.reduce(
    (accumulator, item) => accumulator + item?.price * item?.quantity,
    0
  );

  const discountedPrice = totalPrice * 0.1;

  return totalPrice + discountedPrice;
};
