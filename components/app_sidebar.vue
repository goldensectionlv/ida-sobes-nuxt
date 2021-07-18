<template>
  <div>
    <span
      class="category"
      v-for="category in product_categories"
      :key="category.id"
      :class="category.active ? 'active_category' : ''"
      @click="category_on_click(category.id)"
    >
      {{ category.name }}
    </span>

  </div>
</template>

<script>

export default {

  computed: {
    product_categories() {
      return this.$store.state.product_categories
    },
    modal_filter() {
      return this.$store.state.modal_filter
    },
    product_list() {
      return this.$store.state.product_list
    }
  },
  methods: {
    async category_on_click(id) {
      await this.$router.push('/categories/' + id)

    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  margin-bottom: 16px;
  cursor: pointer;
  clear: $black;
}

.category:hover {
  color: $grey-light;
}

.active_category {
  text-decoration-line: underline;
}
</style>
