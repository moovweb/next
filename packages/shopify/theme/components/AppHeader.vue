<template>
  <SfHeader
    data-sp="app-header"
    active-sidebar="activeSidebar"
    @click:cart="toggleCartSidebar"
    @click:wishlist="toggleWishlistSidebar"
    @click:account="onAccountClicked"
    @change:search="onSearchQueryChanged"
    :search-value="searchQuery"
    :cartItemsQty="cartTotalItems"
    class="sf-header--has-mobile-search"
    >
    <!-- TODO: add mobile view buttons after SFUI team PR -->
    <template #logo>
      <nuxt-link :to="localePath('/')" class="sf-header__logo">
        <SfImage src="/icons/logo.svg" alt="Vue Storefront Next" class="sf-header__logo-image"/>
      </nuxt-link>
    </template>
    <template #navigation>
      <SfHeaderNavigationItem v-for="category in categories" :key="category.id">
        <nuxt-link :to="'/c/' + category.handle">
          {{ category.title }}
        </nuxt-link>
      </SfHeaderNavigationItem>
      <search-results :visible="showSearchResults" :categories="categoriesFound" :products="productsFound"/>
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import { useCart, useUser, useCategory, cartGetters, useSearch } from '@vue-storefront/shopify';
import { computed, ref } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import SearchResults from './SearchResults';

const { toggleCartSidebar, toggleWishlistSidebar, toggleLoginModal } = uiState;

export default {
  components: {
    SfHeader,
    SfImage,
    SearchResults
  },
  setup(props, context) {
    const { isAuthenticated } = useUser();
    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value ? context.root.$router.push('/my-account') : toggleLoginModal();
    };
    const { cart } = useCart();
    // const { loadWishlist } = useWishlist();
    const { search: productSearch, searchResults } = useSearch();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });
    const searchQuery = ref('');
    const showSearchResults = ref(false);
    const categoriesFound = computed(() => {
      return searchResults.value?.categories;
    });
    const productsFound = computed(() => searchResults.value?.products);
    const suggestionsFound = computed(() => searchResults.value?.suggestions);
    const onSearchQueryChanged = value => {
      searchQuery.value = value;
      if (value.length > 2) {
        showSearchResults.value = true;
        productSearch({ term: searchQuery.value });
      } else {
        showSearchResults.value = false;
      }
    };

    const { categories, search } = useCategory('categories');
    onSSR(async () => {
      await search({ slug: '' });
      // await loadWishlist();
    });
    return {
      cartTotalItems,
      categoriesFound,
      productsFound,
      suggestionsFound,
      searchQuery,
      searchResults,
      showSearchResults,
      toggleCartSidebar,
      toggleLoginModal,
      toggleWishlistSidebar,
      onAccountClicked,
      categories,
      onSearchQueryChanged
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
</style>
