<template>
  <transition name="slide-left">
    <slot/>
  </transition>
</template>

<script>
export default {
  name: "SlideLeft"
}
</script>

<style scoped>
.slide-left-leave-active,
.slide-left-enter-active {
  transition: 1s;
  position: relative;
}
.slide-left-enter {
  transform: translate(100%, 0);
}
.slide-left-leave-to {
  transform: translate(-100%, 0);
}
</style>
