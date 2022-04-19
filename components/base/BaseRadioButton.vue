<template>
  <div @click="selectHandle">
    <label class="radio">
      <input
        type="radio"
        :value="uniqueKey"
        :name="name || label || ''"
      />
      <span class="radio__checkmark" :class="{'active': value === uniqueKey}">
        <span/>
      </span>
      <div>
        <slot>
          {{ label }}
        </slot>
      </div>
    </label>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
    },
    label: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number, Boolean]
    },
    uniqueKey: {
      type: [String, Number, Boolean],
      required: true,
    },
    // }
  },
  methods: {
    selectHandle() {
      if (this.uniqueKey === this.value) return;
      this.$emit("change", this.uniqueKey);
      this.$emit("input", this.uniqueKey);
    }
  }
};
</script>
<style lang="scss" scoped>
.radio {
  cursor: pointer;
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-right: 24px;

  &__checkmark {
    width: 24px;
    height: 24px;
    cursor: pointer;
    margin-right: 12px;
    flex-shrink: 0;
    background: $color__background-primary;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      background: $color__font-link;
      span {
        background: white;
        height: 10px;
        width: 10px;
        border-radius: 100%;
      }
    }
  }

  span {
    font-size: $fs__default;
    line-height: 20px;
    color: #000000;
  }
}

input[type="radio"] {
  display: none;
}
</style>
