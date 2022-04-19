<template>
  <div class="photo-upload">
    <label :for="type" class="custom-file-upload"> Добавить фото</label>
    <input
      type="file"
      :name="type"
      :id="type"
      ref="files"
      accept="image/*"
      multiple
      @change="handleFilesUpload"
    />
    <img src="@/static/icons/plus-circle.svg" alt="" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    type: {
      type: String,
      default: "photosOfTheObject",
    },
    base64: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    files: [],
    imagePreview: [],
  }),

  computed: {
    ...mapGetters({
      images:"photoUpload/getphotosOfTheRoom"
    }),
    id(){
      return this.$route.params.id
    }
  },
  methods: {
     async handleFilesUpload(event) {
       let file = event.target.files[0] || null;

       if (this.base64 && file) {
         file = await this.toBase64(file);
       }

       this.$emit("input", file);
       this.$emit("change", file);
       this.$emit("onChange", file);
      // this.files = [];
      // let uploadedFiles = this.$refs.files.files;
      // for (var i = 0; i < uploadedFiles.length; i++) {
      //   this.files.push(uploadedFiles[i]);
      // }
      //  console.log()
      // await this.getImagePreviews();
      // await this.fetchImages({id:this.id})
    },

    ...mapActions({
      // sendImages:"hotel/info/sendImages",
      // fetchImages:"hotel/info/fetchImages"
    }),

    toBase64(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
       return new Promise((res, req) => {
         reader.addEventListener("load", () => {
           const image = reader.result;
           res(image);
         })
       })
    },
     async getImagePreviews() {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader();
          await reader.addEventListener(
            "load",
            async () => {
              const image = reader.result;
              // console.log("IMAGE", image);
              this.$store.commit(`photoUpload/addingPhotos`, {
                image,
                type: this.type,
              });
              await this.sendImages({
                id: this.id,
                data: this.images
              })
            }
          );
          reader.readAsDataURL(this.files[i]);
        }
      }
       // this.fetchImages({id:this.id})

    },
  },
};
</script>

<style lang="scss" scoped>
.photo-upload {
  display: flex;
  flex-direction: row;
  input{
    display: none;
  }
  label {
    margin-right: 10px;
    color: #5684fb;
    cursor: pointer;
  }
}
</style>
