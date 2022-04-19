<template>
  <div class="booking-table">
    <div class="booking-table__head booking-table__desktop">
      <div @click="select('name')">ФИО<div class="booking-table__arrow" :class="{'active': active==='name'}"/></div>
      <div @click="select('place')">Место<div class="booking-table__arrow" :class="{'active': active==='place'}"/></div>
      <div @click="select('date_start')">Дата заезда<div class="booking-table__arrow" :class="{'active': active==='date_start'}"/></div>
      <div @click="select('date_end')">Дата выезда<div class="booking-table__arrow" :class="{'active': active==='date_end'}"/></div>
      <div @click="select('status')">Статус<div class="booking-table__arrow" :class="{'active': active==='status'}"/></div>
    </div>

    <div class="booking-table__desktop">
      <div class="booking-table__info" v-for="(val, index) in value" :key="index">
        <div>{{ val['name'] }}</div>
        <div>{{ val['place'] }}</div>
        <div>{{ val['date_start'] }}</div>
        <div>{{ val['date_end'] }}</div>
        <div>{{ val['status'] }}</div>
      </div>
    </div>

    <div class="booking-table__mobile mt-16">
      <div class="booking-table__card" v-for="(val, index) in value" :key="index">
        <div class="booking-table__card__name">{{ val['name'] }}</div>
        <div class="mt-12">
          <div class="booking-table__card__value">
            <label>Место:</label>
            <div>{{ val['place'] }}</div>
          </div>
          <div class="booking-table__card__value">
            <label>Дата:</label>
            <div>{{ val['date_start'] }} - {{ val['date_end'] }}</div>
          </div>
          <div class="booking-table__card__value">
            <label>Статус:</label>
            <div>{{ val['status'] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bookingTable",
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    active: null,
    rows: [
      {key: "", label: ""},
    ]
  }),
  methods: {
    select(key) {
      if (this.active === key) this.active = null
      else this.active = key;
      this.$emit("filter", this.active);
    }
  }
}
</script>

<style lang="scss" scoped>
$breakPoint: 870px;

%row {
  display: grid;
  grid-template-columns: 2fr 3fr 2fr 2fr 2fr;
  &>* {
    padding: 20px 24px;
  }
}

.booking-table {
  display: flex;
  flex-direction: column;
  border-collapse: collapse;
  width: 100%;

  &__head {
    @extend %row;
    &>* {
      color: $color__gray;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }

  &__info {
    @extend %row;
    background: white;
    margin-bottom: 1px;

    &:first-child {
      border-radius: 12px 12px 0 0;
    }
    &:last-child {
      border-radius: 0 0 12px 12px;
    }
  }

  &__card {
    padding: 16px;
    border-radius: 12px;
    background: white;
    margin-bottom: 8px;

    &__name {
      font-size: $fs__middle;
    }

    &__value {
      display: flex;
      flex-direction: row;
      color: $color__gray;

      label {
        font-weight: bolder;
        margin-right: 5px;
        color: black;
      }
    }
  }

  &__arrow {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid $color__gray;
    margin-left: 5px;
    cursor: pointer;
    transition: .3s;
    &.active {transform: rotate(180deg)}
  }

  &__desktop {
    @media(max-width: $breakPoint) {
      display: none;
    }
  }

  &__mobile {
    @media(min-width: $breakPoint) {
      display: none;
    }
  }

}
</style>
