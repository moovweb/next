// // import gql from 'graphql-tag';
// // import { CustomerFragment, CartFragment } from './../../fragments';

// // export default gql`
// //   ${CustomerFragment}
// //   ${CartFragment}

// //   mutation customerSignMeUp($draft: CustomerSignMeUpDraft!, $locale: Locale!, $storeKey: KeyReferenceInput) {
// //     user: customerSignMeUp(draft: $draft, storeKey: $storeKey) {
// //       customer {
// //         ...DefaultCustomer
// //       }
// //       cart {
// //         ...DefaultCart
// //       }
// //     }
// //   }
// // `;

// // mutation customerCreate($input: CustomerCreateInput!) {
// //   customerCreate(input: $input) {
// //     customer {
// //       id
// //     }
// //     customerUserErrors {
// //       code
// //       field
// //       message
// //     }
// //   }
// // }

// // import { CustomerSignMeUpDraft } from './../../types/GraphQL';
// // import { apolloClient, locale } from './../../index';
// // import CustomerSignMeUpMutation from './defaultMutation';
// // import { SignInResponse } from './../../types/Api';

// // const customerSignMeUp = async (draft: CustomerSignMeUpDraft): Promise<SignInResponse> => {
// //   return await apolloClient.mutate({
// //     mutation: CustomerSignMeUpMutation,
// //     variables: { draft,
// //       locale }
// //   }) as SignInResponse;
// // };

// // export default customerSignMeUp;

// import { _shopifyClient } from '../../index';
// import { Customer, CustomerParams } from '../../types';

// // Build a custom products query using the unoptimized version of the SDK
// const createCustomerQuery = _shopifyClient.graphQLClient.query((root) => {
//   root.add('customerCreate', {
//     args: {
//       input: _shopifyClient.variable('input', 'CustomerCreateInput!')
//     }
//   }, function fn(customerCreate) {
//     customerCreate.add('customerUserErrors', function fn(customerUserErrors) {
//       customerUserErrors.add('field');
//       customerUserErrors.add('message');
//       customerUserErrors.add('code');
//     });
//     customerCreate.add('customer', function fn(customer) {
//       customer.add('acceptsMarketing');
//       customer.add('createdAt');
//       customer.add('defaultAddress');
//       customer.add('displayName');
//       customer.add('email');
//       customer.add('firstName');
//       customer.add('id');
//       customer.add('lastIncompleteCheckout');
//       customer.add('lastName');
//       customer.add('phone');
//       customer.add('tags');
//       customer.add('updatedAt');
//     });
//   });
//   // root.addConnection('products', {args: {first: 10}}, (product) => {
//   //   product.add('title');
//   //   product.add('tags');// Add fields to be returned
//   // });
// });

// /**
//  * Register with the store.
//  *
//  * @example
//  * _shopifyClient.collection.fetch('Xk9lM2JkNzFmNzIQ4NTIY4ZDFiZTUyZTUwNTE2MDNhZjg==').then((collection) => {
//  *   // Do something with the collection
//  * });
//  *
//  * @param {Object} customerData The customerData of the customer to signup with store.
//  * @return {Promise|Customer} A promise resolving with an single `Customer`.
//  */
// async function signUp1(customerData: CustomerParams): Promise<Customer> {
//   // Call the send method with the custom products query
//   return await _shopifyClient.graphQLClient.send(createCustomerQuery, { input: customerData }).then(({customer}) => {
//     // Do something with the products
//     return customer;
//   });
// }
const signUp = async (): Promise<void> => {

};

export default signUp;
