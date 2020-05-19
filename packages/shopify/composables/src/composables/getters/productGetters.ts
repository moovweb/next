import {
  AgnosticMediaGalleryItem,
  AgnosticAttribute,
  AgnosticPrice,
  ProductGetters
} from '@vue-storefront/core';
import { ProductVariant } from '@vue-storefront/shopify-api/src/types';

type ProductVariantFilters = any

// TODO: Add interfaces for some of the methods in core
// Product

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductName = (product: ProductVariant): string => (product as any).title;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: ProductVariant): string => (product as any).handle;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: ProductVariant): AgnosticPrice => {
  return {
    regular: (product as any).variants[0].compareAtPrice,
    special: (product as any).variants[0].price
  };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] =>
  (product ? product.images : [])
    .map((image) => ({
      small: image.src,
      big: image.src,
      normal: image.src
    }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductCoverImage = (product: ProductVariant): string => {
  return product?.images?.[0].src ? product.images[0].src : null;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductFiltered = (products: ProductVariant[] | ProductVariant, filters: ProductVariantFilters | any = {}): ProductVariant[] => {
  return Array.isArray(products) ? products : [products];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: ProductVariant[] | ProductVariant, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return {};
};

export const getProductDescription = (product: ProductVariant, isWantHtml?: boolean): any => {
  if (isWantHtml) (product as any).descriptionHtml;
  return (product as any).description;
};

export const getProductCategoryIds = (product: ProductVariant): string[] => [(product as any).id];

export const getProductId = (product: ProductVariant): string => (product as any).id;

export const getFormattedPrice = (price: number): string => price ? `${price}€` : '';

const productGetters: ProductGetters<ProductVariant, ProductVariantFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice: getFormattedPrice
};

export default productGetters;
