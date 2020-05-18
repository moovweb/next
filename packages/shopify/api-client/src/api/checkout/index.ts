/**
 * import cart methods
 */
import getCart from './cart';
import createCart from './cart';
import addToCart from './cart';
import updateAttribute from './cart';
import removeCart from './cart';
import updateCart from './cart';
import updateProductQty from './cart';

/**
 * Import discount methods
 */
import addDiscount from './discount';
import removeDiscount from './discount';

const getCheckout = {
  getCart: getCart,
  createCart: createCart,
  addToCart: addToCart,
  updateAttribute: updateAttribute,
  removeCart: removeCart,
  updateCart: updateCart,
  updateProductQty: updateProductQty,
  addDiscount: addDiscount,
  removeDiscount: removeDiscount
};

export default getCheckout;
