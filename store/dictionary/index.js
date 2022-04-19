const createDict = (name, apiPath, payloadKeys = []) => ({name, apiPath, payloadKeys});
export const Dictionary = Object.freeze({
  services: createDict('services', 'dictionary.services.get'),
  countries: createDict('countries', 'dictionary.countries.get'),
  cities: createDict('cities', 'dictionary.cities.get', ["country_id"]),
  breakfasts: createDict('breakfasts', 'dictionary.breakfasts.get'),

  getDictKey: (dictionary, payload) => dictionary.payloadKeys.map(key => `${key}-${payload[key]}`).join('~')
});

export const state = () => ({
  dictionaries: {
    services: null,
    countries: null,
    cities: null,
  }
})
export const getters = {
  getDictionaries: state => state.dictionaries
}
export const mutations = {
  setEmptyDictionary(state, dictionary) {
    if(dictionary.payloadKeys.length) state.dictionaries[dictionary.name] = {};
    else state.dictionaries[dictionary.name] = [];
  },
  setDictionary(state, {dictionary, value, payload = null}) {
    let obj = {...state.dictionaries};

    if (!payload)
      obj[dictionary.name] = value;
    else
      obj[dictionary.name][Dictionary.getDictKey(dictionary, payload)] = value;

    state.dictionaries = obj;
  }
}
export const actions = {
  async fetchDict({commit, state}, {dictionary, payload}) {
    // CHECK
    if (state.dictionaries[dictionary.name]) {
      if (Array.isArray(state.dictionaries[dictionary.name])) {
        if (state.dictionaries[dictionary.name].length)
          return;
      }
      else {
        if (state.dictionaries[dictionary.name][Dictionary.getDictKey(dictionary, payload)]?.length)
          return;
      }
    }

    commit("setEmptyDictionary", dictionary);
    const api = dictionary.apiPath.split('.').reduce((o, i) => o[i], this.$api);
    await api({params: payload})
      .then(res => {
        commit("setDictionary", {dictionary, value: res, payload});
      })
  }
}
