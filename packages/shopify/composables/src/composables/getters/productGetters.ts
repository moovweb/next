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
export const getProductName = (product: ProductVariant): string => {
  if ((product as any)) {
    return (product as any).title;
  }
  return '';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductSlug = (product: ProductVariant): string => {
  if ((product as any)) {
    return (product as any).handle;
  }
  return '';
};

export const selectedVariant = (product: ProductVariant): any => {
  let defaultVariant = product;
  if (product.variants && product.variants.length > 0) {
    defaultVariant = product.variants[0];
    // defaultVariant.
  }
  return defaultVariant;
};

export const checkSpecialPrice = (product: ProductVariant): boolean => {
  const defaultVariant = selectedVariant(product);
  if (defaultVariant.compareAtPrice !== '0.00') {
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductPrice = (product: ProductVariant): AgnosticPrice => {
  const defaultVariant = selectedVariant(product);
  let productPrice = {
    regular: defaultVariant.price,
    special: 0
  };
  const hasSpecialPrice = checkSpecialPrice(product);
  if (hasSpecialPrice) productPrice = { regular: defaultVariant.compareAtPrice, special: defaultVariant.price };

  return productPrice;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductGallery = (product: ProductVariant): AgnosticMediaGalleryItem[] =>
  (product ? product.images : [])
    .map((image) => ({
      // alt: 'Product A',
      // mobile: { url: image.src },
      // desktop: { url: image.src },
      // zoom: { url: image.src }
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
  if (!products) {
    return [];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getVariantByAttributes = (products: ProductVariant[] | ProductVariant, attributes: any): ProductVariant[] => {
    if (!products) {
      return [];
    }
    // Add default attributes
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const getDefaultOptions = (product: ProductVariant[] | ProductVariant): any => {
      return product.options.map((pOption) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const pOptionName = pOption.name;
        return pOption.values.length === 1 ? { pOptionName: pOption.values[0] } : { pOptionName: pOption.values };
      });
    };
    const configurationKeys = Object.keys(attributes);
    const productVariants = products.variants;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const selectedVariant = productVariants.find((pVariant) => {
      if (pVariant.selectedOptions.length === configurationKeys.length) {
        const currentAttributes = pVariant.selectedOptions;
        return configurationKeys.every((attrName) =>
          currentAttributes.find(({ name, value }) => attrName === name && attributes[attrName] === value)
        );
      }
    });
    // products[selectedVariant] = selectedVariant;
    return [];
  };
  if (filters.attributes && Object.keys(filters.attributes).length > 0) {
    // const currentProduct = typeof products === 'object' ? products : products[0];
    // return [];
  }
  if (filters.master) {
    return Array.isArray(products) ? products : [products];
  }
  return Array.isArray(products) ? products : [products];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getProductAttributes = (products: ProductVariant[] | ProductVariant, filterByAttributeName?: string[]): Record<string, AgnosticAttribute | string> => {
  return { value: null };
};

export const getProductOptions = (product: ProductVariant): Record<string, AgnosticAttribute | string> => {
  const productOptions = (product as any).options;
  return productOptions;
};

export const getProductDescription = (product: ProductVariant, isWantHtml?: boolean): any => {
  if (isWantHtml) (product as any).descriptionHtml;
  return (product as any).description;
};

export const getProductCategoryIds = (product: ProductVariant): string[] => [(product as any).id];

export const getProductId = (product: ProductVariant): string => (product as any).id;

export const getFormattedPrice = (price: number): string => price ? `₹ ${price}` : '';

export const getProductStatus = (product: ProductVariant): boolean => {
  if (product.availableForSale || product.available) {
    return true;
  }
  return false;
};

export const checkForWishlist = (product: ProductVariant): boolean => (product as any).isOnWishlist ?? false;

const productGetters: ProductGetters<ProductVariant, ProductVariantFilters> = {
  getName: getProductName,
  getSlug: getProductSlug,
  getPrice: getProductPrice,
  getGallery: getProductGallery,
  getCoverImage: getProductCoverImage,
  getFiltered: getProductFiltered,
  getAttributes: getProductAttributes,
  getOptions: getProductOptions,
  getDescription: getProductDescription,
  getCategoryIds: getProductCategoryIds,
  getId: getProductId,
  getFormattedPrice: getFormattedPrice,
  getStatus: getProductStatus,
  hasSpecialPrice: checkSpecialPrice,
  isOnWishlist: checkForWishlist
};

export default productGetters;
