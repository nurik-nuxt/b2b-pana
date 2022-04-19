<template>
  <div :class="[{'btn--auto-width': autoWidth}]">
    <NuxtLink class="button-text" :to="url" v-if="url">
      <component
        :class="['btn', `btn--${variant}`, buttonClass, {'btn--auto-width': autoWidth}]"
        v-bind="$attrs"
        v-on="$listeners"
        :is="tag"
      >
        <slot>Найти</slot>
      </component>
    </NuxtLink>
    <div v-if="!url">
      <component
        :class="['btn', `btn--${variant}`, buttonClass]"
        v-bind="$attrs"
        v-on="$listeners"
        :is="tag"
      >
        <slot>Найти</slot>
      </component>
    </div>
  </div>
</template>

<script>
export default {
  name:"BaseButton",
  props:{
    url:{
      type:[String,Boolean],
      default:false
    },
    variant: {
      type: String,
      default: "default",
      validator: function (value) {
        return (
          [
            "default",
            "next",
            "cancel",
            "back"
          ].includes(value)
        );
      },
    },
    buttonClass: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "button",
    },
    autoWidth: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
.btn{
  border-radius: 12px;
  line-height: 24px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 56px;
  text-decoration: none;
  font-size: $fs__default;
  transition: .15s;
  width: 100%;

  &:hover {
    opacity: .9;
  }

  &:active {
    opacity: .8;
  }

  &--next{
    background: #FB6B56;
    color: #FFFFFF;
    padding: 14px 24px;
  }

  &--back {
    //width: 100%;
    max-width: 140px;
    background: #FFFFFF;
    border-radius: $border-radius__middle;
    padding: 17px 34px;
  }

  &--cancel{
    border: 1px solid #FB6B56;
    color: #FB6B56;
    padding: 17px 34px;
  }

  &--auto-width {
    width: 100% !important;
  }

  &:disabled {
    opacity: .5;
    pointer-events: none;
    cursor: not-allowed;
  }
}
.button-text{
  text-decoration: none;
}
</style>
