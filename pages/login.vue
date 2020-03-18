<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Log In</h1>
      <h2 class="subtitle">Demo-day starter</h2>
      <div>
        <a-form
          layout="inline"
          :model="formData"
          @submit="signInUser"
          @submit.native.prevent
        >
          <a-form-item ref="email" prop="email">
            <a-input v-model="formData.email" placeholder="Email">
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>

          <a-form-item ref="password" prop="password">
            <a-input
              v-model="formData.password"
              type="password"
              placeholder="Password"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :disabled="formData.user === '' || formData.password === ''"
            >
              Log in
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
  },
  data: () => ({
    formData: {
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
  created() {
    if (this.isLoggedIn) {
      this.$router.push({
        path: '/',
      });
    }
  },
  methods: {
    async signInUser() {
      try {
        await this.$fireAuth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
        this.$router.push({
          path: '/',
        });
      } catch (e) {
        alert(e);
      }
    },
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
