<template>
  <div>
    <div class="desktop">
      <div class="room">
    <div class="room__image">
      <img :src="`http://45.136.56.44:8001/media/${imageLink}`">
    </div>
    <div class="room__info">
      <div class="room__action">
        <div class="room__title-wrapper">
          <div class="room__title">
            <h3 class="room__title-name">{{roomTitle}}</h3>
            <p class="room__title-description">1 кровать {{ roomArea | thousandSeparator}}м²</p>
          </div>
          <div class="room__price">От {{roomPrice}} ₸</div>
        </div>
        <div class="room__tools">
          <BaseIcon style="cursor: pointer" @click="$emit('edit',roomId)" class="ic-48">edit</BaseIcon>
          <BaseIcon style="cursor: pointer" @click="$emit('clicked',roomId)" class="ic-48">delete</BaseIcon>
        </div>
      </div>
      <div class="room__services">
        <div class="room__services__item">
          Wi-Fi
        </div>
      </div>
    </div>
  </div>
    </div>
    <div class="mobile">
      <div class="room-mobile">
        <div class="room-mobile__info">
          <div class="room-mobile__image" :style="{backgroundImage: `url(http://45.136.56.44:8001/media/${imageLink})`}"/>
          <div class="room-mobile__title-wrapper">
            <h3 class="room-mobile__title">{{ roomTitle }}</h3>
            <p class="room-mobile__description">1 кровать {{ roomArea | thousandSeparator}}м²</p>
          </div>
        </div>
        <div class="room-mobile__tools">
          <BaseIcon style="cursor: pointer" @click="$emit('edit',roomId)" class="ic-48">delete</BaseIcon>
          <button class="room-mobile__edit">
            <BaseIcon @click="$emit('clicked',roomId)" class="ic-48">edit</BaseIcon>
            <span>Редактировать</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
export default {
  components: {BaseIcon},

  props:{
    roomPrice:{
      type:Number,
      default:21924
    },
    roomTitle:{
      type:String,
      default:"Стандартный номер"
    },
    roomArea:{
      type:Number,
      default: 25
    },
    roomId:{
      type:Number
    },
    imageLink: {
      type:[String, Object]
    }

  },
}
</script>

<style scoped lang="scss">
$breakPoint: 700px;
.desktop {
  @media (max-width: $breakPoint) {display: none}
}
.mobile {
  @media (min-width: $breakPoint) {display: none}
}

.room{
  border-radius: 12px;
  background: #FFFFFF;
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  &__image{
    width: 300px;
    height: 225px;
    img{
      width: 100%;
      height: 100%;
      border-radius: 12px 0px 0px 12px;
    }
  }
  &__info{
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    width: 60%;
  }
  &__action{
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-bottom: 1px solid #F1F3F7;
    justify-content: space-between;
  }
  &__services{
    padding: 16px;
    &__item{
      background: #F8F8F8;
      border-radius: 12px;
      display: inline;
      padding: 12px 32px;
    }
  }
  &__title{
    display: flex;
    flex-direction: column;
    &-name{
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: #111111;
    }
    &-description{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #333333;
    }
    &-wrapper {
      display: flex;
      flex-direction: row;
    }
  }
  &__price{
    margin-left: 16px;
    background: rgba(86, 132, 251, 0.08);
    border-radius: 8px;
    color: #5684FB;
    padding: 4px 12px;
    height: 50%;
  }
}

.room-mobile {
  border-radius: 12px;
  background: #FFFFFF;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;

  &__info {
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-column-gap: 12px;
    padding: 10px;
    border-bottom: 1px solid #F1F3F7;
    min-height: 50px;
  }

  &__image {
    padding: 10px;
    background-size: cover;
    border-radius: 16px;
  }

  &__title-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  &__title {
    font-size: $fs__default;
    font-weight: 500;
    margin-bottom: 4px;
  }

  &__description {
    font-size: 14px;
    color: $color__gray;
  }

  &__tools {
    display: grid;
    grid-template-columns: 50px 1fr;
    grid-column-gap: 10px;
    padding: 10px;
  }

  &__edit {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #F4F4F4;
    border-radius: 16px;
  }
}
</style>
