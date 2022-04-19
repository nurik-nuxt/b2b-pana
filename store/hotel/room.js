import data from "bootstrap/js/src/dom/data";

const defaultInfo = {
  type: null, // int
  title: null, // string
  area: null, // int
  price: null, // int
  smoking: null, // bool
  services: [],
  amount_of_visitors: null, // int
  bed_type: null, // string
  amount_beds: null, // int
  amount_of_room: null, // int
  for_disabled_people: null, // boolean
  images: []
}

export const state = () =>({
  roomTypes: [],
  roomInfo: {}
})

export const getters = {
  getRoomTypes: state => state.roomTypes,
  getRoomInfo: state => state.roomInfo
}

export const mutations = {
  setRoomTypes(state,roomTypes){
    state.roomTypes = roomTypes
  },
  setRoomInfo(state, roomInfo){
    state.roomInfo = roomInfo
  }
}

export const actions = {
  async fetchRooTypes({ commit }){
    await this.$api.getRoomTypes.get()
      .then(res =>{
        commit('setRoomTypes', res)
        // console.log(res)
      })
  },

  async fetchRoomInfo({commit}, {id}){
    await this.$api.room.detail.get({params:{id:id}})
      .then(res =>{
        console.log(res)
      })
  },

  async addRoom({commit},{id,data, successCallback=()=>{}, errorCallback=()=>{}}){
    await this.$api.creatingRoom.post({params:{id}, body:data})
        .then(successCallback)
        .catch(({response}) => errorCallback(response.data))
  }
}
