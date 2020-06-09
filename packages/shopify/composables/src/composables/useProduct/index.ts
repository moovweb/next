import { getProduct } from '@vue-storefront/shopify-api';
import { useProductFactory, ProductsSearchResult } from '@vue-storefront/core';
import { UseProduct, Product } from '../../types';

const productsSearch = async (params): Promise<ProductsSearchResult<Product>> => {
  // Make a customQuery for search product/sortBy
  // params.customQuery = {
  //   first: 20,
  //   reverse: true,
  //   sortKey: 'CREATED_AT',
  //   collection: 'toys'
  // };
  const searchParams = {
    ids: params.ids,
    with: params.term,
    where: params.term,
    sort: params.sort,
    page: params.pagination && params.pagination.page ? params.pagination.page : 0,
    masterKey: '',
    term: params.term,
    id: params.id,
    handle: params.handle,
    slug: params.slug,
    customQuery: params.customQuery
  };
  if (params.catId) {
    // searchParams.customQuery = {

    // }
  }
  const products = await getProduct(searchParams);

  return {
    data: products,
    total: products.length
  };
};

const useProduct: (cacheId: string) => UseProduct<Product> = useProductFactory<Product, any>({
  productsSearch
});

export default useProduct;
