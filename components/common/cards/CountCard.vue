<template>
  <div class="count-card">
    <div class="count-card__places">
      <h1>Мои места</h1>
      <p>{{ hotelCount }} локации</p>
    </div>
    <div class="count-card__add-place">
      <BaseButton url="/my-business/edit" variant="next">Добавить место</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from "@/components/base/BaseButton";
export default {
  components: {BaseButton},

  props:{
    hotelCount:{
      type:Number,
      default:2
    }
  }
}
</script>

<style scoped lang="scss">
.count-card{
  background: #FFFFFF;
  border-radius: 0px 12px 12px 12px;
  padding: 24px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: $break-point__mobile) {
    display: flex;
    flex-direction: column;
    padding: 16px;
    h1{
      margin-bottom: 6px;
    }
    p{
      margin-bottom: 16px;
    }
  }
  &__places{
    h1{
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.01em;
      color: #111111;
    }
    p{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #777777;
    }
  }
}
</style>
