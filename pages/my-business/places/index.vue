<template>
  <div class="index">
    <BaseTabs/>
    <CountCard class="mb-15" :hotel-count="hotelList.length"/>
    <HotelCardList :hotel-list="completedHotels"/>
    <HotelCardList style="margin-top:47px" :title="'Незавершенные объявления'" :hotel-list="inCompletedHotels"/>
  </div>
</template>

<script>
import HotelCard from "~/components/common/cards/HotelCard";
import HotelCardList from "@/components/common/HotelCardList";
import BaseTabs from "@/components/base/BaseTabs";
import CountCard from "@/components/common/cards/CountCard";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "index",

  components: {CountCard, BaseTabs, HotelCardList, HotelCard},

  data:()=>({
    // hotelList:null
  }),

  async fetch() {
    await this.fetchHotelList()
  },

  computed: {
    ...mapGetters({
      hotelList: "hotel/getHotelList"
    }),
    completedHotels(){
      return this.hotelList.filter(hotel =>{
        return hotel.is_finished === true
      })
    },
    inCompletedHotels(){
      return this.hotelList.filter(hotel =>{
        return hotel.is_finished === false
      })
    }
  },

  methods:{
    ...mapActions({
      fetchHotelList: "hotel/fetchHotelList"
    })
  },

  mounted() {
    // this.$store.dispatch("hotel/info/fetchMain", {id: 9});
    // this.$store.dispatch("hotel/info/fetchConvenience", {id: 9});
    // this.$store.dispatch("hotel/info/fetchRules", {id: 9});
    // this.$store.dispatch("hotel/info/fetchImages", {id: 9});
  },
}
</script>

<style scoped lang="scss">
.index{
  max-width: $max-width;
  width: calc(100% - 32px);
  padding: 48px 16px;
  margin: 0 auto;
}
</style>
