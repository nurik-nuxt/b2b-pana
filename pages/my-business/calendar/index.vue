<template>
  <div class="calendar">
    <BaseTabs/>
    <div class="calendar__title-card">
      <h1 class="calendar__title">Календарь</h1>
      <div class="calendar__description">4 места</div>
    </div>

    <div class="calendar__booking-title">
      <div class="calendar__title">Бронирования за 2 недели</div>
      <nuxt-link to="/my-business/reservation">Все бронирования</nuxt-link>
    </div>

    <booking-table :value="tableRow"/>

    <hotel-card-list
        class="mt-24"
        title="Выберите место"
        :hotel-list="hotelList"
    />

  </div>
</template>

<script>
import BookingTable from "../../../components/common/calendar/bookingTable";
import HotelCardList from "../../../components/common/HotelCardList";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "index",
  components: {HotelCardList, BookingTable},

  data: () => ({
    tableRow: [
      {name: "check name", place: "hotel", date_start: "28.01.22", date_end: "30.01.22", status: true},
      {name: "abylay", place: "hotel", date_start: "28.01.22", date_end: "30.01.22", status: false},
      {name: "nurs", place: "hotel", date_start: "29.01.22", date_end: "01.02.22", status: true},
    ]
  }),

  async fetch() {
    await this.fetchHotelList();
  },

  computed: {
    ...mapGetters({
      hotelList: "hotel/getHotelList"
    })
  },

  methods: {
    ...mapActions({
      fetchHotelList: "hotel/fetchHotelList"
    })
  }
}
</script>

<style lang="scss" scoped>
.calendar {
  max-width: $max-width;
  width: calc(100% - 32px);
  padding: 48px 16px;
  margin: 0 auto;

  &__title-card {
    background: #FFFFFF;
    border-radius: 0 12px 12px 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    //justify-content: space-between;
  }

  &__title {
    font-size: $fs__middle;
  }

  &__description {
    font-size: $fs__default;
    color: $color__gray;
  }

  &__booking-title {
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media(max-width: $break-point__mobile) {
      flex-direction: column;
    }
  }
}
</style>
