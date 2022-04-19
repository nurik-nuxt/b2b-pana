<template>
  <div class="base-textarea">
    <h1 class="base-textarea-title">{{ title }}</h1>
    <textarea
      class="base-textarea__textarea"
      name="textarea"
      :rows="row"
      :placeholder="placeholder"
      :value="value"
      @input="inputHandle"
    />
  </div>
</template>

<script>
export default {
  name:"BaseTextArea",

  props:{
    row:{
      type:Number,
      default:5
    },
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    title:{
      type: String,
      default: ""
    }
  },

  methods: {
    inputHandle(event) {
      this.$emit('input', event.target.value);
    }
  }
}
</script>

<style scoped lang="scss">
.base-textarea{
  width: 100%;
  position: relative;
  $padding: 16px;
  margin-bottom: 16px;
  &__textarea{
    //height: calc(55px - 2*$padding);
    width: calc(100% - 2*$padding);
    max-width: calc(100% - 2*$padding);
    min-width: calc(100% - 2*$padding);
    min-height: calc(48px - 2*$padding);
    max-height: 300px;
    padding: $padding;
    border-radius: $border-radius__middle;
    background: #F8F8F8;
    font-size: $fs__default;
    border: none;
    &:focus{
      border: none;
      outline: none !important;
    }
  }
  &-title{
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #111111;
    margin-bottom: 8px;
  }
}
</style>
