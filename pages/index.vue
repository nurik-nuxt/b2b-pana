<!--<template>-->
<!--  <div class="index">-->
<!--    <BaseTabs/>-->
<!--    <CountCard style="margin-bottom: 15px" :hotel-count="hotelList.length"/>-->
<!--    <HotelCardList :hotel-list="hotelList"/>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import HotelCard from "~/components/common/cards/HotelCard";-->
<!--import HotelCardList from "@/components/common/HotelCardList";-->
<!--import BaseTabs from "@/components/base/BaseTabs";-->
<!--import CountCard from "@/components/common/cards/CountCard";-->
<!--import {mapActions, mapGetters} from "vuex";-->
<!--export default {-->
<!--  name: "index",-->

<!--  components: {CountCard, BaseTabs, HotelCardList, HotelCard},-->

<!--  data:()=>({-->
<!--    // hotelList:null-->
<!--  }),-->

<!--  async fetch() {-->
<!--    await this.fetchHotelList()-->
<!--  },-->

<!--  computed: {-->
<!--    ...mapGetters({-->
<!--      hotelList: "hotel/getHotelList"-->
<!--    })-->
<!--  },-->

<!--  methods:{-->
<!--    ...mapActions({-->
<!--      fetchHotelList: "hotel/fetchHotelList"-->
<!--    })-->
<!--  },-->

<!--}-->
<!--</script>-->

<!--<style scoped lang="scss">-->
<!--.index{-->
<!--  padding: 0 172px;-->
<!--  margin-top: 46px;-->
<!--}-->
<!--</style>-->

<script>
  export default {
    middleware({store, redirect}){
      return redirect("/my-business/places")
    }
  }
</script>
