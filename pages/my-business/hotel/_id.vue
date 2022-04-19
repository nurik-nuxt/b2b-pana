<template>
  <div class="index">
    <BaseButton class="mb-24" variant="back" @click="goBack">
      <BaseIcon class="ic-24 icon">arrow-left</BaseIcon>
      Назад
    </BaseButton>
    <HotelCard
      :class="{'index__hotel-card-static': !isIndexPage}"
      :title="hotelInfo.title"
      :created-at="hotelInfo.date_created"
      :incomplete="hotelInfo.is_finished"
    />
    <div class="index__edit-content" v-if="!isIndexPage">
      <nuxt-child/>
    </div>

    <div class="index__edit-list" v-if="isIndexPage">
<!--      <nuxt-link :to="`/my-business/edit/${id}/steps/${item.url}`"-->
      <nuxt-link :to="`${item.url === 'housingStatus' ? `/my-business/hotel/${id}/${item.url}` : `/my-business/edit/${id}/steps/${item.url}`}`"
                 class="index__edit-card"
                 v-for="item in navList"
      >
        <div>
          <h2 class="index__edit-card__title">{{ item.title }}</h2>
          <p class="index__edit-card__description">{{ item.description }}</p>
        </div>
        <div class="index__edit-card__icon-wrapper">
          <base-icon class="index__edit-card__icon">arrow-simple</base-icon>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import NavSteps from "@/components/common/NavSteps";
import HotelCard from "@/components/common/cards/HotelCard";
import BaseButton from "@/components/base/BaseButton";
import BaseIcon from "@/components/base/BaseIcon";
import room from "@/pages/my-business/edit/_id/steps/index/room";

export default {
  components: {BaseIcon, BaseButton, HotelCard, NavSteps},

  data:()=>({
    navList:[
      {
        id:1,
        title:"Основная информация",
        description:"Название объекта, Контактные данные, Адрес объекта",
        url:'main'
      },
      {
        id:2,
        title:"Планировка и цены",
        description:"Информация о номерах",
        url: 'room'
      },
      {
        id:3,
        title:"Порядок проживания",
        description:"Базовые правила проживания",
        url:'rules'
      },
      {
        id:4,
        title:"Статус жилья",
        description:"Актульный статус по жилью",
        url: "housingStatus"
      },
      {
        id:5,
        title:"Удобства и услуги",
        description:"Общая информацию о своем объекте",
        url: 'facilities'
      },
      {
        id:6,
        title:"Фотографии",
        description:"Фотографии объекта",
        url:'photos'
      },
      {
        id:7,
        title:"Оплата",
        description:"Способы оплаты для гостей",
        url: 'payment'
      }
    ]
  }),

  computed: {
    ...mapGetters({
      hotelInfo:"hotel/getHotelMainInfo"
    }),
    isIndexPage() {
      return this.$route.name === "my-business-hotel-id";
    },
    id(){
      return this.$route.params.id
    }
  },

  // async fetch(){
  //   await this.fetchHotelMainInfo(this.id)
  // },

  methods:{
    ...mapActions({
      fetchHotelMainInfo:"hotel/fetchHotelMainInfo"
    }),
    goBack() {
      if (this.isIndexPage) this.$router.push("/my-business/places");
      else this.$router.push({name: "my-business-hotel-id"});
    },
  },
  async mounted() {
    await this.fetchHotelMainInfo(this.id)
    // console.log(this.$route)
  }
}
</script>

<style scoped lang="scss">
.index{
  max-width: $max-width;
  width: calc(100% - 32px);
  padding: 48px 16px;
  margin: 0 auto;

  &__hotel-card-static {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__edit-list{
    margin-top: 24px;
    display: grid;
    grid-gap: 16px;
    grid-template-columns: 1fr 1fr;

    @media(max-width: $break-point__mobile) {
      display: flex;
      flex-direction: column;
    }
  }

  &__edit-card{
    display: grid;
    grid-template-columns: 1fr 30px;
    grid-column-gap: 10px;
    background: #FFFFFF;
    border-radius: 12px;
    padding: 24px;
    outline: none;
    text-decoration: none;

    &__title{
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #111111;
      margin-bottom: 8px;
    }

    &__description{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #333333;
    }

    &__icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__icon {
      background: $color__background-primary;
      border-radius: 50%;
      padding: 10px;
      height: 12px;
      width: 12px;
    }
  }
}
.icon{
  margin-right: 17px;
}
</style>
