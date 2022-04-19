<template>
  <div class="reservation">
    <base-button class="mb-24" variant="back" @click="goBack">
      <base-icon class="ic-24 icon">arrow-left</base-icon>
      Назад
    </base-button>

    <div class="reservation__title-card">
      <h1 class="reservation__title">Бронирования</h1>
      <div class="mt-12" v-if="list.length">{{ list.length }} бронирований</div>
    </div>

    <base-select
        class="reservation__filter"
        v-model="filterValue"
        :options="filterOptions"
    />

     <booking-table class="mt-12" :value="list"/>
  </div>
</template>

<script>
import BookingTable from "../../../components/common/calendar/bookingTable";
import {mapActions, mapGetters} from "vuex";
import BaseSelect from "../../../components/base/BaseSelect";
export default {
  name: "index",
  components: {BaseSelect, BookingTable},

  data: () => ({
    filterValue: null,
    list: [
      {name: "check name", place: "hotel", date_start: "28.01.22", date_end: "30.01.22", status: true},
      {name: "abylay", place: "hotel", date_start: "28.01.22", date_end: "30.01.22", status: false},
      {name: "nurs", place: "hotel", date_start: "29.01.22", date_end: "01.02.22", status: true},
    ]
  }),

  computed: {
    ...mapGetters({
      hotelList: "hotel/getHotelList"
    }),
    filterOptions() {
      return [
        {id: null, name: "Все места"},
        ...this.hotelList.map(hotel => ({id: hotel.id, name: hotel.title}))
      ]
    }
  },

  methods: {
    ...mapActions({
      fetchHotelList: "hotel/fetchHotelList"
    }),
    goBack() {
      this.$router.push("/my-business/calendar");
    }
  },

  mounted() {
    this.fetchHotelList();
  }
}
</script>

<style lang="scss" scoped>
.reservation {
  max-width: 1256px;
  width: calc(100% - 32px);
  padding: 48px 16px;
  margin: 0 auto;

  &__title {
    font-size: $fs__middle;
    color: black;
  }

  &__title-card {
    margin-top: 24px;
    background: white;
    border-radius: $border-radius__middle;
    color: $color__gray;
    padding: 24px;
  }

  &__filter {
    margin-top: 12px;
    max-width: 200px;
  }

}
</style>
