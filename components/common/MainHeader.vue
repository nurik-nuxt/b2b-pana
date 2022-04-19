<template>
  <header class="header__wrapper">
    <div class="header">
      <div class="header__left">
        <nuxt-link class="header__logo" to="/">
          <img src="@/static/icons/logo.svg" alt="logo" />
        </nuxt-link>
        <nuxt-link v-for="menuItem in menuList" :key="menuItem.id" class="header__nav" :class="{ isActive: checkRoute(menuItem.link) }" :to="`/${menuItem.link}`" >
          <BaseIcon class="ic-20 icon">{{menuItem.icon}}</BaseIcon>
          <span>{{menuItem.title}}</span>
        </nuxt-link>
      </div>
      <div class="header__right">
        <nuxt-link class="header__nav" to="/profile" :class="{ isActive: checkRoute('profile') }">
          <BaseIcon class="ic-20 icon">user</BaseIcon>
          Профиль
        </nuxt-link>
      </div>
      <div class="header__hamburger">
        <BaseIcon class="ic-32" v-if="!openMobileMenu" @click="openMobileMenu = !openMobileMenu">hamburger</BaseIcon>
        <BaseIcon class="ic-32" v-if="openMobileMenu" @click="openMobileMenu = !openMobileMenu">close-white</BaseIcon>
      </div>
    </div>

    <Slide>
      <div class="header__mobile-menu" v-show="openMobileMenu">
        <div v-for="menuItem in menuList" :key="menuItem.id" class="header__mobile-menu__item" :class="{ isActive: checkRoute(menuItem.link) }" @click="go(menuItem.link)">
          <BaseIcon class="ic-20 icon">{{menuItem.icon}}</BaseIcon>
          <span>{{menuItem.title}}</span>
        </div>
        <div class="header__mobile-menu__item" :class="{ isActive: checkRoute('profile') }" @click="go('profile')">
          <BaseIcon class="ic-20 icon">user</BaseIcon>
          <span>Профиль</span>
        </div>
      </div>
    </Slide>

    <Fade>
      <div
        class="header__mobile-menu__wrapper"
        v-show="openMobileMenu"
        @click.self="openMobileMenu = false"
      />
    </Fade>

  </header>
</template>
<script>
import BaseIcon from "~/components/base/BaseIcon";
import { menuList } from "@/configs/menuList"
import Slide from "../transitions/Slide";
import Fade from "../transitions/Fade";
export default {
  components: {Fade, Slide, BaseIcon},
  data: () => ({
    menuList,
    openMobileMenu: false
  }),
  methods:{
    checkRoute(item) {
      return (
        this.$route.fullPath === item ||
        this.$route.fullPath.includes(item.replaceAll("/", ""))
      );
    },
    go(route) {
      this.$router.push(`/${route}`);
      this.openMobileMenu = false;
    }
  }
}
</script>

<style lang="scss">
.header {
  $horizontal-padding: 20px;
  $breakPoint: $break-point__header;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 18px $horizontal-padding;
  width: calc(100% - 2*$horizontal-padding);
  max-width: $max-width;
  margin: 0 auto;
  //@media (max-width: $break-point__mobile ) {
  //  padding: 23px 0;
  //}
  //width: 100%;

  &__wrapper {
    background: #111111;
  }

  &__left{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    //width: 70%;
  }
  &__right{
    display: flex;
    flex-direction: row;
  }
  &__logo{
    margin-right: 64px;
  }
  &__nav{
    display: flex;
    flex-direction: row;
    margin-left: 16px;
    background: #333333;
    border-radius: 34px;
    padding: 12px 16px;
    text-decoration: none;
    color: #ffffff;
    @media (max-width: $breakPoint ) {
     display: none;
    }
  }
  &__hamburger{
    display: none;
    cursor: pointer;
    @media (max-width: $breakPoint ) {
      display: flex;
    }
  }

  &__mobile-menu {
    position: relative;
    display: flex;
    flex-direction: column;

    &__wrapper {
      position: fixed;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0, 0, 0, .3);
      @media (min-width: $breakPoint ) {display: none}
    }

    &__item {
      padding: 25px 20px;
      color: white;
      text-decoration: none;
    }

    @media (min-width: $breakPoint ) {display: none}
  }
}
.icon{
  margin-right: 11px;
}
.isActive{
  background:#FB6B56;
}
</style>
