export const state = () =>({
  breakfastList:[]
})

export const getters = {
  getBreakfastList: state => state.breakfastList
}

export const mutations = {
  set(state, [namespace,value]){
    state[namespace] = value
  }
}

export const actions = {
  async fetchBreakfastList({ commit }){
    await this.$api.breakfast.get()
      .then(res => {
        commit("set",["breakfastList",res])
      })
  }
}
