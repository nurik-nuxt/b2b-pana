<template>
  <div class="empty-layout">

    <!-- HEADER -->
    <empty-header class="empty-layout__header"/>

    <!-- CONTENT -->
    <div class="empty-layout__content">
      <Nuxt/>
    </div>


  </div>
</template>

<script>
import EmptyHeader from "../components/common/forLayout/EmptyHeader";
export default {
  name: "empty",
  components: {EmptyHeader}
}
</script>

<style lang="scss" scoped>
.empty-layout {
  background: $color__background-primary;

  &__header {
    position: fixed;
    top: 0;
    z-index: $z_header;
    width: 100%;
  }

  &__content {
    height: 100vh;
    overflow: auto;
  }
}
</style>
