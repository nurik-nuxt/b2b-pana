<template>
  <MyBusinessLayout
    :title="title"
    :description="description"
  >
    <template #content>
      <CategoryCard
      />
    </template>

  </MyBusinessLayout>
</template>
<script>
import MyBusinessLayout from "~/components/common/layouts/MyBusinessLayout";
import CategoryCard from "~/components/common/cards/CategoryCard";
export default {
  components: {CategoryCard, MyBusinessLayout},

  data:()=>({
    title:"К какой из категорий ниже больше всего подходит ваш объект?",
    description:null
  }),

  methods:{
    async fetchSubcategories(){
      const res = await this.$api.subcategories.get({
        // params:{
        //   id:
        // }
      })
    }
  }
}
</script>
