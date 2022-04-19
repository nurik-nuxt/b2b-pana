import login from "../../pages/auth/login";

export const state = () => ({
  id: null,
  main: null,
  convenience: null,
  images: null,
  payment: null,
  rules: null,
  services: [],
  rooms: []
})
export const getters = {
  getMainInfo: state => state.main,
  getConvenience: state => state.convenience,
  getImages: state => state.images,
  getPayment: state => state.payment,
  getRules: state => state.rules,
  getServices: state => state.services,
  getRooms: state => state.rooms
}
export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}
export const actions = {

  // MAIN
  async fetchMain({ commit }, {id}) {
    await this.$api.hotel.main.get({params: {id:id}})
      .then(res => {
        commit("set", ["main", res]);
      })
  },
  async changeMain({ commit }, {id, data, successCallback=()=>{}, errorCallback=()=>{}}) {
    await this.$api.hotel.main.put({params: {id}, body: data})
      .then(successCallback)
      .catch(({response}) => errorCallback(response.data))
  },

  // CONVENIENCE
  async fetchConvenience({ commit }, {id}) {
    await this.$api.hotel.convenience.get({params: {id}})
      .then(res => {
        commit("set", ["convenience", res]);
      })
  },

  async addConveniences({ commit }, {id, data, successCallback=()=>{}, errorCallback=()=>{}}){
    await this.$api.hotel.convenience.post({params:{id},body:data})
        .then(successCallback)
        .catch(({response}) => errorCallback(response.data))
  },

  // IMAGES
  async fetchImages({ commit }, {id}) {
    await this.$api.hotel.images.get({params: {id}})
      .then(res => {
        commit("set", ["images", res]);
      })
  },
  async pushImage({ state, commit, dispatch }, {id, base64}) {
    await this.$api.hotel.images.post({params:{id: id}, body: [{image: base64}]})
        .then(async res => {
          await dispatch("fetchImages", {id});ß
        })
  },
  async sendImages({ commit }, {id, data}){
    // console.log("DATA", data);
    // console.log("ID", id);
    await this.$api.hotel.images.post({params:{id}, body: data})
      .then(res => {
        console.log(res)
      })
  },
  async deleteImage({ commit, dispatch }, {id,image_id}){
    await this.$api.hotel.images.delete({params:{id,image_id}})
      .then(async res => {
        await dispatch("fetchImages", {id})
      })
  },

  // PAYMENT
  async fetchPayment({ commit }, {id}) {
    await this.$api.hotel.payment.get({params: {id}})
      .then(res => {
        commit("set", ["payment", res]);
      })
      .catch(err => {})
  },
  async changePayment({ commit }, {id, form, successCallback=()=>{}, errorCallback=()=>{}}) {
    await this.$api.hotel.payment.post({params: {id}, body: form})
        .then(successCallback)
        .catch(({response}) => errorCallback(response.form))
  },

  // RULES
  async fetchRules({ commit }, {id}) {
    await this.$api.hotel.rules.get({params: {id}})
      .then(res => {
        commit("set", ["rules", res]);
      })
  },

  async addRules({ commit }, {id,data}){
    await this.$api.hotel.rules.post({params:{id},body:data})
      .then(res =>{
        // console.log(res)
      })
  },

  // SERVICES
  async fetchServices({ commit }, {id}) {
    await this.$api.hotel.services.get({params: {id}})
      .then(res => {
        commit("set", ["services", res]);
      })
  },
  async changeServices({ commit }, {services, id}) {
    await this.$api.hotel.services.post({body: services, params: {id}})
      .then(res => {console.log(res)})
  },
  async deleteService({ commit,dispatch }, {id}){
    await this.$api.hotel.services.delete({params:{id}})
        .then(async res => {
          await dispatch("fetchServices",{id})
        })
  },

  // ROOMS
  async fetchRooms({ commit }, {id}){
    await this.$api.hotel.rooms.get({params:{id}})
      .then(res =>{
        commit("set", ["rooms", res])
      })

  },

  // async deleteRoom({ commit ,dispatch }, { id }){
  //   await this.$api.room.detail.delete({params:{ id }})
  //       .then(async res =>{
  //         await dispatch("fetchRooms", { id })
  //       })
  // },

  async deleteRoom({ commit, dispatch }, {id}){
    await this.$api.room.detail.delete({params:{id}})
        .then(async res => {
          await dispatch("fetchRooms", {id})
        })
  },


}
