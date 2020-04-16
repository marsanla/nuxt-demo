<script>
export default {
  async mounted() {
    try {
      await this.$fireAuth.signOut();
    } catch (e) {}

    this.$router.push({
      path: '/login',
    });
  },

  render: () => {
    return '';
  },
};
</script>
