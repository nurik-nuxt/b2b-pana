<template>
  <div class="tabs">
    <nuxt-link :to="tabItem.to" v-for="tabItem in tabList" class="tabs__item">
      <BaseIcon class="ic-16 ic-fill--black mr-5" :class="{'ic-fill--orange': path === tabItem.to}">{{ tabItem.icon }}</BaseIcon>
      {{tabItem.title}}
    </nuxt-link>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
export default {
  components: {BaseIcon},
  data:()=>({
    tabList:[
      {
        id:1,
        title:'Мои места',
        to:'/my-business/places',
        icon:'users'
      },
      {
        id:2,
        title:'Календарь',
        to:'/my-business/calendar',
        icon:'calendars'
      },
      {
        id:3,
        title:'Сообщения',
        to:'/my-business/message',
        icon:'users'
      },
      {
        id:4,
        title:'Советы',
        to:'/my-business/advice',
        icon:'users'
      }
    ]
  }),
  computed: {
    path() {
      return this.$route.path;
    }
  }
}
</script>

<style scoped lang="scss">
$breakPoint: $break-point__header;
.tabs{
  display: flex;
  flex-direction: row;
  background: #ffffff;
  border-radius: 12px 12px 0 0;
  max-width: 715px;
  border-bottom: 1px solid #E4E6EA;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }

  @media(max-width: $breakPoint) {
    background: transparent;
    overflow: auto;
    margin: 8px 0;
    border-radius: 0;
    border: none;
  }

  &__item{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 28px 35px;
    border-left: 1px solid #E4E6EA;
    max-width: 178px;
    cursor: pointer;
    text-decoration: none;
    outline: none;
    color: #333333;
    .nuxt-link-active{
      color: #FB6B56;
    }

    @media(max-width: $breakPoint) {
      background: white;
      border-radius: $border-radius__little;
      padding: 12px;
      margin-right: 12px;
      border: none;
      white-space: nowrap;
    }
  }
}
.tabs__item:first-child{
  border-left: none;
}
.nuxt-link-active{
  color: #FB6B56;
}
</style>
