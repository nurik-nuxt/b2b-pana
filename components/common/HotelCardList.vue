<template>
  <div class="hotel-card-list">
    <div class="hotel-card-list__title">{{ title }}</div>
    <div class="hotel-card-list__content">
      <nuxt-link class="hotel-card-list__item" v-for="hotel in hotelList" :to="`/my-business/hotel/${hotel.id}`">
        <HotelCard
          :title="hotel.title"
          :created-at="hotel.date_created"
          :img="hotel.images[0]"
          :incomplete="hotel.is_finished"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import HotelCard from "@/components/common/cards/HotelCard";
export default {
  components: {HotelCard},

  props:{
    title:{
      type:String,
      default:"Мои места"
    },
    hotelList:{
      type:Array,
      default: ()=>[]
    }
  }
}
</script>

<style scoped lang="scss">
.hotel-card-list{
  $breakPoint: $break-point__mobile;
  border-radius: $border-radius__middle;

  &__title{
    background: #ffffff;
    padding: 20px;
    border-bottom: 1px solid #f1f3f7;
    border-radius: 12px 12px 0px 0px;
    @media (max-width: $break-point__mobile) {
      margin-bottom: 12px;
      border-radius: $border-radius__middle;
    }
  }

  &__content {
    background: #ffffff;
    @media (max-width: $breakPoint) {
      background: transparent;
      &>*{margin-top: 8px;}
    }
  }

  &__item{
    text-decoration: none;
    outline: none;
    color: #111111;
  }
}
</style>
