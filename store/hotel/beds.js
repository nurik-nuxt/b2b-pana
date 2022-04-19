export const state = () =>({
  beds: []
})

export const getters = {
  getBedTypes: state => state.beds
}

export const mutations ={
  setBedTypes(state, beds){
    state.beds = beds
  }
}

export const actions = {
  async fetchBedTypes({ commit }){
    await this.$api.getBedTypes.get()
      .then(res =>{
        commit('setBedTypes', res)
      })
  }
}
