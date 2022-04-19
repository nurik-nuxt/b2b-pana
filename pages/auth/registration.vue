<template>
  <div class="registration-page">

    <div class="registration-page__window" @keyup.enter="enterHandle">

      <div class="registration-page__head">
        <h1 class="registration-page__title">Регистрация</h1>
        <nuxt-link class="registration-page__login" to="/auth/login">Войти</nuxt-link>
      </div>

      <div class="registration-page__steps">
        Шаг {{step}}/2 ({{ stepDescription[step] }})
      </div>

      <!-- STEP 1 -->
      <Slide>
      <div class="registration-page__main" v-if="step === 1">
        <base-input
          class="registration-page__input"
          placeholder="Как вас зовут?"
          :error="errors['first_name']"
          :is-error="!!errorMessage"
          v-model="userForm.first_name"
        />
        <BaseSelect
          placeholder="Город проживания"
          class="registration-page__input"
          :dictionary="Dictionary.cities"
          :dictionary-payload="{country_id:8}"
          valueField="name"
          :error="errors['city']"
          :is-error="!!errorMessage"
          v-model="userForm.city"
        />
        <base-input
          class="registration-page__input"
          is-mask
          masked
          :placeholder="'+7 (___) ___ __ __'"
          :is-error="!!errorMessage"
          :error="errors['phone_number']"
          v-model="userForm.phone_number"
        />
        <base-input
          class="registration-page__input"
          placeholder="Имя организации"
          :is-error="!!errorMessage"
          :error="errors['organization']"
          v-model="userForm.organization"
        />
        <base-input
          class="registration-page__input"
          placeholder="Какую должность вы занимаете?"
          :is-error="!!errorMessage"
          :error="errors['position']"
          v-model="userForm.position"
        />
      </div>
      </Slide>

      <!-- STEP 2 -->
      <Slide>
      <div class="registration-page__main" v-if="step === 2">
        <base-input
          class="registration-page__input"
          placeholder="Введите электронную почту"
          v-model="registrationForm.email"
          :is-error="!!errorMessage"
          :error="errors['email']"
        />
        <base-input
          class="registration-page__input"
          placeholder="Придумайте пароль"
          v-model="registrationForm.password"
          :is-error="!!errorMessage"
          password
          :error="errors['password']"
        />
        <base-input
          class="registration-page__input"
          placeholder="Повторите пароль"
          v-model="registrationForm.password_repeat"
          :is-error="!!errorMessage"
          :error="errors['password_repeat']"
          password
        />
      </div>
      </Slide>

      <Slide>
        <div class="registration-page__error" v-if="errorMessage">{{errorMessage}}</div>
      </Slide>

      <div class="registration-page__actions">
        <base-button
            variant="back"
            @click="backStep"
        ><- Назад</base-button>
        <base-button
            v-if="step !== 2"
            :class="{disabled: !canNextStep}"
            variant="next"
            @click="nextStep"
        >Продолжить</base-button>
        <base-button
            v-if="step === 2"
            :class="{disabled: !canNextStep}"
            variant="next"
            v-loading.mini="loading"
            @click="registrationHandle"
        >Зарегестрироваться</base-button>
      </div>

    </div>

  </div>
</template>

<script>
import BaseInput from "../../components/base/BaseInput";
import Slide from "../../components/transitions/Slide";

import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import {mapActions} from "vuex";
import BaseSelect from "@/components/base/BaseSelect";
import {Dictionary} from "@/store/dictionary";


export default {
  name: "registration",
  components: {BaseSelect, Slide, BaseInput},
  layout: "empty",
  data: () => ({
    Dictionary,
    step: 1,
    stepDescription: {
      1: "Ваши данные",
      2: "Входные данные",
    },

    registrationForm: {
      email: null,
      password: null,
      password_repeat: null,
      phone_number:null
    },

    userForm: {
      organization: null,
      position: null,
      first_name: null,
      city: null,
      phone_number: null
    },

    errorMessage: null,
    errors: {},
    loading: false,
  }),
  validations: {
    registrationForm: {
      email: { required, email },
      password: {required, minLength: minLength(5)},
      password_repeat: { sameAsPassword: sameAs('password')}
    },
    userForm: {
      organization: { required, minLength: minLength(2) },
      position: { required, minLength: minLength(2) },
      first_name: { required, minLength: minLength(2) },
      city: { required },
      phone_number: {required}
    }
  },
  methods: {
    ...mapActions({
      registration: "auth/registration",
    }),
    clearForms() {
      Object.keys(this.registrationForm).forEach(key => {
        this.registrationForm[key] = null;
      });
      Object.keys(this.userForm).forEach(key => {
        this.userForm[key] = null;
      });
    },
    enterHandle() {
      if (!this.canNextStep) return;

      if (this.step < 2) {
        this.nextStep();
      }
      else {
        this.registrationHandle();
      }
    },
    nextStep() {
      this.step++;
    },
    backStep() {
      if (this.step > 1) this.step--;
      else this.$router.push("/auth/login");
    },
    errorHandler(errors = null) {
      if (!errors) {
        this.errors = {};
        // this.errorMessage = null;
      }
      const key = Object.keys(errors)[0];
      if (["first_name", "city", "phone_number", "organization", "position"].includes(key)) {
        this.step = 1;
      }
      // this.errorMessage = errors[keys[0]];
      this.errors = errors;
    },
    async registrationHandle() {
      this.loading = true;
      this.errorMessage = null;
      // this.registrationForm.phone_number =
      this.registrationForm.phone_number = this.userForm.phone_number
      console.log(this.registrationForm)
      console.log(this.userForm)
      await this.registration({
        userForm: this.userForm,
        registrationForm: this.registrationForm,
        successCallback: () => {
          this.$router.push("/");
          this.loading = false;
        },
        errorCallback: errors => {
          // console.log("ERROR", errors);
          this.errorHandler(errors);
          this.loading = false;
        },
      });
    },
  },
  computed: {
    canNextStep() {
      if (this.step === 1) {
        this.$v.userForm.$touch();
        return !this.$v.userForm.$anyError;
      }

      if (this.step === 2) {
        this.$v.registrationForm.$touch();
        return !this.$v.registrationForm.$anyError;
      }

      return true;
    }
  }
}
</script>

<style lang="scss" scoped>
.registration-page {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media(max-width: $break-point__mobile) {
    align-items: flex-start;
    padding-top: 100px;
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

  &__steps {
    margin-top: 8px;
    text-align: left;
    color: $color__font-secondary;
    font-size: $fs__default;
  }

  &__input {
    margin-top: 16px;
  }

  &__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }

  &__error {
    margin-top: 12px;
    color: $color__error;
    font-size: $fs__default;
  }
}
</style>
