import Vue from "vue";

const modalService = {
  install(Vue){
    this.event = new Vue();

    Vue.prototype.$modal = {
      show(modalName, params=null, savePrev=true) {
        if (modalName === this.$active) return;
        if (savePrev && this.$active) {
          this._queue.push(this.$active);
          this.hide(this.$active, false);
        }
        modalService.event.$emit("show", modalName, params);
        this.$active = modalName;
      },
      hide(modalName, showLast = true) {
        modalService.event.$emit("hide", modalName);
        this.$active = null;
        if (showLast && this._queue.length) {
          this.show(this._queue.pop());
        }
      },
      $event: this.event,
      _queue: [],
      $active: null,
    }
  }
};

Vue.use(modalService);
