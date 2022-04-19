<template>
  <div class="index">
    <NavSteps/>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import NavSteps from "@/components/common/NavSteps";

export default {
  components: {NavSteps},
  computed: {
    ...mapGetters({
      hotelInfo:"hotel/getHotelMainInfo"
    }),
    id(){
      return this.$route.params.id
    }
  },

  async fetch(){
    await this.fetchHotelMainInfo(this.id)
  },

  methods:{
    ...mapActions({
      fetchHotelMainInfo:"hotel/fetchHotelMainInfo"
    }),
  },
}
</script>

<style scoped lang="scss">
.index{
  padding: 0 172px;
  margin-top: 80px;
  @media (max-width: $break-point__mobile ) {
    margin-top: 16px;
    padding: 0 16px;
  }
}
</style>
