<template>
  <div class="my-business-main">
    <CommonMainHeader/>

    <div class="my-business-main__head">
      <div class="my-business-main__tabs">
        <nuxt-link to="/my-business/places">Мои места</nuxt-link>
        <nuxt-link to="/my-business/calendar">Календарь</nuxt-link>
        <nuxt-link to="/my-business/messages">Сообщения</nuxt-link>
        <nuxt-link to="/my-business/advices">Советы</nuxt-link>
      </div>
      <div class="my-business-main__description">Мои места</div>
    </div>

    <div class="my-business-main__content">
      <nuxt-child/>
    </div>

  </div>
</template>

<script>
export default {
  name: "myBusinessMain",
  middleware: "auth",
}
</script>

<style lang="scss" scoped>
.my-business-main {

  &__head {

  }

}
</style>
