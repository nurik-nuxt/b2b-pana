<template>
  <div class="my-business">
    <div class="my-business__title">
      <h1>{{title}}</h1>
    </div>
    <div class="my-business__description">
      <h4>{{description}}</h4>
    </div>
    <div class="my-business__content">
      <slot :name="'content'"/>
    </div>
    <div class="my-business__confirm">
      <slot :name="'confirm'"/>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    title:{
      type:String,
      default:"Добавьте свой объект на Pana и готовьтесь принимать гостей!"
    },
    description:{
      type:String,
      default: "Чтобы начать, выберите тип объекта, который хотите зарегистрировать на Pana.kz"
    }
  }
}
</script>

<style scoped lang="scss">
.my-business{
  margin-top: 80px;
  padding: 0 172px;
  @media (max-width: $break-point__mobile) {
    padding: 16px;
    margin: 0;
  }
  &__title{
    margin:0 0 8px 0;
    h1{
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 130%;
      color: #111111;
      margin: 0;
    }
  }
  &__description{
    margin: 0 0 40px 0;
    h4{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 150%;
      color: #777777;
      margin: 0;
    }
  }
  &__content{
    display: grid;
    grid-gap: 16px;
    grid-template-columns: repeat(var(--repeat, auto-fit), minmax(calc(410px * 1) , 1fr));
  }
  &__confirm{
    margin-top: 32px;
  }
}
</style>
