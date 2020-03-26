<script>
export default {
  async created() {
    try {
      await this.$fireAuth.signOut();
    } catch (e) {}

    this.$router.push({
      path: '/login',
    });
  },

  render: () => {
    return '';
  }
};
</script>
