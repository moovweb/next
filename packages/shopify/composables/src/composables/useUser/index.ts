/* istanbul ignore file */

import { UseUser, useUserFactory, UseUserFactoryParams } from '@vue-storefront/core';
import { User } from '../../types';

// @todo useUser

const params: UseUserFactoryParams<User, any, any> = {
  loadUser: async () => {
    // @todo
    return {};
  },
  logOut: async () => {
    // @todo
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async ({currentUser, updatedUserData}): Promise<User> => {
    // @todo
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async ({email, password, firstName, lastName}) => {
    // @todo
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async ({ username, password }): Promise<User> => {
    // @todo
    const user = {
      firstName: 'Aureate',
      lastName: 'labs'
    };
    return user;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async function changePassword({currentUser, currentPassword, newPassword}) {
    // @todo
    return {};
  }
};

const useUser: () => UseUser<User, any> = useUserFactory<User, any, any>(params);

export default useUser;
