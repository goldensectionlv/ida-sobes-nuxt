<template>
  <div
      class="zoom"
  >
    <div
        class="wrapper"
    >
      <!--      star-->
      <div
          class="wrapper__buttons-area"
      >
        <ratings
            :rating="product.rating"
        />
        <div
            @mouseenter="card_hover = true"
            @mouseleave="card_hover = false"
            @click="action(product)"
        >
          <app_icon
              :basket="true"
              :is_btn="true"
              :zoom="true"
              width="12px"
              height="13px"
              :color="card_hover || cart_ids.includes(product.id) ? 'black' : 'grey'"
          />
        </div>
      </div>
      <!--      photo-->
      <div
          class="wrapper__details"
      >
        <product_photo
            class="wrapper__details__photo"
            :photo_link="'https://frontend-test.idaproject.com' + product.photo"
            :alt="product.name"
        />
        <!--        title-->
        <div
            class="wrapper__details__title-container"
        >
          <text_item
              :text="product.name.toLowerCase().split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ') + ' ' + product.id"
              class="wrapper__details__title-container__name"
          />
          <text_item
              :text="product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')"
              :symbol="true"
              class="wrapper__details__title-container__price"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import text_item from "@/components/ui/text_item";
import app_icon from "@/components/ui/app_icon";
import product_photo from "@/components/ui/product_photo";
import ratings from "@/components/ui/ratings";

export default {
  data() {
    return {
      card_hover: false
    }
  },
  components: {
    product_photo,
    text_item,
    app_icon,
    ratings
  },
  props: {
    product: Object,
    action: {
      type: Function,
      default: () => {
      }
    },
    cart_ids: {
      type: Array,
      default: () => []
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  padding-bottom: 103%;
  position: relative;
  border-radius: 8px;
  cursor: pointer;

  &__buttons-area {
    @include flex-align-center-space-between;
    position: absolute;
    width: 100%;
    margin-top: 13px;
    padding: 16px;
    z-index: 1;
  }

  &__details {
    @include flex-column;
    width: 100%;
    height: 100%;
    margin-top: 18px;
    position: absolute;

    &__photo {
      width: 65%;
      align-self: center
    }

    &__title-container {
      @include flex-column;
      width: 100%;
      padding: 16px;
      justify-content: center;

      &__name {
        font-weight: normal;
        font-size: .83vw;
        color: $grey;
      }

      &__price {
        font-size: .83vw;
        font-weight: bold;
        color: $black;
        margin-top: 6px;
      }
    }
  }
}

@media (max-width: 1124px) {
  .wrapper__details__title-container__name {
    font-size: 12px;
  }

  .wrapper__details__title-container__price {
    font-size: 12px;
  }
}

@media (max-width: 700px) {
  .wrapper__details__title-container__name {
    font-size: 14px;
  }

  .wrapper__details__title-container__price {
    font-size: 14px;
  }
}

.zoom {
  -ms-transform: scale(1.00); /* IE 9 */
  -webkit-transform: scale(1.00); /* Safari 3-8 */
  transform: scale(1.00);
  transition: 200ms ease-out;
}

.zoom:hover {
  -ms-transform: scale(1.03); /* IE 9 */
  -webkit-transform: scale(1.03); /* Safari 3-8 */
  transform: scale(1.03);
  transition: 200ms ease-out;
}
</style>
