import initialState from './state';

export default {
  RESET_STORE: (state) => {
    Object.assign(state, initialState());
  },

  SET_AUTH_USER: (state, { authUser }) => {
    if (authUser) {
      state.authUser = {
        uid: authUser.uid,
        email: authUser.email,
        emailVerified: authUser.emailVerified,
        displayName: authUser.displayName,
        photoURL: authUser.photoURL,
        phoneNumber: authUser.phoneNumber,
        role: authUser.role,
      };
    }
  },
};
