export const state = () => ({
  hotelMainInfo:{},
  hotelList:[]
})

export const getters = {
  getHotelMainInfo: state => state.hotelMainInfo,
  getHotelList: state => state.hotelList
}

export const mutations = {
  setHotelMainInfo(state, hotelMainInfo){
    state.hotelMainInfo = hotelMainInfo
  },
  setHotelList(state,hotelList){
    state.hotelList = hotelList
  }
}

export const actions = {
  async fetchHotelMainInfo({commit},id){
    await this.$api.getHotel.get({
      params:{
        id:id
      }
    })
      .then(res =>{
        commit("setHotelMainInfo",res)
        // console.log(res)
      })
      .catch(error =>{
        console.log(error)
      })
  },

  async fetchHotelList({ commit }){
    await this.$api.getHotels.get()
      .then(res =>{
        commit("setHotelList",res)
        // console.log(res)
      })
      .catch(error =>{
        console.log(error)
      })
  },

}
