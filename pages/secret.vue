<template>
  <div class="container">
    <div>
      <h3 class="display-1 mb-5">A secret page. And Firebase database tester</h3>
      <div class="links">
        <a-button type="primary" @click="writeToFirestore()">Write to database</a-button>
        <a-button @click="readFromFirestore()">Read from database</a-button>

        <div>Selected project: {{ selectedProject.title }}</div>
        <div>
          All projects:
          <div v-for="item in projects" :key="item.id">Project name: {{ item.title }}</div>
        </div>
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
      projects: [],
      selectedProject: {}
    };
  },
  computed: {
    ...mapState({
      authUser: (state) => state.authUser,
    }),
  },
  created() {
    this.$fireStore.collection('projects').onSnapshot((snap) => { 
      const projects = [];
      snap.forEach((doc) => {
        projects.push({ id: doc.id, title: doc.data().title });
      });
      this.projects = projects;
    });
  },
  methods: {
    async writeToFirestore() {
      const projectRef = this.$fireStore.collection('projects').doc();
      try {
        await projectRef.set({
          title: 'Nuxt-Fire with Firestore rocks!',
        });
      } catch (e) {
        this.$message.error(e.message);
        return;
      }
      this.$message.success('Success.');
    },
    async readFromFirestore() {
      const projectRef = this.$fireStore.collection('projects').doc('<uid>');
      try {
        const snapshot = await projectRef.get();
        const doc = snapshot.data();
        if (!doc) {
          this.$message.error('Project does not exist.');
          return;
        }
        this.selectedProject = doc;
      } catch (e) {
        this.$message.error(e.message);
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
