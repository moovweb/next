<template>
  <SfHeader
    active-sidebar="activeSidebar"
    @click:cart="toggleCartSidebar"
    @click:account="onAccountClicked"
    :cartItemsQty="cartTotalItems"
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
    </template>
  </SfHeader>
</template>

<script>
import { SfHeader, SfImage } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import { useCart, useUser, useCategory, cartGetters } from '@vue-storefront/shopify';
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
const { toggleCartSidebar, toggleLoginModal } = uiState;

export default {
  components: {
    SfHeader,
    SfImage
  },
  setup(props, context) {
    const { isAuthenticated } = useUser();
    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value ? context.root.$router.push('/my-account') : toggleLoginModal();
    };
    const { cart } = useCart();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      // TODO: remove once resolved by UI team: https://github.com/DivanteLtd/storefront-ui/issues/1061
      return count ? count.toString() : null;
    });
    const { categories, search } = useCategory('categories');
    onSSR(async () => {
      await search({ slug: '' });
    });
    return {
      cartTotalItems,
      toggleLoginModal,
      onAccountClicked,
      toggleCartSidebar,
      categories
    };
  }
};
</script>

<style lang="scss" scoped>
.sf-header__logo-image {
  height: 100%;
}
</style>
