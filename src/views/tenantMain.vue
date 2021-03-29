<template>

</template>

<script>
export default {
  name: "tenantMain",
  created() {
    this.userName=window.sessionStorage.getItem('userName');
  },
}
</script>

<style scoped>

</style>
