import ShopifyBuy from 'shopify-buy';


let cart;
const SAVED_CART_KEY = 'basilica-saved-cart-id';


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

  // The Shopify SDK makes heavy use of `this` x_x. Redux-saga invokes things
  // with its declarative effects system, which doesn't respect that context.
  // Need to bind all our methods so that they work.
  const boundMethods = [
    'createCart',
    'fetch',
    'fetchCart',
    'fetchCollection',
    'fetchProduct',
    'fetchQueryCollections',
    'fetchQueryProducts',
    'updateCart',
  ];

  boundMethods.forEach((method) => {
    client[method] = client[method].bind(client);
  });

  return client;
};

const client = createClient();
export default client;


/** getCart
  Get (or create) the current shopify cartModel
  It's async, because it will need to fetch or create the cart on the first
  invocation, depending on whether a saved cart ID is available in localStorage

  @returns shopify cartModel (http://shopify.github.io/js-buy-sdk/api/classes/CartModel.html)
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
          resolve(cart);
        },
        reject
      );
  });
};

export const getProductById = (productId) => {
  return client
    .fetchProduct(productId)
    .then(product => product.attrs);
};
