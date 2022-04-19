<template>
    <header class="empty-header">
      <div class="empty-header__wrapper">
        <div class="logo text-center">
            <img src="@/static/icons/logo.svg" alt="logo">
        </div>
      </div>
    </header>
</template>


<style lang="scss" scoped>
.empty-header{
  $horizontal-padding: 20px;
  background: #111111;

  &__wrapper {
    padding: 18px $horizontal-padding;
    width: calc(100% - 2*$horizontal-padding);
    max-width: $max-width;
    margin: 0 auto;
  }

  .logo{
    margin: 0 auto;
  }
}
</style>
