<template>
  <div class="steps">
    <NavSteps v-if="!hotelInfo.is_finished" :routes="routes"/>
    <div v-else>
      <BaseButton class="mb-24" variant="back" @click="goBack">
        <BaseIcon class="ic-24 icon">arrow-left</BaseIcon>
        Назад
      </BaseButton>
      <HotelCard
          :title="hotelInfo.title"
          :incomplete="hotelInfo.is_finished"
          with-info
      />
    </div>
    <nuxt-child/>
  </div>
</template>

<script>
import NavSteps from "@/components/common/NavSteps";
import {mapActions, mapGetters} from "vuex";
import HotelCard from "@/components/common/cards/HotelCard";
import BaseButton from "@/components/base/BaseButton";
import BaseIcon from "@/components/base/BaseIcon";
export default {
  name: "index",
  components: {NavSteps,HotelCard,BaseIcon,BaseButton},
  computed: {
    id(){
      return this.$route.params.id
    },
    ...mapGetters({
      hotelInfo:"hotel/getHotelMainInfo"
    }),

  },
  data: () => ({
    routes: [
        {
          id:1,
          title: "Основная информация",
          description:"Название объекта, Контактные данные, Адрес объекта",
          url:'main',
        },
        {
          id:2,
          title: "Планировка и цены",
          description:"Информация о номерах",
          url:'room',
        },
        {
          id:3,
          title: "Услуги",
          description:"Базовые правила проживания",
          url: "facilities",
        },
        {
          id:4,
          title: "Удобства",
          description:"Общая информацию о своем объекте",
          url:'services',
        },
        {
          id:5,
          title: "Фотографии",
          description:"Фотографии объекта",
          url:'photos',
        },
        {
          id:6,
          title: "Порядок проживания",
          description:"Базовые правила проживания",
          url:'rules',
        },
        {
          id:7,
          title: "Оплата",
          description:"Способы оплаты для гостей",
          url: "payment",
        },
    ]
  }),
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
  }

}
</script>

<style scoped lang="scss">
.steps{
  max-width: $max-width;
  width: calc(100% - 32px);
  padding: 80px 16px;
  margin: 0 auto;
}
</style>
