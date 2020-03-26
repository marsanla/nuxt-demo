<template>
  <div class="container">
    <div>
      <h3 class="display-1 mb-5">A secret page. And Firebase database tester</h3>
      <div class="links">
        <a-button type="primary" @click="writeToFirestore()">Write to database</a-button>
        <a-button @click="readFromFirestore()">Read from database</a-button>

        <div>{{ message }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  components: {},
  middleware: 'auth',
  data: () => {
    return {
      message: '',
    };
  },
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
    }),
  },
  methods: {
    async writeToFirestore() {
      const messageRef = this.$fireStore.collection('message').doc();
      try {
        await messageRef.set({
          message: 'Nuxt-Fire with Firestore rocks!',
        });
      } catch (e) {
        this.$message.error(e);
        return;
      }
      this.$message.success('Success.');
    },
    async readFromFirestore() {
      const messageRef = this.$fireStore.collection('message').doc('message');
      try {
        const snapshot = await messageRef.get();
        const doc = snapshot.data();
        if (!doc) {
          this.$message.error('Document does not exist.');
          return;
        }
        this.message = doc.message;
      } catch (e) {
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
