import { getProduct } from '@vue-storefront/shopify-api';
import { useProductFactory, ProductsSearchResult } from '@vue-storefront/core';
import { UseProduct, Product } from '../../types';

const productsSearch = async (params): Promise<ProductsSearchResult<Product, any>> => {
  console.log('AL: product trace: useComposable: productsSearch - 01', params);
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
    customQuery: params.customQuery
  };
  console.log('AL: product trace: useComposable: productsSearch - 02', searchParams);
  const products = await getProduct(searchParams);

  return {
    data: products,
    total: products.length
  };
};

const useProduct: (cacheId: string) => UseProduct<Product, any> = useProductFactory<Product, any, any>({
  productsSearch
});

export default useProduct;
