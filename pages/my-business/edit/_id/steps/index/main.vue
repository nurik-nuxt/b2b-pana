<template>
  <div class="main">
    <div class="main__wrap">
      <h1 class="main__wrap-title">{{profile.first_name}}, добро пожаловать!</h1>
      <p class="main__wrap-description">Для начала укажите название и адрес вашего объекта, а также контактные данные.</p>
    </div>
    <div class="main__wrap">
      <BaseInput
        v-model="form.title"
        placeholder="Введите название"
        title="Как называется ваш объект?"
        message="Это название будут видеть гости при поиске варианта проживания."
        :error="errors['title']"
      />
      <BaseTextArea
        v-model="form.description"
        :row="4"
        title="Описание объекта"
        placeholder="Например: Отель расположен в Алматы, в 11 км от высокогорного спортивного комплекса"
        :error="errors['description']"
      />
      <BaseSelect
        v-model="form.stars"
        :options="hotelStars"
        label="value"
        placeholder="Не применяется"
        title="Количество звезд"
        name="options"
        :error="errors['stars']"
        @input="selectStar"
      />
    </div>
    <div class="main__wrap">
      <h1 class="main__wrap-title">Контактные данные</h1>
      <BaseInput
        v-model="form.contact_person"
        title="Контактное лицо"
        placeholder="Введите название"
        :error="errors['contact_person']"
      />
      <BaseInput
        v-model="form.contact_number"
        title="Контактный номер телефона"
        is-mask
        :placeholder="'+7 (___) ___ __ __'"
        :error="errors['contact_number']"
      />
      <BaseInput
        v-model="form.alt_contact_number"
        title="Альтернативный номер телефона"
        placeholder="Введите название"
        status
        is-mask
        :placeholder="'+7 (___) ___ __ __'"
        :error="errors['alt_contact_number']"
      />
      <h1 class="main__wrap-radio">Вы представляете управляющую компанию, или ваш объект размещения — часть группы или сети?</h1>
      <div class="main__radio">
        <base-radio-button
          :unique-key="true"
          name="yes"
          label="Да"
          v-model="form.is_manager"
        />
        <base-radio-button
          :unique-key="false"
          label="Нет"
          name="no"
          v-model="form.is_manager"
        />
      </div>
        <BaseInput
          v-model="form.company_name"
          :title="'Название компании, группы или сети'"
          placeholder="Введите название"
          :error="errors['company_name']"
        />
    </div>
    <div class="main__wrap">
      <h1 class="main__wrap-title">Где находится ваш объект?</h1>
      <BaseInput
        v-model="form.address.address"
        title="Улица и номер дома"
        placeholder="Введите название"
        :error="getError('address.address')"
      />
      <BaseInput
        v-model="form.address.address2"
        title="Адрес строка 2"
        placeholder="Введите название"
        :error="getError('address.address2')"
      />
      <BaseSelect
        placeholder="Введите название"
        title="Страна/территория"
        valueField=""
        :dictionary="Dictionary.countries"
        :value="form.address.country"
        :error="getError('address.country')"
        @input="selectCountry"
      />
      <Slide>
      <BaseSelect
        v-if="form.address.country"
        placeholder="Введите название"
        title="Город"
        :dictionary="Dictionary.cities"
        :dictionaryPayload="{country: form.address.countryId}"
        valueField=""
        :value="form.address.city"
        :error="getError('address.city')"
        @input="selectCity"
      />
      </Slide>
      <BaseInput
        v-model="form.address.post_index"
        :title="'Почтовый индекс'"
        :placeholder="'Например: Алматы'"
        :error="getError('address.post_index')"
      />
    </div>

    <div class="main__actions">
      <base-button class="main__actions__back" variant="cancel"><- Назад</base-button>
      <base-button variant="next" @click="next">Продолжить</base-button>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { required, minLength, requiredIf } from 'vuelidate/lib/validators'
import BaseInput from "@/components/base/BaseInput";
import BaseTextArea from "@/components/base/BaseTextArea";
import BaseSelect from "@/components/base/BaseSelect";
import BaseRadioButton from "@/components/base/BaseRadioButton";
import Slide from "../../../../../../components/transitions/Slide";
import {Dictionary} from "@/store/dictionary";

export default {
  name: "main",

  components: {Slide, BaseRadioButton, BaseSelect, BaseTextArea, BaseInput},

  computed: {
    ...mapGetters({
      profile: "auth/getProfile",
      mainInfo: "hotel/info/getMainInfo",
      countries: "hotel/regions/getCountries",
      cities: "hotel/regions/getCities"
    }),
    id() {
      return this.$route.params.id
    },
    hotelStars() {
      let options = [{id:"нет звезд",value:"нет звезд"}];
      for (let i=1; i<=5; i++)
        options.push({id: i, value: i});
      return options;
    },
  },

  data: () => ({
    Dictionary,
    loading: true,
    form: {
      company_name: null,
      description: null,
      stars: null,
      contact_person: null,
      contact_number: null,
      alt_contact_number: null,
      address: {
        address: null,
        address2: null,
        city: null,
        country: 5,
        countryId: 5,
        city_name: null,
        country_name: null,
        post_index: null,
        name: null,
        is_manager: null
      },
      title: null,
      is_manager: null
    },
    errors: {},
  }),
  validations: {
    form: {
      company_name: { required },
      description: { required },
      stars: { required },
      contact_person: { required },
      contact_number: { required },
      title: { required },
      address: {
        address: { required },
        address2: { required },
        city: {required},
        country: {required},
        post_index: {required},
      },
      is_manager : { required }
    }
  },
  methods: {
    ...mapActions({
      fetchMain: "hotel/info/fetchMain",
      changeMain: "hotel/info/changeMain",
      fetchCountries: "hotel/regions/fetchCountries",
      fetchCities: "hotel/regions/fetchCities"
    }),
    getError(errorMap) {
      return errorMap.split('.').reduce((o,i) => (o?.[i] || null), this.errors);
    },
    async getMainInfo() {
      this.loading = true;
      await this.fetchMain({id:this.id});
      this.form = JSON.parse(JSON.stringify(this.mainInfo));
      this.loading = false;
    },
    async next() {
      this.errors = {};
      this.$v.form.$touch();
      await this.changeMain({
        id: this.id,
        data: this.form,
        successCallback: () => {
          this.$router.push(`/my-business/edit/${this.id}/steps/room`)
        },
        errorCallback: (errors) => {
          this.errors = errors;
        }
      })
    },
    selectCountry({id, name}){
      this.form.address.countryId = id;
      this.form.address.country = name;
    },
    selectCity({id, name}){
      this.form.address.city = name;
    },
    async selectStar(e){
      this.form.stars = e
    }
  },

  mounted() {
    this.getMainInfo();
  }

}
</script>

<style scoped lang="scss">
.main{
  margin-top: 39px;

  &__wrap{
    background: #FFFFFF;
    border-radius: 12px;
    padding: 24px;
    max-width: 726px;
    margin-bottom: 16px;
    &-title{
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 150%;
      color: #111111;
      margin-bottom: 6px;
    }

    &-description{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 150%;
      color: #777777;
    }
    &-radio{
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color: #111111;
      margin-top: 34px;
    }
  }

  &__actions {
    display: flex;
    flex-direction: row;

    &__back {
      margin-right: 10px;
    }
  }
  &__radio {
    display: flex;
    flex-direction: row;
    margin: 15px 0;
  }
}
</style>
