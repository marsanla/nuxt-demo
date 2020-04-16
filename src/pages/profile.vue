<template>
  <a-layout>
    <a-layout-content>
      <h2 class="subtitle">Profile</h2>
      <p>{{ authUser.email }}</p>

      <div>
        <a-upload
          name="file"
          :showUploadList="false"
          :customRequest="() => {}"
          accept="image/*"
          :action="uploadAvatar"
        >
          <a-button :loading="uploading"
            ><a-icon type="upload" /> Click to Upload
          </a-button>
        </a-upload>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  middleware: 'auth',
  data: () => {
    return {
      uploading: false,
    };
  },
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
    }),
  },
  methods: {
    async uploadAvatar(file) {
      this.uploading = true;
      const storageRef = this.$fireStorage
        .ref()
        .child(`avatar/${this.authUser.uid}.jpeg`);
      try {
        await storageRef.put(file);
        const url = await storageRef.getDownloadURL();

        await this.$fireAuth.currentUser.updateProfile({
          uid: this.authUser.uid,
          photoURL: url,
        });

        this.$message.success('Success.');
      } catch (e) {
        this.$message.error(e.message);
      }
      this.uploading = false;
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
