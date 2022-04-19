export const state = () =>({
  categories: null,
  subcategories: null
})

export const getters = {
  getCategories: state => state.categories,
  getSubcategories : state => state.subcategories
}

export const mutations = {
  setCategories(state,categories){
    state.categories = categories
  },
  setSubcategories(state,subcategories){
    state.subcategories = subcategories
  }
}

export const actions = {
  async fetchCategories({ commit }){
    await this.$api.categories.get()
      .then(res =>{
        commit("setCategories", res)
      })
      .catch(error =>{
        console.log(error)
      })
  },

  async fetchSubcategories({ commit }, id){
    // let data = new FormData();
    // data.append("id",id)
    await this.$api.subcategories.get({
      params:{
        id:id
      }
    })
      .then(res =>{
        commit("setSubcategories", res)
      })
      .catch(error =>{
        console.log(error)
      })
  }
}
