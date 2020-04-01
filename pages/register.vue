<template>
  <a-layout>
    <a-layout-content>
      <a-row type="flex" justify="center">
        <a-col>
          <h1 class="ant-typography">Register</h1>
          <h3 class="ant-typography">Subtitle</h3>
        </a-col>
      </a-row>

      <a-row type="flex" justify="center">
        <a-col>
          <a-form layout="inline" :model="formData" @submit="createUser" @submit.native.prevent>
            <a-form-item ref="displayName" prop="displayName">
              <a-input v-model="formData.displayName" placeholder="Full name">
                <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
              </a-input>
            </a-form-item>

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
              >Register</a-button>
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
  data: () => ({
    loading: false,
    formData: {
      displayName: '',
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
    async createUser() {
      this.loading = true;
      try {
        const userIns = await this.$fireAuth.createUserWithEmailAndPassword(
          this.formData.email,
          this.formData.password
        );
        const user = userIns.user;

        await user.updateProfile({
          uid: user.uid,
          displayName: this.formData.displayName,
        });

        await this.$fireStore.collection('userProfile').doc(user.uid).set({
          role: 'user',
        });

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
