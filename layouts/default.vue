<template>
    <div class="default-layout">
        <CommonMainHeader class="default-layout__header"/>
        <Nuxt/>
<!--      <DefaultFooter class="default-layout__footer"/>-->
    </div>
</template>
<script>
import DefaultFooter from "../components/common/forLayout/DefaultFooter";
export default {
  components: {DefaultFooter},
  middleware: "auth",
}
</script>
<style lang="scss" scoped>
.default-layout {
  $breakPoint: $break-point__header;
  min-height: 100vh;

  @media(max-width: $breakPoint) {
    padding-top: 94px;
    &__header {
      position: fixed;
      width: 100%;
      top: 0;
      z-index: $z_header;
    }
  }
}
</style>
