import ShopifyBuy from 'shopify-buy';


let cart;
const SAVED_CART_KEY = 'basilica-saved-cart-id';


/** bindMethods
  Shopify's JS SDK is written in a way that assumes that all methods will be
  called with their context preserved.

  This is a naive way to write an SDK, and it is incompatible with Redux Saga,
  which invokes methods indirectly to preserve testability.

  To fix this annoying issue, we need to bind the item's context to all of its
  methods. This simple helper binds methods to a supplied object.
*/
const bindMethods = methods => obj => {
  methods.forEach((method) => {
    // eslint-disable-next-line no-param-reassign
    obj[method] = obj[method].bind(obj);
  });

  return obj;
};

const bindMethodsToShopClient = bindMethods([
  'createCart',
  'fetch',
  'fetchCart',
  'fetchCollection',
  'fetchProduct',
  'fetchQueryCollections',
  'fetchQueryProducts',
  'updateCart',
]);

const bindMethodsToCart = bindMethods([
  'addVariants',
  'clearLineItems',
  'removeLineItem',
  'updateLineItem',
  'updateModel',
]);


/** createClient
  Create a shopClient, from its SDK. Used for all shop interactions.

  NOTE: Our client is going to be a singleton; we never want multiple
  connected clients. We'll export the factory itself as well, but only
  for testing purposes.

  @returns shopify shopClient (http://shopify.github.io/js-buy-sdk/api/classes/ShopClient.html)
*/
export const createClient = () => {
  const client = ShopifyBuy.buildClient({
    apiKey: 'dac0c691a19ce7408bfb4f866e813ea5',
    domain: 'basilica-plans.myshopify.com/',
    appId: '6',
  });

  bindMethodsToShopClient(client);

  return client;
};

const client = createClient();
export default client;


/** getCart
  Get (or create) the current shopify cartModel
  It's async, because it will need to fetch or create the cart on the first
  invocation, depending on whether a saved cart ID is available in localStorage

  @returns a promise that resolves to a shopify cartModel (http://shopify.github.io/js-buy-sdk/api/classes/CartModel.html)
*/
export const getCart = () => {
  return new Promise((resolve, reject) => {
    if (cart) {
      return resolve(cart);
    }

    const savedCartId = localStorage.getItem(SAVED_CART_KEY);

    if (savedCartId) {
      return client
        .fetchCart(savedCartId)
        .then(
          (persistedCart) => {
            cart = persistedCart;

            bindMethodsToCart(cart);
            resolve(cart);
          },
          reject
        );
    }

    return client
      .createCart()
      .then(
        (newCart) => {
          cart = newCart;
          localStorage.setItem(SAVED_CART_KEY, cart.id);

          bindMethodsToCart(cart);
          resolve(cart);
        },
        reject
      );
  });
};

export const getProductsById = (productIds) => {
  return client
    .fetchQueryProducts({ product_ids: productIds })
    .then(products => products.map(product => product.attrs));
};
