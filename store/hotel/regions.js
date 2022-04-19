export const state =()=>({
  countries:[],
  cities:[]
})

export const getters = {
  getCountries: state => state.countries,
  getCities: state => state.cities
}

export const mutations = {
  set(state, [namespace,value]){
    state[namespace] = value
  }
}

export const actions = {
  async fetchCountries({ commit }){
    await this.$api.regions.countries.get()
      .then(res =>{
        commit("set", ["countries", res])
      })
  },
  async fetchCities({ commit }, {id}){
    await this.$api.regions.cities.get({ params: {country:id} })
      .then(res => {
        commit("set",["cities", res])
      })
  }
}
