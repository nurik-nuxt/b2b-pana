<template>
  <div class="payment">
    <div class="payment__wrapper">

      <div class="payment__description payment__card">
        <h1 class="payment__title">Оплата</h1>
        <p class="payment__text">
          Укажите принимаемые виды оплаты, информацию о налогах и другую информацию,
          например, о дополнительных сборах.
        </p>
      </div>

      <div class="payment__card">
        <div class="payment__title">Способы оплаты для гостей</div>
        <p class="payment__text">
          Вы можете списывать деньги с кредитных карт в своем объекте через
          POS-терминал?
        </p>
        <div class="payment__radio payment__input-box">
          <base-radio-button
            label="Да"
            :unique-key="true"
            name="one"
            v-model="form.pos_terminal"
          />
          <base-radio-button
            label="Нет"
            :unique-key="false"
            name="two"
            v-model="form.pos_terminal"
          />
        </div>

        <div class="payment__input-box">
          <div class="payment__input-title">Какое название должно быть указано в счетах (например, юридическое / название компании) ?</div>
          <base-input
            class="payment__input"
            placeholder="Введите название"
            v-model="form.name_payment"
            :error="getError('name_payment')"
          />
          <base-input
            class="payment__input"
            placeholder="Введите название компании"
            v-model="form.company_name_payment"
            :error="getError('company_name_payment')"
          />
        </div>
      </div>

      <div class="payment__card">
        <div class="payment__input-title">У получателя счетов тот же адрес, что у вашего объекта размещения?</div>

        <div class="payment__radio payment__input-box">
          <base-radio-button
            label="Да"
            :unique-key="true"
            name="one"
            v-model="form.is_address"
          />
          <base-radio-button
            label="Нет"
            :unique-key="false"
            name="two"
            v-model="form.is_address"
          />
        </div>

        <slide>
          <div v-if="!form.is_address">
          <div class="payment__input-box">
            <div class="payment__input-title">Выберите страну/территорию, где находится получатель счетов</div>
          </div>

          <div class="payment__input-box">
            <div class="payment__input-title">Город</div>
            <base-select
              :options="cities"
              label="name"
              v-model="form.city"
            />
          </div>

          <div class="payment__input-box">
            <div class="payment__input-title">Адрес</div>
            <base-input
              class="payment__input"
              placeholder="Укажите адрес"
              v-model="form.address"
            />
          </div>

          <div class="payment__input-box">
            <div class="payment__input-title">Почтовый индекс</div>
            <base-input
              class="payment__input"
              placeholder="Укажите индекс"
              v-model="form.post_index"
            />
          </div>
        </div>
        </slide>
      </div>

      <div class="payment__card">
        <div class="payment__title">Завершение регистрации</div>
        <p class="payment__text">Осталось совсем чуть-чуть</p>
        <div class="mt-24 mb-24">Чтобы завершить регистрацию поставьте галочки внизу</div>
        <base-confirm v-model="confirm">
          Я потверждаю что когда все будет готово, нажмите на кнопку, которая
          появится ниже, чтобы перейти к новой странице вашего объекта и начать работу
        </base-confirm>
      </div>

      <div class="payment__actions mt-24">
        <base-button variant="next" @click="save">
          Завершить регистрацию и открыть объект для бронирования
        </base-button>
        <base-button>
          Завершить регистрацию, но открыть объект для бронирования
        </base-button>
      </div>

    </div>
  </div>
</template>

<script>
import BaseRadioButton from "@/components/base/BaseRadioButton";
import BaseCheckbox from "@/components/base/BaseCheckBox";
import BaseConfirm from "@/components/base/BaseConfirm";
import BaseButton from "@/components/base/BaseButton";

import {mapActions, mapGetters} from "vuex";
import { required, minLength, maxLength, requiredIf } from 'vuelidate/lib/validators';
import Slide from "@/components/transitions/Slide";
import BaseSelect from "@/components/base/BaseSelect";

export default {
  name: "payment",
  components: {BaseSelect, Slide, BaseButton, BaseConfirm, BaseCheckbox, BaseRadioButton},
  data: () => ({
    loading: true,
    confirm: false,
    form: {
      pos_terminal: null,
      name_payment: null,
      is_address: false,
      company_name_payment: null,
      address: null,
      city: null,
      post_index: null,

    },
    errors: {}
  }),
  validations: {
    form: {
      is_address: {required},
      city: { required },
      country: { required },
      address: { required },
      post_index: { required, maxLength: maxLength(20)},
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    ...mapGetters({
      payment: "hotel/info/getPayment",
      countries: "hotel/regions/getCountries",
      cities: "hotel/regions/getCities"
    })
  },
  methods: {
    ...mapActions({
      fetchPayment: "hotel/info/fetchPayment",
      changePayment: "hotel/info/changePayment",
      fetchCountries: "hotel/regions/fetchCountries",
      fetchCities: "hotel/regions/fetchCities"
    }),
    getError(errorMap) {
      return errorMap.split('.').reduce((o,i) => (o?.[i] || null), this.errors);
    },
    async getPayment(id) {
      await this.fetchPayment({id});
      if (this.payment) this.form = JSON.parse(JSON.stringify(this.payment));
    },
    isValid() {
      if (!this.confirm) {
        return false;
      }
      this.$v.form.$touch();
      return !this.$v.form.$anyError;
    },
    async save() {
      this.loading = true;
      await this.changePayment({
        id: this.id,
        form: this.form,
        successCallback: () => {
          this.loading = false;
          this.$router.push(`/my-business/places`)
        },
        errorCallback: (errors) => {
          // console.log("Hey Error")
          // console.log(errors)
          this.errors = errors
          // console.log(this.errors)
        }
      });
    }
  },
  async mounted() {
    if (this.id) await this.getPayment(this.id);
    this.loading = false;
    await this.fetchCountries()
    await this.fetchCities({id:5})
  }
}
</script>

<style lang="scss" scoped>
.payment {

  &__title {
    font-size: $fs__middle;
    font-weight: 700;
    margin-bottom: 8px;
    color: black;
  }

  &__text {
    font-size: $fs__default;
    color: $color__font-secondary;
  }

  &__description {
    font-size: $fs__default;
    margin-bottom: 24px;
    margin-top: 40px;
    color: $color__font-secondary;
  }

  &__wrapper {
    width: 100%;
    max-width: 726px;
  }

  &__card {
    background: #FFFFFF;
    border-radius: $border-radius__middle;
    margin-bottom: 16px;
    padding: 24px;
  }

  &__input-box {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
  }

  &__input-title {
    font-size: $fs__default;
  }

  &__radio {
    display: flex;
    flex-direction: row;
  }

  &__input {
    margin-top: 8px;
    max-width: 345px;
  }

}
</style>
