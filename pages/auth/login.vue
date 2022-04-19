<template>
  <div class="login-page">

    <div class="login-page__window">

      <div class="login-page__head">
        <h1 class="login-page__title">Вход в систему</h1>
        <nuxt-link class="login-page__registration only-desktop" to="/auth/registration">Зарегистрироваться</nuxt-link>
      </div>

      <div class="login-page__main" @keyup.enter="loginHandle">

        <base-input
          class="login-page__input"
          placeholder="Логин"
          v-model="form.email"
          :error="errorMessage"
        />
        <base-input
          class="login-page__input"
          placeholder="Пароль"
          v-model="form.password"
          :error="errorMessage"
          password
        />

        <div class="login-page__forgot-password-mobile only-mobile">
          <nuxt-link to="/auth/restore-password">Забыли пароль?</nuxt-link>
        </div>

        <base-button
          class="login-page__login-button"
          :class="{disabled: !canSubmit}"
          v-loading.mini="loading"
          variant="next"
          @click="loginHandle"
        >Войти</base-button>
        <div class="login-page__registration-mobile only-mobile">
          <nuxt-link to="/auth/registration">Зарегистрироваться</nuxt-link>
        </div>

        <div class="login-page__forgot-password only-desktop">
          <nuxt-link to="/auth/restore-password">Забыли пароль?</nuxt-link>
        </div>
      </div>

      <div class="login-page__agreement">
        Продолжая, я даю согласие на обработку и передачу персональных данных и принимаю условия <a>пользовательского соглашения</a>
      </div>
    </div>

  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseButton from "@/components/base/BaseButton";

import {mapActions, mapGetters} from "vuex";

export default {
  name: "auth",
  components: {BaseButton, BaseInput},
  layout: "empty",
  data: () => ({
    form: {
      email: null,
      password: null
    },
    errorMessage: null,
    loading: false,
  }),
  computed: {
    ...mapGetters({
      token: "auth/getToken",
    }),
    canSubmit() {
      return this.form.email && this.form.password;
    }
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    async loginHandle() {
      console.log(this.form)
      if (!this.canSubmit) return;
      this.loading = true;
      await this.login({
        user:this.form
          }
      );
      this.loading = false;
      this.clear();
      if (this.token) this.$router.push("/")
      else this.errorMessage = "Вы ввели неправильные данные";
    },
    clear() {
      this.form = {login: null, password: null};
    },
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media(max-width: $break-point__mobile) {
    align-items: flex-start;
    padding-top: 100px;
    height: calc(100% - 100px);
  }

  &__window {
    $padding: 32px;
    max-width: 448px;
    width: calc(95% - 2*$padding);
    background: white;
    border-radius: $border-radius__big;
    padding: $padding;
    text-align: center;
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: $fs__middle;
  }

  &__input {
    margin-top: 16px;
  }

  &__login-button {
    margin-top: 24px;
  }

  &__forgot-password {
    margin-top: 16px;
    a {
      color: $color__font-secondary;
      text-decoration: none;
    }
  }

  &__forgot-password-mobile {
    margin-top: 16px;
    text-align: right;
    a {
      color: $color__font-secondary;
      text-decoration: none;
    }
  }

  &__agreement {
    margin-top: 16px;
    text-align: left;
    color: $color__font-secondary;
    font-size: $fs__mini;
    a {color: $color__orange;}
    @media(max-width: $break-point__mobile) {
      text-align: center;
    }
  }

  &__registration-mobile {
    margin-top: 12px;
    a {
      color: $color__orange;
      text-decoration: none;
    }
  }
}
</style>
