import { Product, ProductSearchParams } from '../../types';
import fetchAll from './fetchAll';
import fetchByHandle from './fetchByHandle';
import fetch from './fetch';
import fetchMultiple from './fetchMultiple';
import fetchQuery from './fetchQuery';
import { settings } from '../../index';

async function getProduct(options: ProductSearchParams): Promise<Product[]> {
  if (settings.overrides.getProduct) {
    return settings.overrides.getProduct(options);
  }

  if (options.slug === '/') {
    delete options.slug;
  }

  if (options.id) {
    return fetch(options);
  } else if (options.ids) {
    return fetchMultiple(options);
  } else if (options.slug) {
    return fetchByHandle(options);
  } else if (options.customQuery) {
    return fetchQuery(options);
  } else {
    return fetchAll();
  }
}

export default getProduct;
