<template>
  <div @mouseleave="$store.dispatch('open_or_close_filter_modal', false)">
    <span class="appTitle-header">Каталог</span>

    <div class="filter-container"
    >
      <div @click="open_or_close">
      <span class="filter-container__regular-text">
        Сортировать по:
      </span>

      <span class="filter-container__grey-text">
       {{ modal_filter.active_product_filter }}
      </span>
      </div>

      <transition
        name="slide"
        mode="out-in"
        :key="modal_filter.filter_modal_active"
      >
        <div
          v-if="modal_filter.filter_modal_active"
          class="filter-container__modal-filter"
        >
          <span
            class="filter-container__modal-filter__item"
            v-for="option in filter_options" :key="option.name"
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
    open_or_close() {
      if (this.modal_filter.filter_modal_active) {
        this.$store.dispatch('open_or_close_filter_modal', false)
      } else {
        this.$store.dispatch('open_or_close_filter_modal', true)
      }
    },
    option_click(option_name) {
      this.$store.dispatch('filter_by', option_name)
      this.$store.dispatch('pagination/paginatedData', {arr: this.product_list, pageNumber: 0})
      this.open_or_close()
    }
  }
}
</script>

<style lang="scss" scoped>
.appTitle-header {
  font-family: $main-font;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 41px;
  color: $black;
}

.filter-container {
  position: relative;
  user-select: none;
  cursor: pointer;

  &__regular-text {
    @include regular_text;
    user-select: none
  }

  &__grey-text {
    color: $grey-light;
    user-select: none
  }

  &__modal-filter {
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

    &__item:hover {
      color: $grey-light
    }
  }
}

.inactive-option {
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
