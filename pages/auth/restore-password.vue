<template>
  <div class="restore-password">

    <div class="restore-password__window" @keyup.enter="enterHandle">

      <div class="restore-password__head">
        <h1 class="restore-password__title">Восстановление пароля</h1>
        <nuxt-link class="only-desktop" to="/auth/login">Войти</nuxt-link>
      </div>

      <div class="restore-password__description">{{ stepDescription[step] }}</div>

      <!-- STEP 1 (EMAIL) -->
      <slide>
      <div class="restore-password__main" v-if="step === 1">
        <base-input
          class="restore-password__input"
          placeholder="E-mail"
          v-model="email"
          :error="errors['email']"
        />
      </div>
      </slide>

      <!-- STEP 2 (CODE) -->
      <slide>
      <div class="restore-password__main" v-if="step === 2">
        <base-input
          class="restore-password__input"
          placeholder="Код"
          v-model="code"
          :error="errors['code']"
        />
      </div>
      </slide>

      <!-- STEP 3 (NEW PASSWORD) -->
      <slide>
      <div class="restore-password__main" v-if="step === 3">
        <base-input
          class="restore-password__input"
          placeholder="Новый пароль"
          v-model="passwordForm.password"
          password
        />
        <base-input
          class="restore-password__input"
          placeholder="Повторите новый пароль"
          v-model="passwordForm.password_repeat"
          password
        />
      </div>
      </slide>

      <div class="restore-password__actions">
        <base-button class="restore-password__back" variant="back" @click="backStep"><- Назад</base-button>
        <base-button
            v-if="step !== 3"
            :class="{disabled: !canNextStep}"
            v-loading.mini="loading"
            variant="next"
            @click="nextStep"
        >Продолжить</base-button>
        <base-button
            v-if="step === 3"
            :class="{disabled: !canNextStep}"
            v-loading.mini="loading"
            variant="next"
            @click="savePassword"
        >Сохранить и войти</base-button>
      </div>

      <div class="restore-password__login-mobile">
        <nuxt-link class="only-mobile" to="/auth/login">Войти</nuxt-link>
      </div>
    </div>

  </div>
</template>

<script>
import BaseInput from "../../components/base/BaseInput";
import BaseButton from "../../components/base/BaseButton";
import Slide from "../../components/transitions/Slide";
import {mapActions} from "vuex";
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
  name: "restore-password",
  components: {Slide, BaseButton, BaseInput},
  layout: "empty",
  data: () => ({
    loading: false,
    email: null,
    code: null,
    passwordForm: {
      password: null,
      password_repeat: null,
    },
    errors: {},
    errorMessageEmail: null,
    errorMessageCode: null,
    step: 1,
    stepDescription: {
      1: "Укажите ваш e-mail от вашего аккаунта на “Pana work” На эту почту мы пришлём ссылку для сброса пароля",
      2: "Придумайте новый пароль",
    }
  }),
  validations: {
    email: {required,email},
    code: {required},
    passwordForm: {
      password: {required, minLength: minLength(5)},
      password_repeat: {sameAs: sameAs("password")}
    }
  },
  computed: {
    canNextStep() {
      if (this.step === 1) {
        this.$v.email.$touch();
        return !this.$v.email.$anyError;
      }
      else if (this.step === 2) {
        this.$v.code.$touch();
        return !this.$v.code.$anyError;
      }
      else if (this.step === 3) {
        this.$v.passwordForm.$touch();
        return !this.$v.passwordForm.$anyError;
      }
      return true;
    }
  },
  methods: {
    ...mapActions({
      restoreSendCode: "auth/restoreSendCode",
      restoreCheckCode: "auth/restoreCheckCode",
      restoreSetPassword: "auth/restoreSetPassword"
    }),
    clearErrors() {
      this.errors = {};
      this.errorMessageEmail = null;
      this.errorMessageCode = null;
    },
    backStep() {
      this.clearErrors();
      if (this.step > 1) this.step--;
      else this.$router.push("/auth/login");
    },
    enterHandle() {
      if (!this.canNextStep) return;

      if (this.step !== 3) this.nextStep();
      else this.savePassword();
    },
    async nextStep() {
      if (this.step === 1) {
        this.loading = true;
        this.clearErrors();
        await this.restoreSendCode({
          email: this.email,
          successCallback: () => {this.step++},
          errorCallback: (errors) => {this.errors = errors}
        });
        this.loading = false;
      }
      else if (this.step === 2) {
        this.loading = true;
        this.clearErrors();
        await this.restoreCheckCode({
          email: this.email,
          code: this.code,
          successCallback: () => {this.step++},
          errorCallback: (errors) => {this.errors = errors}
        })
        this.loading = false;
      }
    },
    async savePassword() {
      this.loading = true;
      await this.restoreSetPassword({
        password: this.passwordForm.password,
      });
      this.loading = false;
      this.$router.push("/auth/login");
    },
  }
}
</script>

<style lang="scss" scoped>
.restore-password {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media(max-width: $break-point__mobile) {
    align-items: flex-start;
    padding-top: 100px;
  }

  &__window {
    max-width: 448px;
    width: 95%;
    background: white;
    border-radius: $border-radius__big;
    padding: 32px;
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

  &__description {
    margin-top: 8px;
    color: $color__font-secondary;
    text-align: left;
  }

  &__input {
    margin-top: 16px;
  }

  &__back {
    @media(max-width: $break-point__mobile) {
      margin-top: 8px;
    }
  }

  &__actions {
    margin-top: 24px;
    display: flex;
    justify-content: space-between;

    @media(max-width: $break-point__mobile) {
      flex-direction: column-reverse;
    }
  }

  &__login-mobile {
    margin-top: 12px;
  }
}
</style>
