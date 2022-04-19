<template>
  <base-modal name="housing-status-annul" size="small" closeButton>
    <div class="annul">
      <base-icon class="ic-96">night</base-icon>
      <h3 class="annul__title">Аннулировать объект</h3>
      <div class="annul__description">
        Все данные этого объекта удалятся с Pana.kz
        +еще какая-нибуль инфа
      </div>
      <div class="annul__actions">
        <button class="annul__cancel" @click="cancel">Отмена</button>
        <button class="annul__annul" @click="annul">Аннулировать</button>
      </div>
    </div>
  </base-modal>
</template>

<script>
export default {
  name: "housingStatusAnnulModal",
  methods: {
    cancel() {
      this.$modal.hide("housing-status-annul");
    },
    annul() {
      this.$emit("annul");
      this.$modal.hide("housing-status-annul");
    }
  }
}
</script>

<style lang="scss" scoped>
.annul {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 40px;

  &__title {
    margin-top: 24px;
    font-size: $fs__middle;
    font-weight: bold;
  }

  &__description {
    margin-top: 12px;
    text-align: center;
  }

  &__actions {
    width: 100%;
    margin-top: 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 10px;
  }

  &__cancel {
    padding: 15px 0;
    border: 1px solid $color__error;
    border-radius: $border-radius__middle;
    color: $color__error;
    cursor: pointer;
    transition: .15s;
    &:hover {opacity: .8}
  }

  &__annul {
    padding: 15px 0;
    border: 1px solid $color__error;
    border-radius: $border-radius__middle;
    background: $color__error;
    color: white;
    cursor: pointer;
    transition: .15s;
    &:hover {opacity: .8}
  }
}
</style>
