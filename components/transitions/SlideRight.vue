<template>
  <transition name="slide-right">
    <slot/>
  </transition>
</template>

<script>
export default {
  name: "SlideRight"
}
</script>

<style scoped>
.slide-right-leave-active,
.slide-right-enter-active {
  transition: 1s;
  position: relative;
}
.slide-right-enter {
  transform: translate(-100%, 0);
}
.slide-right-leave-to {
  transform: translate(100%, 0);
}
</style>
