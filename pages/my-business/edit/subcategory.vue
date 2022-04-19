<template>
  <MyBusinessLayout>
    <template #content>
      <CategoryCard
        v-for="subcategory in subcategories"
        :title="subcategory.name"
        v-bind:key="subcategory.id"
        :description="subcategory.description"
        :category-id="subcategory.id"
        :image-link="subcategory.image"
        @clicked="select"
        :checked="subcategory.id === selectId"
        :class="{checked:subcategory.id === selectId,}"
      />
    </template>
    <template #confirm>
      <div class="confirm-buttons">
        <BaseButton @click="createHotel" variant="next">Продолжить</BaseButton>
      </div>
    </template>
  </MyBusinessLayout>
</template>

<script>
import HotelAddLayout from "@/components/common/layouts/HotelAddLayout";
import CategoryCard from "@/components/common/cards/CategoryCard";
import BaseButton from "@/components/base/BaseButton";
import MyBusinessLayout from "~/components/common/layouts/MyBusinessLayout";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "subcategory",

  components: {MyBusinessLayout, BaseButton, CategoryCard, HotelAddLayout},

  data:() =>({
    selectId:null
  }),

  computed: {
    ...mapGetters({
      subcategories:"category/getSubcategories"
    }),
    id(){
      return this.$route.query.type
    }
  },

  methods: {
    async select(e){
      this.selectId = e;
    },
    ...mapActions({
      fetchSubcategories:"category/fetchSubcategories",
      create: "hotel/list/create",
    }),
    async createHotel(){
      await this.create({
        subcategory: this.selectId,
        successCallback: id => {
          this.$router.push(`/my-business/edit/${id}/steps/main`)
        },
      });
    }
  },

  async fetch(){
    await this.fetchSubcategories(this.id)
  }
}
</script>

<style scoped lang="scss">
.confirm-buttons{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.btn-orange{
  background: #FB6B56;
  border-radius: 12px;
  padding: 18px 127px;
  text-decoration: none;
  outline: none;
  color: #FFFFFF;
}
</style>
