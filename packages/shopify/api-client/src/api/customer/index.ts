import fetch from './fetch';
import signIn from './signIn';
import signUp from './signUp';
import signOut from './signOut';
import changePassword from './changePassword';

const getCustomer = {
  fetch: fetch,
  signIn: signIn,
  signUp: signUp,
  signOut: signOut,
  changePassword: changePassword
};

export default getCustomer;
