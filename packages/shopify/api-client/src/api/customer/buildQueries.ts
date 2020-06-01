import {_shopifyCustomClient} from "../../index";

let customerQuery: (token: string) => any = (token): any => {

    return _shopifyCustomClient.graphQLClient.query((root) => {
        root.add('customer', {
            args: {
                customerAccessToken: token
            }
        }, (customer) => {
            customer.add('id');
            customer.add('displayName');
            customer.add('email');
            customer.add('firstName');
            customer.add('lastName');
            customer.add('phone');
        });
    });
};

let ordersQuery: (pages: number, token: string) => any = (pages, token): any => {

    return _shopifyCustomClient.graphQLClient.query((root) => {
        root.add('customer', {
            args: {
                customerAccessToken: token
            }
        }, (customer) => {
            customer.add('id');
            customer.addConnection('orders', {args: {first: pages}}, (order) => {
                order.add('name');
                order.add('email');
                order.add('orderNumber');
                order.add('processedAt');
                order.add('financialStatus');
                order.add('fulfillmentStatus');
                order.add('originalTotalPrice', function (price) {
                    price.add('amount');
                    price.add('currencyCode');
                });
                order.add('subtotalPriceV2', function (price) {
                    price.add('amount');
                    price.add('currencyCode');
                });
                order.add('totalRefundedV2', function (price) {
                    price.add('amount');
                    price.add('currencyCode');
                });
                order.add('totalShippingPriceV2', function (price) {
                    price.add('amount');
                    price.add('currencyCode');
                });
                order.add('totalTaxV2', function (price) {
                    price.add('amount');
                    price.add('currencyCode');
                });
                order.add('totalPriceV2', function (price) {
                    price.add('amount');
                    price.add('currencyCode');
                });
            });
        });
    });
};

export {
    customerQuery,
    ordersQuery
}
