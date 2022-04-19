<template>
  <div class="housing-status" @keyup.enter="enterHandle">

    <div class="housing-status__title-block">
      <h2 class="housing-status__title">Статус жилья</h2>
      <div class="housing-status__description">Актульный статус по жилью</div>
    </div>

    <div class="housing-status__wrapper">
      <div class="housing-status__card">
        <div class="housing-status__card__title">Статус жилья</div>
        <div class="housing-status__card__description">Какие удобства есть в номере?</div>
        <div class="housing-status__select">
          <base-radio-button
            class="housing-status__radio"
            v-for="radio in radios" :key="radio.value"
            :unique-key="radio.value"
            :value="status"
            @input="selectHandle"
          >
            <div class="housing-status__radio__name">{{ radio.name }}</div>
            <div class="housing-status__radio__description">{{ radio.description }}</div>
          </base-radio-button>
        </div>
      </div>
      <div class="housing-status__actions">
        <base-button
          class="housing-status__save"
          :class="{disabled: !canSave}"
          variant="next"
          @click="saveHandle"
        >Сохранить изменения</base-button>
      </div>
    </div>

    <!-- MODALS -->
    <housing-status-sleeping-modal/>
    <housing-status-annul-modal @annul="select('3')"/>
  </div>
</template>

<script>
import BaseRadioButton from "../../../../components/base/BaseRadioButton";
import HousingStatusSleepingModal from "../../../../components/common/modals/housingStatusSleepingModal";
import HousingStatusAnnulModal from "../../../../components/common/modals/housingStatusAnnulModal";
import {mapActions} from "vuex";
export default {
  name: "housingStatus",
  components: {HousingStatusAnnulModal, HousingStatusSleepingModal, BaseRadioButton},
  data: () => ({
    radios: [
      {value: "1", name: "Опубликовано", description: "Гости могут найти объявление и забронировать свободные даты." },
      {value: "2", name: "В режиме сна", description: "Временно не показывать объявление в результатах поиска" },
      {value: "3", name: "Аннулировать", description: "Навсегда удалить объявление с Pana" },
    ],
    status: null,
  }),
  computed: {
    canSave() {
      return !!this.status;
    },
    id(){
      return this.$route.params.id
    }
  },
  methods: {
    ...mapActions({
      removeHotel:"hotel/list/deleteHotel"
    }),
    enterHandle() {
      if (this.canSave) {
        this.saveHandle();
      }
    },
    async saveHandle() {
      // console.log(this.status)
      if (this.status == 3){
        // console.log(this.status)
        await this.removeHotel({
          id:this.id,
          successCallback: () => {
            this.$router.push(`/my-business/places`)
          }
        })
      }
    },
    selectHandle(value) {
      if (value === "2") {
        this.$modal.show("housing-status-sleeping");
      }
      else if (value === "3") {
        this.$modal.show("housing-status-annul");
      }
      else {
        this.select(value);
      }
    },
    select(value) {
      this.status = value;
    }
  }
}
</script>

<style lang="scss" scoped>
.housing-status {
  $breakPoint: $break-point__mobile;

  &__title-block {
    padding: 24px;
    background: white;
    border-bottom-left-radius: $border-radius__middle;
    border-bottom-right-radius: $border-radius__middle;
  }

  &__title {
    font-size: $fs__middle;
  }

  &__description {
    margin-top: 8px;
    font-size: $fs__default;
  }

  &__wrapper {
    max-width: 726px;
    width: 100%;
  }

  &__card {
    margin-top: 16px;
    padding: 24px;
    background: white;
    border-radius: $border-radius__middle;

    &__title {
      font-size: $fs__middle;
    }

    &__description {
      margin-top: 8px;
      font-size: $fs__default;
      color: $color__gray;
    }
  }

  &__actions {
    margin-top: 24px;
    display: flex;
    justify-content: end;
  }

  &__save {
    @media(max-width: $breakPoint) {
      width: 100%;
    }
  }

  &__select {
  }

  &__radio {
    margin-top: 24px;
    &__name {

    }
    &__description {
      margin-top: 4px;
      color: $color__gray;
    }
  }

}
</style>
