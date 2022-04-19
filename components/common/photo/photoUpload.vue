<template>
  <div class="photo-button">
    <label>
      <slot>
        <div class="photo-button__label">
          Добавить фото
          <base-icon class="ic-20 ml-14">add-blue</base-icon>
        </div>
      </slot>

      <input type="file" accept="image/*" @change="addPhoto"/>
    </label>
  </div>
</template>

<script>
export default {
  name: "photoButton",
  props: {
    base64: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    },
    async addPhoto(event) {
      const output = this.base64
        ? await this.toBase64(event.target.files[0])
        : event.target.files[0];

      this.$emit("input", output);
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-button {

  &__label {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: $color__font-link;
    &:hover {opacity: .8}
    &:active {opacity: .6}
  }

  label {

    input {display: none}
  }
}
</style>
