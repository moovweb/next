import {_shopifyCustomClient} from '../../index';
import { ordersQuery as query} from "./buildQueries";

const fetchOrders = async (token): Promise<void> => {

    return await _shopifyCustomClient.graphQLClient
        .send(query)
        .then(({ model }) => {
            return model;
        });
};

export default fetchOrders;
