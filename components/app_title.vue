<template>
  <div @mouseleave="close">
    <span class="h1_class">Каталог</span>

    <div
      class="filter_container"
      @mouseenter="open"
    >
      <span class="filter_container__regular_text">
        Сортировать по:
      </span>

      <span class="filter_container__grey_text">
       {{ modal_filter.active_product_filter }}
      </span>

      <transition
        name="slide"
        mode="out-in"
        :key="modal_filter.filter_modal_active"
      >
        <div
          v-if="modal_filter.filter_modal_active"
          class="filter_container__modal_filter"
        >
          <span
            class="filter_container__modal_filter__item"
            v-for="option in filter_options" :key="option.name"
            :class="option.name !== modal_filter.active_product_filter ? 'inactive_option' : ''"
            @click="option.action"
          >
            {{ 'По ' + option.name }}
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter_options: {
        price: {
          name: 'цене', action: () => this.option_click('цене')
        },
        popularity: {
          name: 'популярности', action: () => this.option_click('популярности')
        }
      }
    }
  },
  computed: {
    modal_filter() {
      return this.$store.getters.modal_filter
    },
    product_list() {
      return this.$store.getters.product_list
    }
  },
  methods: {
    close() {
      this.$store.dispatch('open_or_close_filter_modal', false)
    },
    open() {
      this.$store.dispatch('open_or_close_filter_modal', true)
    },
    option_click(option_name) {
      this.$store.dispatch('filter_by', option_name)
      this.$store.dispatch('pagination/paginatedData', {arr: this.product_list, pageNumber: 0})
      this.close()
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

.filter_container {
  position: relative;
  cursor: pointer;

  &__regular_text {
    @include regular_text;
  }

  &__grey_text {
    color: $grey;
  }

  &__modal_filter {
    display: flex;
    flex-direction: column;
    position: absolute;
    background-color: $white;
    width: 100%;
    padding: 12px 12px 6px 12px;
    margin-top: 6px;
    border-radius: 8px;
    z-index: 1;

    &__item {
      margin-bottom: 6px;
      font-size: 14px;
    }
  }
}

.inactive_option {
  color: $grey-light
}

.slide-enter-active {
  transition: 100ms;
}

.slide-enter {
  transform: translate(0, 50%);
  opacity: 1;
}

.slide-leave-to {
  transform: translate(0, -50%);
  opacity: 1;
}
</style>
