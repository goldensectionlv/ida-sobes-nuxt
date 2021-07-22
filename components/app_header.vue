<template>
  <div>
    <span class="appHeader__testList">TestList</span>

    <div class="appHeader__icon-container">
      <div class="appHeader__icon-container__counter"
           @click="open"
      >
        {{ total }}
      </div>

      <div @click="open">
        <app_icon
          :basket="true"
          :zoom="true"
          :is_btn="true"
          width="24px"
          height="27px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import app_icon from "@/components/ui/app_icon";

export default {
  computed: {
    basket_list() {
      return this.$store.getters['basket/basket_list']
    },
    total: function () {
      let total_items = 0
      this.basket_list.map(item => {
        total_items += item.quantity
      })
      return total_items
    }
  },
  components: {
    app_icon
  },
  methods: {
    open() {
      console.log('click')
      this.$store.dispatch('basket/open_or_close_basket', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.appHeader {
  &__testList {
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 28px;
    color: $grey;
  }

  &__icon-container {
    position: relative;

    &__counter {
      @include flex-align-center;
      width: 15px;
      height: 15px;
      right: 0;
      position: absolute;
      border-radius: 50%;
      background-color: $grey-light;
      font-size: 8px;
      font-weight: 700;
      color: $white;
      z-index: 1;
      transform: translate(40%, -40%);
      cursor: pointer;
    }
  }
}
</style>
