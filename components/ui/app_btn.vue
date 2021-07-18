<template>
  <button
      :type="submit"
      class="btn zoom"
      :style="{
        backgroundColor: b_color,
        borderRadius: border_radius,
        color: color,
      }"
      @click="action"
  >
    {{ btn_text }}
  </button>
</template>

<script>
export default {
  props: {
    btn_text: String,
    action: {
      type: Function,
      default: () => {
      }
    },
    b_color: {
      type: String,
      default: 'black'
    },
    border_radius: {
      type: String,
      default: '8px'
    },
    color: {
      type: String,
      default: 'white'
    },
    submit: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 14px;
  height: 50px;
  outline: none;
  border: none;
}

.zoom {
  -ms-transform: scale(1.00); /* IE 9 */
  -webkit-transform: scale(1.00); /* Safari 3-8 */
  transform: scale(1.00);
  transition: 200ms ease-out;
  @include zoom_hover(1.01);
}


</style>
