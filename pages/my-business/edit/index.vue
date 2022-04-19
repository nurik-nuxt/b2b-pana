<template>
  <MyBusinessLayout>
    <template #content>
      <CategoryCard
        v-for="category in categories"
        :title="category.name"
        v-bind:key="category.id"
        :description="category.description"
        :category-id="category.id"
        :image-link="category.image"
        @clicked="select"
        :checked="category.id === selectId"
        :class="{checked:category.id === selectId,}"
      />
    </template>
    <template #confirm>
      <div class="confirm-buttons">
        <BaseButton @click="next" variant="next">Продолжить</BaseButton>
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
  components: {MyBusinessLayout, BaseButton, CategoryCard, HotelAddLayout},

  data(){
    return{
      // categories:[],
      selectId:null,
    }
  },

  computed:{
    ...mapGetters({
      categories:"category/getCategories"
    }),
    id(){
      return this.$route.params.id
    }
  },

  methods:{
    ...mapActions({
      fetchCategories:"category/fetchCategories"
    }),

    async select(e){
      this.selectId = e;
    },

    async next() {
      this.$router.push({
        name: "my-business-edit-subcategory",
        query: {
          type: this.selectId,
        }
      });
    }
  },

  async fetch(){
    await this.fetchCategories()
  },

  async mounted(){
    // await this.fetchCategories()
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
