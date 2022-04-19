<template>
  <div class="select-number" @click="selectNumber(selectedNumber)">
    {{ selectedNumber }}
  </div>
</template>

<script>
export default {
  name:"BaseNumber",
  props:{
    selectedNumber:{
      type:Number,
      default:1
    },
    isActive:{
      type:Boolean,
      default: false
    }
  },
  methods:{
    selectNumber(e){
      this.$emit('select',e)
    }
  }
}
</script>

<style scoped lang="scss">
//.select-number{
//  padding: 18px 24px;
//  background: #F8F8F8;
//  max-width: 56px;
//  border-radius: 12px;
//  color: #888888;
//  cursor: pointer;
//  .active{
//    background: #5684FB;
//    color: #FFFFFF;
//  }
//}
</style>
