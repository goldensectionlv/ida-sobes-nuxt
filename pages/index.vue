<template>
  <div>
<!--    С этой страницы будет редирект на страницу первой с первой категорией товаров-->
  </div>
</template>

<script>
export default {
  async fetch({store}) {
    await store.dispatch('get_product_categories')
  },
  mounted() {
    this.$router.push(/categories/ + this.$store.getters.product_categories[0].id)
  }
}
</script>

<style lang="scss">

</style>
