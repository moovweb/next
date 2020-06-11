<template>
  <SfSection :title-heading="title" class="section">
    <SfLoader :class="{ loading }" :loading="loading">
      <SfCarousel data-cy="related-products-carousel" class="product-carousel">
        <SfCarouselItem v-for="(product, i) in products" :key="i">
          <SfProductCard
            :title="productGetters.getName(product)"
            :image="productGetters.getCoverImage(product)"
            :regular-price="productGetters.getFormattedPrice(productGetters.getPrice(product).regular)"
            :special-price="productGetters.getFormattedPrice(productGetters.getPrice(product).special)"
            :link="localePath(`/products/${productGetters.getSlug(product)}`)"
            class="product-card"
          />
        </SfCarouselItem>
      </SfCarousel>
    </SfLoader>
  </SfSection>
</template>

<script>

import {
  SfCarousel,
  SfProductCard,
  SfSection,
  SfLoader
} from '@storefront-ui/vue';

import { productGetters } from '@vue-storefront/shopify';

export default {
  name: 'RelatedProducts',
  setup() {
    return { productGetters };
  },
  components: {
    SfCarousel,
    SfProductCard,
    SfSection,
    SfLoader
  },
  props: {
    title: String,
    products: Array,
    loading: Boolean
  }
};
</script>
