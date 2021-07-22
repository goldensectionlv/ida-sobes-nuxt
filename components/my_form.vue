<template>

  <form @submit.prevent="form_submit">
    <div class="form-header">
      Оформить заказ
    </div>
    <div class="form-group">
      <label for="username"/>
      <input id="username"
             type="text"
             class="form-item"
             :class="$v.form.username.$error ? 'invalid-input' : ''"
             v-model.trim="form.username"
             placeholder="Ваше имя"
      >
      <span
        class="invalid-text"
        v-if="$v.form.username.$dirty && !$v.form.username.required"
      >
        Обязательное поле
      </span>
    </div>

    <div class="form-group">
      <label for="phone"/>
      <input
        id="phone"
        type="text"
        class="form-item"
        :class="$v.form.phone.$error ? 'invalid-input' : ''"
        v-model.trim.lazy="form.phone"
        placeholder="Телефон"
        v-phone
      >
      <span
        class="invalid-text"
        v-if="$v.form.phone.$dirty && !$v.form.phone.required && !$v.form.phone.minLength"
      >
        Обязательное поле
      </span>
      <span
        class="invalid-text"
        v-if="$v.form.phone.$dirty && !$v.form.phone.minLength"
      >
        Не до конца введен телефон
      </span>
    </div>
    <div class="form-group">
      <label for="address"/>
      <input
        id="address"
        type="text"
        class="form-item"
        :class="$v.form.address.$error ? 'invalid-input' : ''"
        v-model.trim="form.address"
        placeholder="Адрес"
      >
      <span
        class="invalid-text"
        v-if="$v.form.address.$dirty && !$v.form.address.required"
      >Обязательное поле
      </span>
    </div>

    <div>
      <button type="submit" class="form-btn">Отправить</button>
    </div>

    <div
      class="form-alert"
      v-if="$v.form.$error"
    >
      <div class="form-alert-signs">!!</div>
      Все поля обязательные. После удачной отправки формы содержимое корзины очищается
    </div>
  </form>

</template>

<script>

import {validationMixin} from 'vuelidate'
import {required, minLength} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data() {
    return {
      form: {
        username: '',
        phone: '',
        address: '',
      },
    }
  },
  validations: {
    form: {
      username: {required},
      phone: {required, minLength: minLength(16)},
      address: {required}
    }
  },
  methods: {
    form_submit() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        this.$store.dispatch('send_order', {
          username: this.username,
          phone: this.phone,
          address: this.address,
          order: this.$store.getters['basket/basket_list']
        })
        localStorage.removeItem('basket_data')
        this.$store.dispatch('basket/local_storage_request')
        this.$store.dispatch('basket/is_thanks_active_switcher', true)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.form-header {
  font-weight: 400;
  font-size: 18px;
  color: $grey;
  margin: 32px 0 16px 0;
}

.form-group {
  width: 100%;
  margin-bottom: 16px;
}

.form-item {
  height: 50px;
  width: 100%;
  border-radius: 8px;
  border: none;
  padding: 15px 14px;
  outline: none;
}

.invalid-input {
  border: 1px solid $red;

}

.form-btn {
  height: 50px;
  width: 100%;
  border-radius: 8px;
  background-color: $black;
  color: $white;
  border: none;
  cursor: pointer;
}

.form-btn:hover {
  background-color: $grey;
}

.invalid-text {
  font-weight: 900;
  font-size: 8px;
  color: $red;
  margin-top: 6px;
}

.form-alert {
  @include regular_text;
  display: flex;
  margin-top: 32px;
}

.form-alert-signs {
  font-size: 32px;
  font-weight: bold;
  color: $red;
  margin-right: 8px;
  margin-top: -6px;

}
</style>
