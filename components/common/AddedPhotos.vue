<template>
  <div class="photos" :style="{ 'margin-top': mt + 'px' }" v-if="value && value.images && value.images.length">
    <div class="photo-wrp" v-for="(img, index) in value.images" :key="index">
      <img class="photo" v-if="!base64" :src="`http://45.136.56.44:8001/${img.image}`" alt="photo"/>
      <img class="photo" v-if="base64" :src="img.image" alt="photo"/>
      <span class="photo-delete" @click="removeImg(img.id, index)">
        <img src="@/static/icons/delete.svg" alt="" />
      </span>
    </div>
  </div>
<!--  <div v-else :style="{ 'margin-top': mt + 'px' }">-->
<!--    <p class="text &#45;&#45;title">Нет фотографии</p>-->
<!--  </div>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    value: {
      type: [Array, Object],
      default: () => []
    },
    type: {
      type: String,
      default: () => "photosOfTheObject",
    },
    mt: {
      type: String,
      default: 0,
    },
    base64: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    id(){
      return this.$route.params.id
    }
  },

  watch: {
    value(val) {
      console.log("images", val);
    }
  },

  methods: {
    ...mapActions({
      deleteImage:"hotel/info/deleteImage"
    }),
    async removeImg(id, index){
      this.$emit("remove", id);
      this.$emit("removeIndex", index);
      // await this.deleteImage({id:this.id,image_id:e})
      // await this.$store.dispatch("hotel/info/fetchImages", {id: this.id})
    }
  },
};
</script>

<style lang="scss" scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  .photo-wrp {
    position: relative;
    .photo {
      border-radius: 12px;
      width: 165px;
      height: 113px;
    }
    .photo-delete {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
}
</style>
