<template>
  <div style="display: flex; align-items: center">
    <img v-if="rating === 1 || rating===0" :src="require('@/assets/1star.svg')" alt="">
    <img v-else-if="rating === 2" :src="require('@/assets/2star.svg')" alt="">
    <img v-else-if="rating === 3" :src="require('@/assets/3star.svg')" alt="">
    <img v-else-if="rating === 4" :src="require('@/assets/4star.svg')" alt="">
    <img v-else-if="rating === 5" :src="require('@/assets/5star.svg')" alt="">
    <span class="rating_num">{{rating}}</span>
  </div>
</template>

<script>
export default {
  props: {
    rating: {
      type: Number,
      default: 5
    }
  },
}
</script>

<style lang="scss" scoped>
.rating_num {
  color: $yellow;
  font-weight: bold;
  font-size: 10px;
}
</style>
