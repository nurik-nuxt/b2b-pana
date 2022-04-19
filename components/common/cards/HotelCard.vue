<template>
  <div class="card">
    <div class="hotel-card">
      <div class="hotel-card__main">
        <div class="hotel-card__image">
          <img v-if="img" :src="`http://45.136.56.44:8001/media/${img.image}`"/>
          <img v-else src="@/assets/images/hotel1.png"/>
        </div>
        <div class="hotel-card__info">
          <h1 class="hotel-card__info-title">{{ title || 'Неизвестно' }}</h1>
          <p class="hotel-card__info-date">Создано: {{createdAt}}</p>
        </div>
        <div class="hotel-card__more-mobile">
          <BaseIcon class="hotel-card__more ic-20">more</BaseIcon>
        </div>
      </div>
      <div class="hotel-card__detail">
        <div class="hotel-card__status">
          <span class="hotel-card__status__item">Отель</span>
          <!--        <span class="hotel-card__status__item">Круглосуточно</span>-->
          <span class="hotel-card__status__item" :class="{incomplete: !incomplete}">{{ incompleteText }}</span>
        </div>
        <div class="hotel-card__more-desktop">
          <BaseIcon class="hotel-card__more ic-20">more</BaseIcon>
        </div>
      </div>
    </div>
    <div v-show="withInfo" class="card__info">
      <h1 class="card__info-title">Оплата</h1>
      <p class="card__info-description">Способы оплаты для гостей</p>
    </div>
  </div>
</template>
<script>
import BaseIcon from "~/components/base/BaseIcon";
export default {
  components: {BaseIcon},

  data: () =>({
  }),
  props:{
    incomplete:{
      type:Boolean,
      default:false
    },
    title:{
      type:String
    },
    createdAt:{
      type:String
    },
    img:{
      type:[String, Object],
      // required:true
    },
    withInfo:{
      type:Boolean,
      default: false
    }
  },
  computed: {
    incompleteText() {
      return this.incomplete
        ? 'Опубликован'
        : 'Не завершен';
    }
  }
}
</script>
<style scoped lang="scss">
.card{
  background: #FFFFFF;
  border-radius: $border-radius__middle;
  padding: 0;
  &__info{
    padding: 24px;
    &-title{
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #111111;
    }
    &-description{
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 19px;
      color: #333333;
    }
  }
}
.hotel-card{
  $breakPoint: $break-point__mobile;

  display: grid;
  grid-template-columns: 2fr 0.8fr;
  cursor: pointer;
  border-bottom: 1px solid #f1f3f7;
  border-radius: $border-radius__middle;
  @media(max-width: $breakPoint) {
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
  }

  &__main{
    display: flex;
    flex-direction: row;
    padding: 16px;

    @media(max-width: $breakPoint) {
      display: grid;
      grid-template-columns: 80px 1fr 32px;
      border-bottom: 1px solid $color__background-primary;
    }
  }
  &__image{
    width: 73px;
    height: 55px;
    border-radius: 8px;
    margin-right: 24px;
    img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  &__info{
    &-title{
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 22px;
      color: #111111;
      margin: 5px 0 6px 0;
    }
    &-date{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #333333;
    }
  }
  &__status{
    display: flex;
    flex-wrap: wrap;
    //margin: 0 50px 0 0;

    &__item{
      background: #F8F8F8;
      border-radius: 8px;
      padding: 12px 24px;
      margin-right: 12px;

      &.incomplete{
        background: rgba(255, 59, 48, 0.05);
        color: #FF3B30;
      }
    }
  }
  &__detail{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
  }

  &__more {
    height: 20px;
    width: 20px;
    border-radius: 32px;
    background: #F8F8F8;
    padding: 6px;
  }

  &__more-desktop{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @media(max-width: $breakPoint) {
      display: none;
    }
  }

  &__more-mobile {
    @media(min-width: $breakPoint) {
      display: none;
    }
  }
}

</style>
