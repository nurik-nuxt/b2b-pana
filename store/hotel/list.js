export const state = () => ({
  list: [],
})
export const getters = {
  getList: state => state.list,
}
export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  }
}
export const actions = {
  async fetchList({commit}) {
    await this.$api.hotel.list.get()
      .then(res => {
        commit("set", ["list", res]);
      })
  },
  async create({}, {subcategory, successCallback=(id)=>{}, errorCallback=()=>{}}) {
    let data = new FormData();
    data.append("subcategory", subcategory);
    data.append("type_rent",1);

    await this.$api.hotel.create.post({body: data})
      .then(res => {
        successCallback(res.id);
      })
      .catch(errorCallback)
  },
  async deleteHotel({ commit },{ id, successCallback=()=>{}, errorCallback=()=>{}}){
    await this.$api.hotel.remove.delete({params:{id}})
        .then(successCallback)
        .catch(errorCallback)
  }
}
