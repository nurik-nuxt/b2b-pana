<template>
  <div class="service-card">

    <div class="service-card__header">
      <div class="service-card__title">Услуга <span v-if="serial">№{{ serial }}</span></div>
      <button class="service-card__delete" @click="deleteHandle">Удалить услугу</button>
    </div>

    <div class="service-card__input-group">
      <div class="service-card__input-box">
        <div class="service-card__input-title">Тип услуги</div>
        <base-select
          :value="value.type"
          :dictionary="Dictionary.services"
          valueField="name"
          placeholder="Выберите услугу"
          @input="changeHandle('type', $event)"
        />
      </div>
      <div class="service-card__input-box">
        <div class="service-card__input-title">Цена услуги в KZT (тенге)</div>
        <div class="service-card__price-input-group">
          <base-input
            :value="value.price"
            type="number"
            placeholder="Цена"
            @input="changeHandle('price', $event)"
          />
          <base-select
            :value="value.per_amount"
            :options="peopleCount"
            valueField="id"
            label="name"
            placeholder="Кол-во людей"
            @input="changeHandle('per_amount', $event)"
          />
        </div>
      </div>
    </div>

    <div class="service-card__input-box">
      <div class="service-card__input-title">Описание услуги</div>
      <base-text-area
        :value="value.description"
        placeholder="Кратко расскажите об услуге"
        @input="changeHandle('description', $event)"
      />
    </div>

  </div>
</template>

<script>
import BaseTextArea from "../../base/BaseTextArea";

import {Dictionary} from "@/store/dictionary";

export default {
  name: "serviceCard",
  components: {BaseTextArea},
  props: {
    value: {
      type: Object,
    },
    serial: {
      type: Number,
      default: null
    }
  },
  data: () => ({
    Dictionary,
  }),
  computed: {
    peopleCount() {
      return new Array(5).fill(null)
        .map((v, index) => ({id: index+1, name: index+1}));
    }
  },
  methods: {
    deleteHandle() {
      this.$emit('delete');
    },
    changeHandle(fieldName, value) {
      let obj = {};
      obj[fieldName] = value;
      this.$emit('change', Object.assign(this.value, obj));
    }
  }
}
</script>

<style lang="scss" scoped>
.service-card {
  padding: 24px;
  background: #FFFFFF;
  border-radius: $border-radius__middle;
  margin-bottom: 24px;

  &__header {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }

  &__title {
    font-size: $fs__middle;
    font-weight: 500;
  }

  &__delete {
    font-weight: 400;
    cursor: pointer;
    font-size: $fs__default;
    color: $color__orange;
  }

  &__input-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 16px;
    @media (max-width: $break-point__mobile) {
      display: flex;
      flex-direction: column;
    }
  }

  &__input-box {
    display: flex;
    flex-direction: column;
    margin-top: 16px;
  }

  &__price-input-group {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-column-gap: 8px;
  }

  &__input-title {
    margin-bottom: 12px;
  }

}
</style>
