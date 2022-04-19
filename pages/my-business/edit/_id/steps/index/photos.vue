<template>
  <div class="photos">
    <div class="photos__title">Фотографии объекта</div>
    <div class="photos__description">Отличные фотографии помогут гостям получить полное представление о вашем объекте. Загрузите изображения высокого качества, позволяющие увидеть ваш объект со всех сторон. Эти фотографии будут показаны на странице вашего объекта.</div>
    <div class="photos__wrap">
      <div class="photos__wrap__add">
        <p>Добавьте номера и укажите информацию о кроватях, планировке и ценах для гостей.</p>
        <CommonPhotoUpload type="photosOfTheRoom" base64 @input="addPhoto($event)"/>
      </div>
      <div class="photos__wrap__uploaded">
        <CommonAddedPhotos mt="26" type="photosOfTheRoom" :value="images" @remove="deleteImage({id, image_id: $event})"/>
      </div>
    </div>
    <div class="photos__actions">
      <base-button class="photos__actions__back" variant="cancel"><- Назад</base-button>
      <base-button variant="next" @click="next">Продолжить</base-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name:'photos',

  watch:{
    images:function (newVal,oldVal){
      if(newVal ==!oldVal){
        this.$store.dispatch("hotel/info/fetchImages", {id: this.id})
      }
    },
    deep: true
  },

  computed: {
    ...mapGetters({
      images: "hotel/info/getImages"
    }),
    id(){
      return this.$route.params.id
    }
  },

  methods: {
    ...mapActions({
      sendImages:"hotel/info/sendImages",
      pushImage: "hotel/info/pushImage",
      deleteImage:"hotel/info/deleteImage"
    }),
    addPhoto(base64) {
      this.pushImage({id: this.id, base64});
    },
    async sendPhotos(){
      await this.sendImages({
        id: this.id,
        data: this.images
      })
    },
    next() {
      this.$router.push(`/my-business/edit/${this.id}/steps/rules`);
    }
  },

  async fetch(){
    await this.$store.dispatch("hotel/info/fetchImages", {id: this.id})
  },

  created() {
    this.$store.dispatch("hotel/info/fetchImages", {id:this.id})
  }

}
</script>

<style scoped lang="scss">
.photos{
  max-width: 938px;
  margin-top: 39px;
  &__title{
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 130%;
    color: #111111;
    margin-bottom: 8px;
  }
  &__description{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 150%;
    color: #555555;
    margin-bottom: 24px;
  }
  &__wrap{
    background: #FFFFFF;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    &-hint{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 150%;
      text-align: center;
      color: #777777;
    }
    &__uploaded{
      display: flex;
      flex-direction: row;
      border-top: 1px solid #DFDFDF;
      padding: 31px 27px;
      justify-content: space-around;
    }
    &__add{
      padding: 77px 250px;
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      p{
        font-family: Inter;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 150%;
        text-align: center;
        color: #777777;
      }
    }
  }
  &__actions {
    display: flex;
    flex-direction: row;
    margin-top: 32px;

    &__back {
      margin-right: 10px;
    }
  }
}
</style>
