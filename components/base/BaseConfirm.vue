<template>
  <div class="base-confirm" @click="toggleHandle">

    <div>
      <div class="base-confirm__tick">
        <base-icon class="base-confirm__checkbox" v-show="value">checkbox</base-icon>
      </div>
    </div>

    <div class="base-confirm__text" :class="{'base-confirm__text-black': blackText}">
      <slot/>
    </div>

  </div>
</template>

<script>
export default {
  name: "BaseConfirm",
  props: {
    value: {
      type: Boolean
    },
    blackText: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleHandle() {
      this.$emit('input', !this.value);
    }
  }
}
</script>

<style lang="scss" scoped>
$checkboxSize: 24px;

.base-confirm {
  display: grid;
  grid-column-gap: 12px;
  grid-template-columns: $checkboxSize 1fr;
  border-radius: $border-radius__little;
  cursor: pointer;

  &__tick {
    height: $checkboxSize;
    width: $checkboxSize;
    border-radius: 6px;
    overflow: hidden;
    background: $color__background-primary;
  }

  &__text {
    color: $color__font-secondary;
    font-size: $fs__default;
    &-black {
      color: $color__font-primary;
    }
  }

  &__checkbox {
    width: inherit;
    height: inherit;
  }

}
</style>
