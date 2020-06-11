export function getCategoryPath(category, context = this) {
  return `/collections/${context.$route.params.slug_1}/${category.slug}`;
}
