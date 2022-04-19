<template>
  <div class="form-step">
    <p class="text --silver form-descr">
      Шаг {{ currentStep }}/{{ allSteps }} (Ваши данные)
    </p>
  </div>
</template>

<script>
export default {
  props: ['currentStep', 'allSteps']
};
</script>

<style></style>
