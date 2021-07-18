<template>
  <div
  >
    <div style="width: 100%; padding-bottom: 100%; position: relative">
      <div style="width: 100%; height: 100%; position: absolute">
        <img :src="photo_link"
             :alt="alt"
             style="width: 100%; height: 100%"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    photo_link: String,
    alt: String
  }

}
</script>

<style scoped>

</style>
