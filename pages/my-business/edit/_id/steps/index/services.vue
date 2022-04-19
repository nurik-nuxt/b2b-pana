<template>
  <div class="services">
    <div class="services__wrapper">

    <div class="services__description">
      <h1 class="services__title">Услуги</h1>
      <span>Укажите дополнительные услуги которые можно будет забронировать</span>
    </div>

    <service-card
      v-for="(service, index) in servicesList"
      :value="service"
      :serial="index + 1"
      @change="changeService(index, $event)"
      @delete="deleteHandle(index)"
    />


    <div class="services__card services__add" @click="addHandle">
      <span>Добавить услугу</span>
      <base-icon class="ic-24">add-blue</base-icon>
    </div>

    <div class="services__actions">
      <base-button variant="cancel"><-Назад</base-button>
      <base-button variant="next" @click="next">Продолжить</base-button>
    </div>

    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

import BaseIcon from "@/components/base/BaseIcon";
import BaseButton from "@/components/base/BaseButton";
import ServiceCard from "@/components/common/services/serviceCard";

export default {
  name: "services",
  components: {ServiceCard, BaseButton, BaseIcon},
  data: () => ({
    loading: true,

    servicesList: [],
    serviceExample: {
      type: null,
      description: null,
      price: null,
      per_amount: null,
    },
  }),
  computed: {
    ...mapGetters({
      services: "hotel/info/getServices"
    }),
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions({
      fetchServices: "hotel/info/fetchServices",
      changeServices: "hotel/info/changeServices",
      deleteService: "hotel/info/deleteService"
    }),
    addHandle() {
      this.servicesList.push({...this.serviceExample});
    },
    changeService(index, service) {
      let list = this.servicesList.slice();
      list[index] = service;
      this.servicesList = list;
    },
    async deleteHandle(index) {
      this.servicesList.splice(index, 1);
      // await this.deleteService({id:index+1})
    },
    async next() {
      await this.save();
      await this.$router.push(`/my-business/edit/${this.id}/steps/photos`)
    },
    async getServices(id) {
      await this.fetchServices({id});
      this.servicesList = JSON.parse(JSON.stringify(this.services));
    },
    async save() {
      await this.changeServices({id: this.id, services: this.servicesList});
    },
  },
  async mounted() {
    if (this.id) await this.getServices(this.id);
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
.services {

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
  }

  &__add {
    cursor: pointer;
    color: $color__font-link;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .15s;
    *:first-child {margin-right: 14px;}
    &:hover { opacity: .6 }
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
