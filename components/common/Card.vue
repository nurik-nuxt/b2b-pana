<template>
  <div class="col-md-6">
    <div class="card">
      <div class="card-header p-0">
        <div class="card-img">
          <img src="@/static/images/card-img.png" alt="" />
        </div>
        <BaseSelectButton
          type="radio"
          :value="link"
          :name="name"
          @change="$emit('input', $event)"
        >
        </BaseSelectButton>
      </div>
      <div class="card-body p-0">
        <p class="card- text --bold">{{ title }}</p>
        <p class="card-description text --silver">
          Отели, гостевые дома, хостелы, отели типа «постель и завтрак»,
          апарт-отели
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name:{
      type: String,
      default: ()=> '',
    },
    value:{
      type: String,
      default: ()=> '',
    },
    title:{
      type: String,
      default: ()=> '',
    },
    link:{
      type: String,
      default: ()=> '',
    },
  },
  data: () => ({
    picked: "",
  }),
};
</script>

<style lang="scss">
.card {
  padding: 24px;
  border: none;
  border-radius: 16px;
  &-body {
    margin-top: 1rem;
  }
  &-header {
    background: none;
    border: none;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    img {
      width: 100%;
      height: 100%;
      max-width: 56px;
      max-height: 56px;
    }
  }
}
</style>
