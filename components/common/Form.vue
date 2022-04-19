<template>
  <div class="form-wrp">
    <slot />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.form-wrp {
  max-width: 512px;
  margin: 15vh auto 0;
  background: #ffffff;
  border-radius: 24px;
  padding: 35px 32px 32px;
}
@media only screen and (max-width: 576px) {
  .form-wrp {
    margin: 16px;
    padding: 24px;
  }
}
</style>
