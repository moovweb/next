<template>
<!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="mobile-only">
    <nuxt-link data-cy="bottom-navigation-url_home" to="/">
      <SfBottomNavigationItem :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : ''" icon="home" size="20px" label="Home"/>
    </nuxt-link>
    <SfBottomNavigationItem data-cy="bottom-navigation-url_menu" icon="menu" size="20px" label="Menu"/>
    <SfBottomNavigationItem data-cy="bottom-navigation-url_account" icon="profile" size="20px" label="Account" @click="onAccountClicked" />
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <!-- <SfBottomNavigationItem data-cy="bottom-navigation-url_add-to-cart"
      label="Basket"
      icon="add_to_cart"
      >
      <template #icon>
        <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
            :style="{margin: '0 0 0 -2px'}"
          />
        </SfCircleIcon>
      </template>
    </SfBottomNavigationItem> -->
    <SfBottomNavigationItem
      :icon="cartIcon"
      label="Cart"
      :is-floating="true"
    >
      <template #icon>
        <SfCircleIcon
          aria-label="Go to Cart"
          :icon="cartIcon"
          :has-badge="cartTotalItems > 0"
          :badge-label="cartTotalItems"
          @click="toggleCartSidebar"
        />
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue';
import uiState from '~/assets/ui-state';
import {
  useCart,
  useUser,
  cartGetters
} from '@vue-storefront/shopify';
import { computed } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
const { toggleCartSidebar, toggleLoginModal } = uiState;

export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  },
  setup(props, context) {
    const { isAuthenticated } = useUser();
    const { cart, loadCart } = useCart();
    const cartTotalItems = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      return count ? count.toString() : null;
    });

    const accountIcon = computed(() =>
      isAuthenticated.value ? 'profile_fill' : 'profile'
    );

    const cartIcon = computed(() => {
      const count = cartGetters.getTotalItems(cart.value);
      if (count) return 'add_to_cart';
      return 'empty_cart';
    });

    const onAccountClicked = () => {
      isAuthenticated && isAuthenticated.value
        ? context.root.$router.push('/my-account')
        : toggleLoginModal();
    };

    onSSR(async () => {
      await loadCart();
    });

    return {
      accountIcon,
      cartIcon,
      cartTotalItems,
      toggleLoginModal,
      onAccountClicked,
      toggleCartSidebar
    };
  }
};
</script>
