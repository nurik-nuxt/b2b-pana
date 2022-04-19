import Vue from "vue";

/* HOW TO USE
* <some-element v-loading="booleanValue"></some-element>  -->  for element
* <some-element v-loading.full="booleanValue"></some-element>  -->  for full window
* <some-element v-loading.mini="booleanValue"></some-element>  -->  for element mini loader
* */

const loadingService = {
  id: "loading-directive",
  toggleShow(parent, binding, loader = null) {
    Vue.nextTick(() => {
      if (!parent) return;

      const isFull = binding.modifiers.full || false;
      let element;

      if (isFull) element = document.body.getElementsByClassName(this.id)[0];
      else element = loader || parent.getElementsByClassName(this.id)[0];

      if (binding.value) {
        parent.style.position = 'relative';
        element.style.display = null;
        if (isFull) element.style.overflow = 'hidden';
      }
      else {
        parent.style.position = null;
        element.style.display = 'none';
        if (isFull) element.style.overflow = null;
      }
    })
  },
  mount(el, binding) {
    const isFull = binding.modifiers.full || false;
    const isMini = binding.modifiers.mini || false;

    let loader = document.createElement("div");
    loader.id = this.id;
    loader.classList.add("loader");
    if (isMini) loader.classList.add("loader--mini");
    loader.classList.add(this.id);
    loader.style.display = 'none';

    if (isFull) document.body.appendChild(loader);
    else el.appendChild(loader);
  }
};

Vue.directive('loading', {
  bind: (el, binding, vnode) => {
    loadingService.mount(el, binding);
    loadingService.toggleShow(el, binding);
  },
  update: (el, binding, vnode) => {
    loadingService.toggleShow(el, binding);
  }
})
