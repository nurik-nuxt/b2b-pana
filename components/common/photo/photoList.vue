<template>
  <div class="photo-list">

    <div
      class="photo-list__image"
      v-for="(image, index) in value" :key="index"
    >

    </div>

  </div>
</template>

<script>
export default {
  name: "photoList",
  props: {
    value: {
      type: Array
    },
    base64: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deletePhoto(index) {
      let list = value.slice();
      list.splice(index, 1);
      this.$emit("input", list);
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-list {
  display: flex;
  flex-wrap: wrap;

  &__image {
    margin-bottom: 16px;
    margin-right: 16px;
  }
}
</style>
