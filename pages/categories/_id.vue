<template>
  <div>
      <div
        :key="pageNumber"
        class="nested_wrapper"
      >
        <product_card
          v-for="product in current_page_arr" :key="product.id"
          class="nested_wrapper__product_card"
          :product="product"
          :action="add_to_cart"
          :cart_ids="cart_ids"
        />
      </div>
      <pagination
        v-show="product_list.length !==0"
        style="display: flex; align-items: center"
        :items_array="product_list"
        :page-count="pageCount"
        :page-number="pageNumber"
        :action="paginatedData"
      />
  </div>
</template>

<script>
import product_card from "@/components/product_card";
import pagination from "@/components/ui/pagination";

export default {
  data() {
    return {
      animation: false
    }
  },
  components: {
    product_card, pagination
  },
  async fetch({store, params}) {
    await store.dispatch('get_product_categories', params.id)
    console.log('get_from serve')
    if (Number(params.id) === Number(store.getters.product_categories[0].id)) {
      console.log('this is 1st category page from server')
      await store.dispatch('get_category_products', params.id)
      await store.dispatch('filter_by', store.getters.modal_filter.active_product_filter)
      await store.dispatch('pagination/paginatedData', {arr: store.getters.product_list, pageNumber: 0})
    }

  },
  computed: {
    product_list() {
      return this.$store.getters.product_list
    },
    current_page_arr() {
      return this.$store.getters['pagination/current_page_arr']
    },
    pageCount() {
      return this.$store.getters['pagination/pageCount']
    },
    modal_filter() {
      return this.$store.getters.modal_filter
    },
    pageNumber() {
      return this.$store.getters['pagination/pageNumber']
    },
    basket_list() {
      return this.$store.getters['basket/basket_list']
    },
    active_product_filter() {
      return this.$store.getters.modal_filter.active_product_filter
    },
    cart_ids: function () {
      let total_items = []
      this.basket_list.map(item => {
        total_items.push(item.id)
      })
      return total_items
    }
  },
  methods: {
    paginatedData(obj) {
      this.$store.dispatch('pagination/paginatedData', obj)
    },
    add_to_cart(product) {
      this.$store.dispatch('basket/add_to_cart', product)
    }
  },
  async mounted() {
    this.animation = false
    // В соответствии с заданием, эти данные не должны быть отрендерены на сервере
    if (Number(this.$route.params.id) !== Number(this.$store.getters.product_categories[0].id)) {
      await this.$store.dispatch('get_category_products', this.$route.params.id)
      await this.$store.dispatch('filter_by', this.active_product_filter)
      await this.$store.dispatch('pagination/paginatedData', {arr: this.product_list, pageNumber: 0})
    }
  }
}
</script>

<style lang="scss" scoped>
.nested_wrapper {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 1%;

  &__product_card {
    width: 24%;
    margin-right: 1%;
    margin-bottom: 1%;
    border-radius: 9px;
  }
}

@media (max-width: 1124px) {
  .nested_wrapper {
    padding-left: 2%;

    &__product_card {
      width: 30.66%;
      margin-right: 2%;
      margin-bottom: 2%;
    }
  }
}

@media (max-width: 900px) {
  .nested_wrapper {
    padding-left: 2%;

    &__product_card {
      width: 47%;
      margin-right: 2%;
      margin-bottom: 2%;
    }
  }
}

@media (max-width: 700px) {
  .nested_wrapper {
    padding-left: 2%;

    &__product_card {
      width: 96%;
      margin-right: 2%;
      margin-bottom: 2%;
    }
  }
}

</style>
