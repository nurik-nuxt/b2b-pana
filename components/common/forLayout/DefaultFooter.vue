<template>
  <footer class="default-footer">
    <div class="default-footer__wrapper">

      <div class="default-footer__logo">
        <img src="@/static/icons/logo-light.svg" alt="logo"/>
      </div>

      <div class="default-footer__rights">
        © 2022 Pana Asia. All Rights Reserved.
      </div>

      <div class="default-footer__socials">
        <a v-for="social in socials" :href="social.link" target="_blank">
          <base-icon class="ic-40">{{ social.imgName }}</base-icon>
        </a>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: "DefaultFooter",
  data: () => ({
    socials: [
      {imgName: "facebook-circle", link: "https://www.facebook.com"},
      {imgName: "linkedin-circle", link: "https://www.linkedin.com"},
      {imgName: "twitter-circle", link: "https://twitter.com"},
    ]
  })
}
</script>

<style lang="scss" scoped>
.default-footer {
  padding: 48px 16px;
  background: white;

  &__wrapper {
    max-width: $max-width;
    width: calc(100% - 32px);
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  &__logo {
    height: 45px;
  }
}
</style>
