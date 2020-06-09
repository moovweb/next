import { getCart, createCart } from '@vue-storefront/shopify-api';
import { CartParams } from '@vue-storefront/shopify-api/src/types';
import Cookies from 'js-cookie';

const loadCurrentCart = async (cartParams: CartParams) => {
  console.log('AL: Cart Trace: cookie set 01', cartParams.id, Cookies.get('cart_id'));
  let cartResponse = null;
  if (cartParams && cartParams.id && cartParams.id !== '') {
    console.log('AL: Cart Trace: cookie set 02', cartParams);
    cartResponse = await getCart(cartParams);
  } else {
    cartResponse = await createCart(cartParams);
    console.log('AL: Cart Trace: cookie set 03', cartParams);
  }
  // const cartResponse = cartParams && cartParams.id && cartParams.id !== '' ? await getCart(cartParams) : await createCart(cartParams);
  if (cartResponse && cartResponse.id) {
    Cookies.set('cart_id', cartResponse.id);
    // Cookies.set('cart', cartResponse);
    console.log('AL: Cart Trace: cookie set - final', cartResponse.id, Cookies.get('cart_id'));
  }
  // const currentCartResponse = await getCheckout.getCart;

  // if (currentCartResponse) {
  //   return currentCartResponse;
  // }
  return cartResponse;
};

export default loadCurrentCart;
