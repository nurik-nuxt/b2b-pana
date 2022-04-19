<template>
  <div class="nav-steps">

        <!-- DESKTOP -->
    <div class="nav-steps__desktop">
      <div
        class="nav-steps__item"
        :class="{ active: stepIndex === index }"
        v-for="(route, index) in routes" :key="index"
        @click="go(route)"
      >
        <base-icon class="ic-12 mr-5" v-show="index < stepIndex">thin-tick</base-icon>
        <div>{{ route.title }}</div>
      </div>
    </div>

        <!-- MOBILE -->
        <div class="nav-steps__mobile">
          <circle-progress class="nav-steps__progress" height="32" :full="7" :value="stepIndex+1"/>
          <div class="nav-steps__progress-text">
            <div class="nav-steps__progress-title">Шаг {{stepIndex+1}} из {{routes.length}}</div>
            <div class="nav-steps__progress-name">{{ route.title }}</div>
          </div>
        </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
import CircleProgress from "./progress/circleProgress";
export default {
  components: {CircleProgress, BaseIcon},
  props: {
    routes: {
      type: Array,  // title, url or subtitle
    },
    clickable: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    go(route) {
      if (this.clickable) {
        this.$router.push({
          name: `my-business-edit-id-steps-index-${route.url}`
        });
      }
    }
  },

  computed: {
    stepIndex() {
      const stepName = this.$route.fullPath.split("steps")[1].replaceAll("/", "");
      return this.routes.findIndex(route => route.url.includes(stepName))
    },
    route() {
      if (this.stepIndex < 0) return {};
      return this.routes[this.stepIndex];
    },
    id() {
      return this.$route.params.id
    },
  }
};
</script>

<style scoped lang="scss">
$breakPoint: 1000px;
.nav-steps{
  background: #FFFFFF;
  border-radius: 12px;

  &__desktop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 100px;
    overflow: auto;

    @media(max-width: $breakPoint) {
      display: none;
    }
  }

  &__item{
    display: flex;
    align-items: center;
    text-decoration: none;
    outline: none;
    color: #999999;
    cursor: pointer;
    margin: 0 10px;
    font-size: $fs__default - 2px;

    &.active{ color: #FB6B56;}
  }

  &__mobile{
    display: flex;
    flex-direction: row;
    //justify-content: center;
    //align-items: center;
    padding: 14px 16px;
    max-width: 500px;

    @media (min-width: $breakPoint) {
      display: none;
    }
  }

  &__progress {
    margin-right: 16px;
  }

  &__progress-text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__progress-title {
    font-size: $fs__default;
    font-weight: 600;
  }

  &__progress-name {
    font-size: $fs__default;
    color: $color__font-secondary;
  }
}
</style>
