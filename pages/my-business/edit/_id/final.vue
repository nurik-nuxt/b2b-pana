<template>
  <div class="final">
    <div class="final__wrap">

    <div class="final__row">
      <div class="final__mini-wrap">
      <div class="final__card">
        <div class="final__hotel-name">Отель Ритц-Карлтон Алматы</div>
        <div class="final__title">Мы строим вашу недвижимость</div>
        <div class="final__description">
          Устройтесь поудобнее и расслабьтесь, потому что
          теперь пришло время для нас настроить вашу
          обственность и подготовить Connect (ваш экстранет)
          для вас. Это займет всего несколько минут.
        </div>
        <div class="final__actions">
          <base-button variant="next" autoWidth>Отведите меня в мою собственность </base-button>
          <div class="final__time">Текущее время установки: 1:22</div>
        </div>
      </div>
      </div>
      <div class="final__info-card">
        Поздравляем пришло время расслабиться и
        поднять ноги, когда вы завершили регистрацию.
        Для ваших записей мы также отправили вам
        электронное письмо, потверждающее вашу регистрацию
        а также отдельное электронное письмо, содержащее
        копию вашего соглашения.
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "final",
}
</script>

<style lang="scss" scoped>
$breakPoint: 1000px;

.final {

  &__wrap {
    max-width: $max-width;
    width: calc(100% - 32px);
    padding: 80px 16px;
    margin: 0 auto;
    @media(max-width: $breakPoint) {
      width: 100%;
      padding: 16px 0;
    }
  }

  &__mini-wrap {
    @media(max-width: $breakPoint) {
      width: calc(100% - 32px);
      padding: 0 16px;
    }
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 400px;
    grid-column-gap: 32px;

    @media(max-width: $breakPoint) {
      display: flex;
      flex-direction: column-reverse;
      & > *:nth-child(2) {
        margin-bottom: 16px;
      }
    }
  }

  &__card {
    background: white;
    border-radius: $border-radius__middle;
    padding: 24px;
  }

  &__info-card {
    border-radius: $border-radius__middle;
    padding: 16px;
    background: $color__light-green;
    font-size: $fs__default;
    height: fit-content;
    @media(max-width: $breakPoint) {
      border-radius: 0;
    }
  }

  &__hotel-name {
    margin-bottom: 4px;
    @media(max-width: $breakPoint) {
      color: $color__font-secondary;
    }
  }

  &__title {
    font-size: $fs__big;
  }

  &__description {
    margin-top: 8px;
    font-size: $fs__default;
    color: $color__gray;
  }

  &__actions {
    margin-top: 28px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;

    @media(max-width: $breakPoint) {
      display: flex;
      flex-direction: column-reverse;
      & > *:nth-child(2) {
        margin-bottom: 8px;
      }
    }
  }

  &__time {
    display: flex;
    align-items: center;
  }

}
</style>
