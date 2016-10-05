import { createSelector } from 'reselect';


const cartItems = state => state.cart.items;
const productsById = state => state.products.byId;

export default createSelector(
  [cartItems, productsById],
  (cartItems, productsById) => {
    const unformattedTotal = cartItems.reduce((total, cartItem) => {
      const { productId, variantId } = cartItem;

      const product = productsById[productId];
      const variant = product.variants.find(variant => (
        variant.id === variantId
      ));

      return total + parseFloat(variant.price);
    }, 0);

    return unformattedTotal ? unformattedTotal.toFixed(2) : null;
  }
);
