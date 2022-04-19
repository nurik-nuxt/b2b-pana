<template>
  <div class="facilities">
    <div class="facilities__wrapper">

      <div class="facilities__description">
        <h1 class="facilities__title">Удобства и услуги</h1>
        <span>Укажите общую информацию о своем объекте (например, удобства, интернет, парковка и языки, на которых говорит ваш персонал).</span>
      </div>

      <div class="facilities__card">
        <div class="facilities__title">Парковка</div>
        <p class="facilities__under-title">Гостям предоставляется парковка?</p>
        <div class="facilities__parking">
          <base-select
              v-model="form.parking_breakfast.parking"
              placeholder="Тип парковки"
              :options="parkingChoice"
              valueField="id"
              @input="selectParkingType($event)"
          />
          <base-select
              v-model="form.parking_breakfast.is_private_parking"
              placeholder="Выберите услугу"
              :options="parkingType"
              valueField="value"
              @input="selectTypeParking($event)"
          />
          <base-select
              v-model="form.parking_breakfast.located_in_area"
              placeholder="Выберите услугу"
              :options="parkingLocation"
              valueField="value"
              @input="selectParkingLocation($event)"
          />
        </div>
        <Slide
            v-if="form.parking_breakfast.parking === 2"
        >
          <BaseInput
              :title="'Цена за парковочное место в KZT (тенге)'"
              :placeholder="'19 234 тг'"
              v-model="form.parking_breakfast.price"
              type="number"
          />
        </Slide>
        <p class="facilities__card-description">Эта информация особенно важна тем, кто путешествует на автомобиле.</p>
      </div>

      <div class="facilities__card">
        <div class="facilities__title">Завтрак</div>
        <div class="facilities__under-title">Для гостей сервируется завтрак?</div>
        <base-select
            v-model="form.parking_breakfast.breakfast_free"
            :options="breakfastType"
            valueField="value"
            @input="selectBreakfastType($event)"
        />
        <BaseInput
            :title="'Цена за завтрак в тенге (KZT) (с человека в сутки с учетом всех налогов и сборов)'"
            :placeholder="'19 234 тг'"
            type="number"
            v-model="form.parking_breakfast.breakfast_price"
            :error="getError('parking_breakfast.breakfast_price')"
        />
        <div class="facilities__under-title">Завтрак какого типы вы подаете?</div>
        <base-select
            v-model="form.parking_breakfast.breakfast_type"
            :dictionary="Dictionary.breakfasts"
            valueField="id"
            @input="selectTypeBreakfast($event)"
        />
      </div>

      <div class="facilities__card">
        <div class="facilities__title">Языки</div>
        <p class="facilities__card-description">На каких языках говорят у вас в заведении?</p>
        <BaseMultiSelect
            :languages="languages"
        />
      </div>

      <div class="facilities__card">
        <div class="facilities__title">Удобства</div>
        <p class="facilities__under-title">Какие удобства есть в вашем заведении? </p>

        <div class="facilities__checkboxes">
          <base-confirm
              :value="haveConveniences(service)"
              v-for="(service, index) in facilityServices" :key="index"
              black-text
              @input="toggleConveniences(service)"
          >{{ service.name }}</base-confirm>
        </div>
      </div>

      <div class="facilities__actions">
        <base-button variant="cancel"><- Назад</base-button>
        <base-button variant="next" @click="next">Продолжить</base-button>
      </div>
    </div>
  </div>
</template>
<script>
import BaseSelect from "@/components/base/BaseSelect";
import BaseConfirm from "@/components/base/BaseConfirm";
import {mapActions, mapGetters} from "vuex";
import {Dictionary} from "@/store/dictionary";
import BaseTextArea from "@/components/base/BaseTextArea";
import BaseButton from "@/components/base/BaseButton";
import BaseIcon from "@/components/base/BaseIcon";
import PhotoUpload from "@/components/common/photo/photoUpload";
import PhotoList from "@/components/common/photo/photoList";
import BaseInput from "@/components/base/BaseInput";
import Slide from "@/components/transitions/Slide";
import BaseMultiSelect from "~/components/base/BaseMultiSelect";
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  components: {
    BaseMultiSelect,
    Slide, BaseInput, PhotoList, PhotoUpload, BaseIcon, BaseButton, BaseTextArea, BaseConfirm, BaseSelect},
  data: () => ({
    Dictionary,
    loading: true,
    langValue:[],
    breakfastType: [
      {id: 1, name: "Да, это включено в стоимость",value:true},
      {id: 2, name: "Да, по запросу",value: false}
    ],
    parkingChoice: [
      {id:1, name:"Бесплатная"},
      {id:2, name:"Платная"},
      {id:3, name:"Нет"},
    ],
    parkingType: [
      {id: 1, name: "Общественная", value: false},
      {id: 2, name: "Частная", value: true}
    ],
    parkingLocation: [
      {id: 1, name: "За пределами територии", value: false},
      {id: 2, name: "Внутри територи", value: true}
    ],
    form: {
      parking_breakfast:{
        breakfast_free:null,
        breakfast_price:null,
        breakfast_type:null,
        is_private_parking:null,
        located_in_area:null,
        parking:null,
        price:null
      },
      languages:[],
      conveniences:[]
    },
    errors: {},
  }),
  validation: {
    form: {
      parking_breakfast:{
        breakfast_free: { required },
        breakfast_price: { required },
        breakfast_type: { required },
        is_private_parking: { required },
        located_in_area: { required },
        parking: { required },
        price: { required }
      }
    }
  },
  computed: {
    ...mapGetters({
      convenience: "hotel/info/getConvenience",
      dictionaries: "dictionary/getDictionaries",
      languages: "hotel/language/getLanguages",
      facilityServices:"hotel/services/getServicesFacility"
    }),
    services() {
      return this.dictionaries.services || [];
    },
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    selectParkingType(e){
      this.form.parking_breakfast.parking = e
    },
    selectBreakfastType(e){
      this.form.parking_breakfast.breakfast_free = e
    },
    selectTypeParking(e){
      this.form.parking_breakfast.is_private_parking = e
    },
    selectTypeBreakfast(e){
      this.form.parking_breakfast.breakfast_type = e
    },
    selectParkingLocation(e){
      this.form.parking_breakfast.located_in_area = e
    },
    ...mapActions({
      fetchConvenience: "hotel/info/fetchConvenience",
      fetchDict: "dictionary/fetchDict",
      addConvenience: "hotel/info/addConveniences"
    }),
    getError(errorMap) {
      return errorMap.split('.').reduce((o,i) => (o?.[i] || null), this.errors);
    },
    async getInfo() {
      this.loading = true;
      await this.fetchConvenience({id: this.id});
      this.form = JSON.parse(JSON.stringify(this.convenience));
      this.loading = false;
    },
   async next() {
      this.errors = {};
      await this.addConvenience({
        id:this.id,
        data:this.form,
        successCallback: () => {
        this.$router.push(`/my-business/edit/${this.id}/steps/services`)
        },
        errorCallback: (errors) =>{
          this.errors = errors
        }
      })
      // await this.$router.push(`/my-business/edit/${this.id}/steps/rules`)

    },
    async fetchServices() {
      await this.fetchDict({dictionary: Dictionary.services});
    },
    toggleConveniences(service) {
      if (!this.haveConveniences(service)) {
        this.addConveniences(service);
      }
      else {
        this.removeConveniences(service);
      }
    },
    addConveniences(service) {
      this.form.conveniences.push({
        type: service.id,
        name: service.name,
      })
      // console.log(this.form.conveniences)
    },
    removeConveniences(service) {
      let list = this.form.conveniences.slice();
      const index = list.findIndex(convenience => convenience.type === service.id)
      if (index > -1) list.splice(index, 1);
      this.form.conveniences = list;
      // console.log(list)
    },
    haveConveniences(service) {
      return this.form.conveniences
        .some(convenience => convenience.type === service.id);
    }
  },
  created() {
    this.fetchServices();
    this.getInfo();
    this.$store.dispatch("hotel/language/fetchLanguages")
    this.$store.dispatch("hotel/services/fetchServicesFacility")
  }
}
</script>

<style scoped lang="scss">
.facilities{
  &__title {
    font-size: $fs__middle;
    font-weight: 700;
    margin-bottom: 8px;
    color: black;
  }

  &__wrapper {
    width: 100%;
    max-width: 726px;
  }

  &__description {
    font-size: $fs__default;
    margin-bottom: 24px;
    margin-top: 40px;
    color: $color__font-secondary;
  }

  &__card {
    background: #FFFFFF;
    border-radius: $border-radius__middle;
    margin-bottom: 16px;
    padding: 24px;

    &-description{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 150%;
      color: #797979;
    }
  }
  //&__text {
  //  font-size: $fs__default;
  //  color: $color__font-secondary;
  //}
  &__under-title{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    color: #000000;
    margin-bottom: 12px;
  }

  &__parking{
    display: grid;
    grid-template-columns: 4fr 2fr 3fr;
    grid-gap: 10px;
    @media(max-width: $break-point__mobile) {
      display: flex;
      flex-direction: column;
    }
  }

  &__checkboxes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 16px;
    * {margin: 0 12px 8px 0;}
    @media(max-width: $break-point__mobile) {
      display: flex;
      flex-wrap: wrap;
      * {background: $color__background-primary;}
      ::v-deep{.base-confirm {
        padding: 8px 12px;
        &__tick {background: white;}
      }}
    }
  }

  &__services {
    margin-top: 50px;
  }

  &__service {
    margin-bottom: 32px;

    &__head {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    &__title {
      font-size: $fs__default;
      font-weight: bold;
    }

    &__add-image {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color__font-link;
      &:hover {opacity: .8}
      &:active {opacity: .6}
    }

  }

  &__actions {
    display: flex;
    flex-direction: row;

    *:first-child {
      margin-right: 10px;
    }
  }

}
</style>
