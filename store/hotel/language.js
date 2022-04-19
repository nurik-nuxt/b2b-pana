export const state = () =>({
  languages:[]
})

export const getters = {
  getLanguages: state => state.languages
}

export const mutations = {
  set(state, [namespace,value]){
    state[namespace] = value
  }
}

export const actions = {
  async fetchLanguages({ commit }){
    await this.$api.languages.get()
      .then(res => {
        commit("set",["languages",res])
      })
  }
}
