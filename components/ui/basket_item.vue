<template>
  <div class="basket_item">

    <!--    basket photo-->
    <product_photo
        :photo_link="'https://frontend-test.idaproject.com' + product.photo"
        :alt="product.name"
        style="width: 30%; align-self: center"
    />
    <!--    product info-->
    <div class="basket_item__info">
      <text_item
          :text="product.name.toLowerCase().split(/\s+/).map(word => word[0].toUpperCase()
          + word.substring(1)).join(' ')
          + ' ' + product.id + ' Кол-во ' + product.quantity"
      />
      <text_item
          :text="product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
          :symbol="true"
          style="font-weight: bold"
      />

      <ratings
          style="margin-top: 12px"
          :rating="product.rating"
      />


    </div>
    <!--    basket button-->
    <div
        style="align-self: center"
        @mouseenter="btn_hover = true"
        @mouseleave="btn_hover = false"
    >
      <app_icon
          :delete_icon="true"
          :is_btn="true"
          :zoom="true"
          width="20px"
          height="22px"
          :color="btn_hover ? 'black' : 'grey'"
          :action="delete_item"
      />
    </div>
  </div>
</template>

<script>
import product_photo from "@/components/ui/product_photo";
import app_icon from "@/components/ui/app_icon";
import text_item from "@/components/ui/text_item";
import ratings from "@/components/ui/ratings";

export default {
  data() {
    return {
      btn_hover: false
    }
  },
  components: {
    product_photo, app_icon, text_item, ratings
  },
  props: {
    product: Object,
    action: Function,
    index: Number,
  },
  methods: {
    delete_item() {
      this.action(this.index)
    }
  }
}
</script>

<style lang="scss" scoped>
.basket_item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 120px;
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 15px 25px;
  &__info {
    @include flex-column;
    width: 70%;
    font-size: 14px;
    padding: 0 15px;
    height: 100%;
  }
}

</style>
