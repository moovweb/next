/* istanbul ignore file */
import { useCartFactory, UseCartFactoryParams } from '@vue-storefront/core';
import { ref, Ref } from '@vue/composition-api';
import { addToCart, removeCart, updateProductQty, cookies } from '@vue-storefront/shopify-api';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Cart, CartItem, CartParams, Product } from '@vue-storefront/shopify-api/src/types';
import { Coupon } from '../../types';
import loadCurrentCart from './loadCurrentCart';
import Cookies from 'js-cookie';

export const cart: Ref<Cart> = ref(null);

// @todo: implement cart
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fetchCartLineItem = ({ currentCart, product }) => {
  const currentLineItem = currentCart.lineItems.find(lineItem => lineItem.id === product.id);
  return currentLineItem;
};

const params: UseCartFactoryParams<Cart, CartItem, Product, Coupon> = {
  cart,
  loadCart: async () => {
    Cookies.set(cookies.cartCookieName, 'Chirag');
    const cartParams = {
      checkoutId: Cookies.get('cart_id') || '',
      id: Cookies.get('cart_id') || ''
    };
    const currentCart = await loadCurrentCart(cartParams);
    // cart.push(currentCart);
    return currentCart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addToCart: async ({ currentCart, product, quantity }) => {
    currentCart.lineItems.push(product.variants[0]);
    // const lineItems = Object.assign(currentCart.lineItems, { ...product['variants'][0] });
    const cartParams = {
      id: currentCart.id,
      lineItems: [{ variantId: product.variants[0].id, quantity: quantity }]
    };
    const updatedCart = await addToCart(cartParams);
    cart.value = updatedCart;
    return updatedCart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeFromCart: async ({ currentCart, product }) => {
    const variantId = [];
    variantId.push(product.id);
    const cartParams = {
      id: currentCart.id,
      lineItemIds: variantId
    };
    const updatedCart = await removeCart(cartParams);
    cart.value = updatedCart;
    return updatedCart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateQuantity: async ({ currentCart, product, quantity }) => {
    // const currentItem = fetchCartLineItem({ currentCart, product });
    const cartParams = {
      id: currentCart.id,
      lineItems: [{ variantId: product.variant.id, quantity: quantity }]
    };
    const updatedCart = await updateProductQty(cartParams);
    cart.value = updatedCart;
    return updatedCart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clearCart: async ({ currentCart }) => {
    return currentCart;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  applyCoupon: async ({ currentCart, coupon }) => {
    return {updatedCart: currentCart, updatedCoupon: {}};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeCoupon: async ({ currentCart }) => {
    return {updatedCart: currentCart, updatedCoupon: {}};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isOnCart: ({ currentCart }) => {
    return false;
  }
};

// const { useCart, setCart }: {
//   useCart: () => UseCart<Cart, CartItem, Product, any>;
//   setCart: (Cart) => void;
// } = useCartFactory<Cart, CartItem, Product, any>(params);

const { setCart, useCart } = useCartFactory<Cart, CartItem, Product, Coupon>(params);

export { setCart, useCart};
