import Vue from "vue";
Vue.filter('thousandSeparator', function (value) {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
});
