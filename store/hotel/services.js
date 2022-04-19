export const state = () =>({
  services:[],
  servicesFacility:[]
})

export const getters = {
  getServices: state => state.services,
  getServicesFacility: state => state.servicesFacility
}

export const mutations = {
  setServices(state, services){
    state.services = services
  },
  set(state,[namespace,value]){
    state[namespace] = value;
  }
}

export const actions = {
  async fetchServices({commit}){
    await this.$api.rooms.getServices.get()
      .then(res =>{
        commit("set",["services",res])
      })
  },

  async fetchServicesFacility({ commit }){
    await this.$api.dictionary.services.get()
      .then(res =>{
        commit("set",["servicesFacility",res])
      })

  }
}
