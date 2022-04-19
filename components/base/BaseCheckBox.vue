<template>
   <div :class="`select-button select-button--${type}`">
     <input
       type="checkbox"
       :name="name"
       :value="value"
       :id="value"
       @change="changeHandle()"
     />
     <label :for="value" :class="`select-button --${type}`">
       <slot></slot>
     </label>
   </div>
</template>

<script>
export default {
  name:'base-checkbox',
  props: ["name", "value", "type"],
  methods: {
    changeHandle(value) {
      this.$emit('change', value);
      this.$emit('input', value);
    }
  }
}
</script>

<style scoped lang="scss">
.select-button {
  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }
  label {
    display: inline-flex;
    align-items: center;
    user-select: none;
    &::before {
      cursor: pointer;
      content: '';
      display: inline-block;
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      flex-grow: 0;
      background-color: #F4F4F4;
      border: 2px solid transparent;
      border-radius: 0.25em;
      margin-right: 0.5em;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: 50% 50%;
    }
    &:hover {
      &::before {
        border-color: #b3d7ff;
      }
    }
  }
  &--radio {
    label {
      &::before {
        border-radius: 50%;
      }
    }
    input:checked+label {
      &:before {
        border: none;
        opacity: 1 !important;
        background: url('@/static/icons/checked-radio.svg');
      }
    }
  }
  &--checkbox {
    label {
      &::before {
        border-radius: 6px;
      }
    }
    input:checked+label {
      &::before {
        border: none;
        opacity: 1 !important;
        background: url('@/static/icons/Checkbox.svg');
      }
    }
  }
}
</style>
