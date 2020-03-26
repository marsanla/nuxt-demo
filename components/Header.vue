<template>
  <a-layout-header class="header">
    <a-row>
      <a-col :span="12">
        <div class="logo">
          <Logo />
        </div>
        <a-menu
          theme="dark"
          mode="horizontal"
          :selected-keys="[$route.name]"
          :style="{ lineHeight: '64px' }"
        >
          <a-menu-item key="index">
            <nuxt-link to="/">Home</nuxt-link>
          </a-menu-item>
          <a-menu-item key="about">
            <nuxt-link to="/about">About Us</nuxt-link>
          </a-menu-item>
          <a-menu-item v-if="isLoggedIn" key="secret">
            <nuxt-link to="/secret">Secret</nuxt-link>
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col :style="{'text-align': 'right'}" :span="12">
        <template v-if="isLoggedIn">
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{ authUser.displayName || authUser.email }}
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <nuxt-link to="/profile">Profile</nuxt-link>
              </a-menu-item>
              <a-menu-item>
                <nuxt-link to="/logout">Logout</nuxt-link>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
        <template v-else>
          <nuxt-link to="/login">Log In</nuxt-link>
          <nuxt-link to="/register">Register</nuxt-link>
        </template>
      </a-col>
    </a-row>
  </a-layout-header>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import Logo from '~/components/Logo.vue';

export default {
  components: {
    Logo,
  },
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
    }),
    ...mapGetters({
      isLoggedIn: 'isLoggedIn',
    }),
  },
};
</script>

<style>
.logo {
  height: 31px;
  margin: 16px 28px 16px 0;
  float: left;
}

.menu {
  width: 100%;
}

.menu .right-item {
  float: right;
}
</style>
