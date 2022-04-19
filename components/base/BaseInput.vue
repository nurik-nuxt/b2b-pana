<template>
  <div class="base-input">
    <h1 class="base-input__title" v-if="title">{{ title }}</h1>
    <p class="base-input__status" v-if="status">(Необязательно)</p>
    <div class="base-input__input-wrapper">
    <input
      class="base-input__input"
      :class="[
        {'base-input--error': error || isError}
       ]"
      :value="value"
      :placeholder="placeholder"
      :type="inputType"
      v-if="!isMask"
      @input="inputHandle($event.target.value)"
      @keypress="enterValue($event)"
      @focus="onFocused"
    />
      <TheMask
        v-else
        :mask="mask"
        :type="inputType"
        :value="value"
        :masked="masked"
        ref="input"
        :placeholder="inputPlaceholder"
        class="base-input__input"
        :class="[
        {'base-input--error': error || isError}
       ]"
        @focus.native="showPlaceholder = true"
        @blur.native="showPlaceholder = true"
        @input="inputHandle($event)"
        @keypress="enterValue($event)"
      />

    <!-- show password -->
    <base-icon
      class="base-input__show-password"
      v-if="password"
      @mousedown="setShowPassword(true)"
      @touchstart="setShowPassword(true)"
      @mouseup="setShowPassword(false)"
      @mouseleave="setShowPassword(false)"
      @touchend="setShowPassword(false)"
    >eye-password</base-icon>
    </div>

    <Slide>
      <p class="base-input__message" v-if="message">{{ message }}</p>
      <div class="base-input__error-message" v-if="error">
        {{ error }}
      </div>
    </Slide>

  </div>
</template>

<script>
import Slide from "../transitions/Slide";
import { TheMask } from 'vue-the-mask'
export default {
  name: "BaseInput",
  components: {Slide, TheMask},
  data: () => ({
    showPassword: false,
    showPlaceholder: true
  }),
  props: {
    value: {
      type: [String, Number],
    },
    placeholder: {
      type: String,
      default: ""
    },
    password: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    },
    isError: {
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: null
    },
    message:{
      type: String,
      default: null
    },
    status: {
      type: Boolean,
      default: false
    },
    mask: {
      type: [String,Array],
      default: "+7 (###) ###-##-##"
    },
    masked: {
      type: Boolean,
      default: false
    },
    isMask: {
      type:Boolean,
      default: false
    },
    isOnlyNumber: {
      type:Boolean,
      default:false
    }
  },
  computed: {
    inputType() {
      if (this.password) return this.showPassword ? "text" : "password";
      return this.type;
    },
    inputPlaceholder(){
      return this.showPlaceholder ? this.placeholder : ""
    },
  },
  methods: {
    inputHandle(rawValue) {
      let value = rawValue;
      if (this.type === 'number')
        value = parseInt(value);

      this.$emit('input', value);
      this.$emit('onInput', value);
    },
    setShowPassword(bool) {
      this.showPassword = bool;
    },
    enterValue(evt) {
      if (this.isOnlyNumber){
        let charCode = evt.which ? evt.which : evt.keyCode;
        if (
          charCode > 31 &&
          (charCode < 48 || charCode > 57) &&
          charCode !== 46
        ) {
          evt.preventDefault();
        }
      }
    },
    onFocused(){
      this.error = null
      // console.log("There is focus on input")
    }
  },
}
</script>

<style lang="scss" scoped>
*:focus{
  border: 2px solid #5684FB;
}
.base-input {
  width: 100%;
  $padding: 16px;

  &__input-wrapper {
    position: relative;
  }

  &__input {
    height: calc(48px - 2*$padding);
    width: calc(100% - 2*$padding);
    padding: $padding;
    border-radius: $border-radius__little;
    background: #F8F8F8;
    font-size: $fs__default;
    transition: .3s;
    &:focus{
      border: 2px solid #5684FB;
      background: #f7f9ff;
      &::placeholder {
        color: #5684FB;
      }
    }
  }
  &__title{
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #111111;
    margin-bottom: 8px;
  }
  &__status{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    color: #777777;
    margin-bottom: 8px;
  }
  &__message{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 140%;
    color: #777777;
    margin-top: 8px;
  }

  &__show-password {
    $size: 24px;
    height: $size;
    min-width: $size;
    width: $size;
    position: absolute;
    top: calc(50% - $size/2);
    right: $padding;
    cursor: pointer;
    z-index: 1;
  }

  &__error-message {
    padding-top: 5px;
    color: $color__error;
    text-align: left;
    font-size: $fs__mini;
  }

  &--error {
    border: 1px solid $color__error;
    background: $color__error-light;
    &::placeholder {
      color: $color__error;
    }
  }

}
</style>
