<template>
  <a-layout>
    <a-layout-content>
      <h2 class="subtitle">Profle</h2>
      <p>{{ authUser.email }}</p>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  middleware: 'auth',
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
    }),
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
