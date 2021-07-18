<template>
  <div
      class="basket_container"
      v-show="basket_active"
  >
    <transition
        name="slide"
        mode="out-in"
        :key="basket_active"
    >
      <div
          class="basket_container__basket"
          v-if="basket_active"
      >
        <!--        basket header-->
        <div style="display: flex; align-items: center; justify-content: space-between">
          <text_item
              text="Корзина"
              :is_h1="true"
              :regular="false"
          />
          <app_icon
              :close="true"
              :zoom="true"
              :is_btn="true"
              width="14px"
              height="14px"
              :action="close"
          />
        </div>
        <!--        basket body products-->
        <div style="margin: 24px 0">
          <div v-if="!basket_list.length && !is_thanks_active"
          >
            <text_item
                style="margin: 24px 0"
                text="Пока что вы ничего не добавили в корзину."
            />
            <!--        basket btn-->
            <app_btn
                style="margin: 24px 0"
                btn_text="Перейти к выбору"
                :action="close"
            />
          </div>

          <transition-group name="basket_items_animation" v-else>
            <basket_item
                v-for="(product, index) in basket_list" :key="product.id"
                :product="product"
                :index="index"
                :action="delete_from_cart"
            />
          </transition-group>
        </div>

        <!--        form-->
        <my_form v-if="basket_list.length"/>

        <!--thanks-->
        <div
            class="basket_container__thanks"
            v-if="!basket_list.length && is_thanks_active"
        >
          <img :src="require('@/assets/ok-hand-sign.svg')" alt="thanks" style="margin-bottom: 24px;">
          <span class="basket_container__thanks__1">Заявка успешно отправлена</span>
          <span class="basket_container__thanks__2">Вскоре наш менеджер свяжется с Вами</span>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
import app_btn from "@/components/ui/app_btn";
import app_icon from "@/components/ui/app_icon";
import basket_item from "@/components/ui/basket_item";
import text_item from "@/components/ui/text_item";
import my_form from "@/components/my_form";

export default {
  components: {
    app_btn,
    app_icon,
    basket_item,
    text_item,
    my_form
  },
  computed: {

    basket_active() {
      return this.$store.getters['basket/basket_active']
    },
    basket_list() {
      return this.$store.getters['basket/basket_list']
    },
    is_thanks_active() {
      return this.$store.getters['basket/is_thanks_active']
    }
  },

  methods: {
    delete_from_cart(id) {
      this.$store.dispatch('basket/delete_from_cart', id)
    },
    local_storage_request() {
      this.$store.dispatch('basket/local_storage_request')
    },
    is_thanks_active_switcher() {
      this.$store.dispatch('basket/is_thanks_active_switcher')
    },
    close() {
      this.$store.dispatch('basket/open_or_close_basket', false)
    },
  }
}
</script>

<style lang="scss" scoped>
.basket_container {
  font-family: $main-font;
  width: 100vw;
  height: 100vh;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(255, 255, 255, .8);
  z-index: 2;

  &__basket {
    width: 460px;
    background-color: $white;
    height: 100%;
    overflow-y: scroll;
    padding: 52px;
  }

  &__thanks {
    @include flex-align-center;
    flex-direction: column;
    height: 85%;
    width: 100%;

    &__1 {
      font-size: 24px;
      font-weight: bold;
      color: $black;
    }

    &__2 {
      @include regular_text;
      color: $grey;
    }
  }
}


.slide-enter-active {
  transition: 300ms;
}

.slide-enter {
  transform: translate(100%, 0);
  opacity: 1;
}

.slide-leave-to {
  transform: translate(-100%, 0);
  opacity: 1;
}

.basket_items_animation-item {
  display: inline-block;
  margin-right: 10px;
}

.basket_items_animation-enter-active, .basket_items_animation-leave-active {
  transition: all 300ms;
}

.basket_items_animation-enter, .basket_items_animation-leave-to /* .list-leave-active до версии 2.1.8 */
{
  opacity: 0;
  transform: translateX(30px);
}
</style>
