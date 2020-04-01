export default {
  async nuxtServerInit({ dispatch }, ctx) {
    if (this.$fireAuth === null) {
      throw new Error(
        'nuxtServerInit Example not working - this.$fireAuth cannot be accessed.'
      );
    }

    if (ctx.$fireAuth === null) {
      throw new Error(
        'nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.'
      );
    }

    if (ctx.app.$fireAuth === null) {
      throw new Error(
        'nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.'
      );
    }

    console.info(
      'Success. Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___'
    );

    /** Get the VERIFIED authUser from the server */
    if (ctx.res && ctx.res.locals && ctx.res.locals.user) {
      const { allClaims: claims, ...authUser } = ctx.res.locals.user;

      console.info(
        'Auth User verified on server-side. User: ',
        authUser,
        'Claims:',
        claims
      );

      await dispatch('onAuthStateChanged', {
        authUser,
        claims,
      });
    }
  },

  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE');
      return;
    }

    try {
      const userProfile = await this.$fireStore
        .collection('userProfile')
        .doc(authUser.uid)
        .get();
      const doc = userProfile.data();
      if (doc) {
        Object.assign(authUser, doc);
      }
    } catch (e) {}

    commit('SET_AUTH_USER', { authUser });
  },

  checkVuexStore(ctx) {
    if (this.$fireAuth === null) {
      throw new Error(
        'Vuex Store example not working - this.$fireAuth cannot be accessed.'
      );
    }

    alert(
      'Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___'
    );
  },
};
