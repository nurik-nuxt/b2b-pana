<template>
  <svg class="circle-progress" :height="height" :width="height">

    <!-- BACK -->
    <circle
      class="circle-progress__back"
      :r="radius" :cx="space" :cy="space"
      fill="transparent"
      :transform="`rotate(-90 ${space} ${space})`"
      :stroke-width="strokeWidth"
      :stroke-dasharray="fullStrokeDashArray"
      stroke-dashoffset="0"
    />

    <!-- FRONT -->
    <circle
      class="circle-progress__front"
      :r="radius" :cx="space" :cy="space"
      fill="transparent"
      :transform="`rotate(-90 ${space} ${space})`"
      :stroke-width="strokeWidth"
      :stroke-dasharray="fullStrokeDashArray"
      :stroke-dashoffset="percentStrokeDashArray"
    />

  </svg>
</template>

<script>
export default {
  name: "circleProgress",
  props: {
    full: {
      type: [Number],
      default: 100
    },
    value: {
      type: [Number],
    },
    height: {
      type: [Number, String],
      default: 40
    },
    strokeWidth: {
      type: [Number, String],
      default: 2
    }
  },
  computed: {
    radius() {
      return this.height/2 - this.strokeWidth;
    },
    space() {
      return this.radius + this.strokeWidth;
    },
    fullStrokeDashArray() {
      return this.radius * 2 * 3.14;
    },
    percentStrokeDashArray() {
      return this.fullStrokeDashArray - ((this.value/this.full) * this.fullStrokeDashArray);
    }
  }
}
</script>

<style lang="scss" scoped>
.circle-progress {

  &__back {
    stroke: $color__background-primary;
  }

  &__front {
    stroke: $color__orange;
    transition: stroke-dashoffset .3s linear;
  }

}
</style>
