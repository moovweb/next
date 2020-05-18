import getCategory from './api/category';
import getProduct from './api/product';
import getCheckout from './api/checkout';
import getShop from './api/shop';
import getCustomer from './api/customer';
import { apiClientFactory } from '@vue-storefront/core';
import { ApiClientMethods, ApiClientSettings } from './types';
import Client from 'shopify-buy';

let _shopifyClient;

const { setup, override, getSettings } = apiClientFactory<ApiClientMethods, ApiClientSettings>({
  defaultSettings: {
    domain: 'testimonial-aula.myshopify.com',
    storefrontAccessToken: '29d77b8cb02a1b019fb50e57c7249936'
  },
  onSetup: (config: any) => {
    _shopifyClient = Client.buildClient(config);
  }
});

const settings = getSettings();

export {
  getProduct,
  getCategory,
  getCheckout,
  getShop,
  getCustomer,
  _shopifyClient,
  override,
  setup,
  settings
};
