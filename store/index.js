import api_requests from "@/store/api_requests";

export const state = () => ({
  product_categories: [],
  product_list: [],
  modal_filter: {
    active_product_filter: 'цене',
    filter_modal_active: false,
  },
  order_response: ''
})

export const mutations = {
  get_product_categories(state, data) {
    state.product_categories = []
    for (let category of data.categories_array.data) {
      let new_category = JSON.parse(JSON.stringify(category));
      new_category.active = Number(new_category.id) === Number(data.params_id)
      state.product_categories.push(new_category)
    }
  },
  get_category_products(state, response) {
    state.product_list = response
  },
  filter_by(state, option) {
    // console.log(option)
    if (option === 'id') {
      state.product_list.sort((a, b) => a.id - b.id)
      state.modal_filter.active_product_filter = option
    } else if (option === 'цене') {
      state.product_list.sort((a, b) => a.price - b.price)
      state.modal_filter.active_product_filter = option
    } else if (option === 'популярности') {
      state.product_list.sort((a, b) => b.rating - a.rating)
      state.modal_filter.active_product_filter = option
    }
  },
  open_or_close_filter_modal(state, is_active) {
    state.modal_filter.filter_modal_active = is_active
  },
  send_order(state, response) {
    state.response = response
  }
}

export const actions = {
  async get_product_categories({commit}, params_id) {
    const categories_array = await api_requests.get_product_categories()
    let data = {categories_array, params_id}
    commit('get_product_categories', data)
  },
  async get_category_products({commit}, id) {
    const response = await api_requests.get_category_products(id)
    commit('get_category_products', response.data)
  },
  async send_order({commit}, order) {
    const response = await api_requests.send_order(order)
    commit('send_order', response)
  },
  filter_by({commit}, option) {
    commit('filter_by', option)
  },
  open_or_close_filter_modal({commit}, is_active) {
    commit('open_or_close_filter_modal', is_active)
  },
}

export const getters = {
  product_categories: state => state.product_categories,
  product_list: state => state.product_list,
  modal_filter: state => state.modal_filter,
  animation: state => state.animation,
}
