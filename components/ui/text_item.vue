<template>
  <span
      :class="[
          is_h1 ? 'h1_class' : '',
          disabled ? 'disabled' : '',
          regular ? 'regular' : '',
          ]"
      @click="action(...args)"
  >
    {{text}} <span v-if="symbol">&#8381;</span>
  </span>
</template>

<script>
export default {
  props: {
    text: String,
    disabled: {
      type: Boolean,
      default: false
    },
    is_h1: {
      type: Boolean,
      default: false
    },
    regular: {
      type: Boolean,
      default: true
    },
    font_size: {
      type: String,
      default: "16px"
    },
    action: {
      type: Function,
      default: () => {}
    },
    args: {
      type: Array,
      default: () => {}
    },
    symbol: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.h1_class {
  font-family: $main-font;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 41px;
  color: $black;
}
.disabled {
  color: $grey-light;
}
.regular {
  @include regular_text;
}
</style>
