<template>
  <div
    class="category-card"
    @click="$emit('clicked',categoryId)"
  >
    <div class="category-card__logo"
    >
      <img style="height: 56px" :src="`${imageLink}`" alt="" />
      <div class="category-card__checkbox">
        <BaseIcon class="ic-24">{{checked ? 'check-filled' :'check'}}</BaseIcon>
      </div>
    </div>
    <div class="category-card__title">{{title}}</div>
    <div class="category-card__description">{{description}}</div>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
export default {
  name:'CategoryCard',
  components: {BaseIcon},

  props:{
    title:{
      type:String,
    },
    description:{
      type:String
    },
    categoryId:{
      type:Number
    },
    imageLink:{
      type:String,
      default: '/category/Ellipse_108_M9STnKb.png'
    },
    checked:{
      type:Boolean,
      default: false
    }
  },
}
</script>

<style scoped lang="scss">
.category-card{
  background: #FFFFFF;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  font-family: Inter;
  font-style: normal;
  display: flex;
  flex-direction: column;
  transition: 0.5s;
  @media (max-width: $break-point__mobile) {
    padding: 16px;
    max-width: 343px;
  }
  &.checked{
    border: 2px solid #5684FB;
  }
  &__checkbox{
    //position: relative;
    width: 24px;
    height: 24px;
  }
  &__logo{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    //width: 56px;
    height: 56px;
  }
  &__title{
    font-weight: 600;
    font-size: $fs__default;
    line-height: 150%;
    color: #111111;
    margin-top: 16px;
    margin-bottom: 4px;
  }
  &__description{
    font-weight: normal;
    font-size:$fs__default;
    line-height: 150%;
    color: #777777;
    max-width: 450px;
  }
}
</style>
