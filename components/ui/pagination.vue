<template>
  <div>
    <div
        class="number_of_page_item"
        v-for="page of pageCount" :key="page"
        :class="pageNumber === page-1 ? 'active_page' : ''"
        @click="action({arr: items_array, pageNumber: page-1})"
    >
      {{ page }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items_array: Array,
    action: Function,
    pageCount: Number,
    pageNumber: Number
  }
}
</script>

<style lang="scss" scoped>
.active_page {
  color: $red;
}

.number_of_page_item {
  @include flex-align-center;
  width: 50px;
  height: 50px;
  margin: 30px 1%;
  border: 2px solid $black;
  border-radius: 3px;
  cursor: pointer;
}
</style>
