<template>
  <div class="switch-steps">
    <BaseButton bgColor="btn --outline_orange" @click.native="$router.go(-1)"> Назад </BaseButton>
    <BaseButton bgColor="btn --orange" @click.native="nextStep()">
      Продолжить
    </BaseButton>
  </div>
</template>

<script>
export default {
  methods: {
    nextStep() {
      this.$emit("nextStep");
    },
  },
};
</script>

<style></style>
