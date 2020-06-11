import { setup } from '@vue-storefront/shopify-api';

const config = {
  domain: process.env.SHOPIFY_STORE_URL || 'testimonial-aula.myshopify.com',
  storefrontAccessToken: process.env.SHOPIFY_STORE_TOKEN || '29d77b8cb02a1b019fb50e57c7249936'
};
setup(config);
