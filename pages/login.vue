<template>
  <a-layout>
    <a-layout-content>
      <a-row type="flex" justify="center">
        <a-col>
          <h1 class="ant-typography">Log In</h1>
          <h3 class="ant-typography">Subtitle</h3>
        </a-col>
      </a-row>

      <a-row type="flex" justify="center">
        <a-col>
          <a-form layout="inline" :model="formData" @submit="signInUser" @submit.native.prevent>
            <a-form-item ref="email" prop="email">
              <a-input v-model="formData.email" placeholder="Email">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>

            <a-form-item ref="password" prop="password">
              <a-input v-model="formData.password" type="password" placeholder="Password">
                <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                :loading="loading"
                :disabled="formData.user === '' || formData.password === ''"
              >Log in</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  components: {},
  middleware: 'no_auth',
  data: () => ({
    loading: false,
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
      this.loading = true;
      try {
        await this.$fireAuth.signInWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
        this.$router.push({
          path: '/',
        });
      } catch (e) {
        this.loading = false;
        this.$message.error(e);
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
</style>
