/* istanbul ignore file */

import { useUserFactory, UseUserFactoryParams } from '@vue-storefront/core';
import { User } from '../../types';
import { getCustomer } from '@vue-storefront/shopify-api';
import Cookies from 'js-cookie';

// @todo useUser
const params: UseUserFactoryParams<User, any, any> = {
  loadUser: async () => {
    let token = Cookies.get('token');
    let result :any = await getCustomer.fetch(token);
    const response : User = result.customer;
    return response;
  },
  logOut: async () => {
    let token = Cookies.get('token');
    Cookies.remove('token');
    await getCustomer.signOut(token);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async ({currentUser, updatedUserData}): Promise<User> => {
    let result = await getCustomer.editProfile(currentUser, {
      email: updatedUserData.email,
      firstName: updatedUserData.firstName,
      lastName: updatedUserData.lastName
    });
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async ({email, password, firstName, lastName}) => {
    let result = await getCustomer.signUp({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    });
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async ({ username, password }) => {
    let result = await getCustomer.signIn(username, password);
    const response : User = {
      token : result['customerAccessTokenCreate'].customerAccessToken.accessToken,
      error : (result['customerAccessTokenCreate'].customerUserErrors.length) ? result['customerAccessTokenCreate'].customerUserErrors[0].message : 'No error found'
    };
    Cookies.set('token', response.token);
    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async function changePassword({currentUser, currentPassword, newPassword}) {
    let result = await getCustomer.changePassword(currentUser, newPassword);
    return {};
  }
};

const {setUser, useUser} = useUserFactory<User, any, any>(params);

export {setUser, useUser};
