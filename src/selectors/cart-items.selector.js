import { createSelector } from 'reselect';

import { stripHTMLFromText } from '../utils/misc.utils';

const cartItems = state => state.cart.items;
const productsById = state => state.products.byId;

export default createSelector(
  [cartItems, productsById],
  (cartItems, productsById) => {
    return cartItems.map(({ productId, variantId, cartLineId, quantity }) => {
      const product = productsById[productId];
      const variant = product.variants.find(variant => (
        variant.id === variantId
      ));
      const image = product.images.find(image => (
        image.variant_ids[0] === variantId
      ));

      // We don't want to show the whole product description in the cart,
      // we only need a few words. Since Shopify stores descriptions as HTML,
      // we need to strip the tags.
      const description = stripHTMLFromText(product.body_html);
      const summary = description.length > 100
        ? description.substr(0, 100) + '…'
        : description;

      return {
        ...product,
        cartLineId,
        variant,
        quantity,
        image,
        summary,
      };
    });
  }
);
