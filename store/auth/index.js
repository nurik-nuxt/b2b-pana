// import Cookies from 'js-cookie'
// const token = this.$cookies.authToken.get();

export const state = () => ({
  token: null,
  profile: null
})

export const getters = {
  getToken: state => state.token,
  getProfile: state => state.profile
}

export const mutations = {
  set(state, [namespace, value]) {
    state[namespace] = value;
  },
  clear(state, namespace) {
    state[namespace] = null;
  }
}

export const actions = {

  takeToken({ commit }) {
    commit("set", ["token", this.$cookies.authToken.get()]);
  },

  async fetchSelf({ commit }) {
    await this.$api.profile.get()
      .then(res => {
        commit("set", ["profile", res]);
      })
      .catch(error => {
        commit("clear", "profile");
      })
  },

  async checkValid({ state, dispatch }) {
    if (!state.token) {await dispatch("takeToken");}
    await dispatch("fetchSelf");
    return !!state.profile;
  },

  async login({commit, state, dispatch}, {user, errorCallback, successCallback}) {
    await this.$api.auth.login.post({body: user})
        .then(res => {
          console.log(res)
          commit("set", ["token", res.access_token]);
          this.$cookies.authToken.set(res.access_token);
          // successCallback(res)
          dispatch("fetchSelf")
        }).catch(({response}) => {
          // errorCallback(response.data.detail);
        })
  },


  async registration({ commit, dispatch, state }, {userForm, registrationForm, errorCallback, successCallback}) {
    // let registrationFormData = new FormData();
    // registrationFormData.append("email", registrationForm.email);
    // registrationFormData.append("password", registrationForm.password);

    let userFormData = new FormData();
    userFormData.append("organization", userForm.organization);
    userFormData.append("position", userForm.position);
    userFormData.append("first_name", userForm.first_name);
    userFormData.append("city", userForm.city);
    userFormData.append("phone_number", userForm.phone_number);

    await this.$api.auth.registration.post({body: registrationForm})
      .then(async ({token}) => {
        if (!token) errorCallback("Ошибка регистрации");
        commit("set", ["token", token]);
        this.$cookies.authToken.set(token);

        await this.$api.profile.post({body: userFormData})
            .then(async res => {
              await dispatch("checkValid");
              successCallback(res);
            })
      })
      .catch(({response}) => {
        errorCallback(response.data);
      })

  },

  async restoreSendCode({}, {email, successCallback, errorCallback}) {
    let form = new FormData();
    form.append("email", email);
    await this.$api.auth.restore.post({body: form})
        .then((res) => successCallback(res))
        .catch(({response}) => errorCallback(response.data))
  },
  async restoreCheckCode({commit}, {email, code, successCallback, errorCallback}) {
    let form = new FormData();
    form.append("email", email);
    form.append("code", code);
    await this.$api.auth.restore.put({body: form})
        .then(({token}) => {commit("set", ["token", token]);successCallback()})
        .catch(({response}) => errorCallback(response.data))
  },
  async restoreSetPassword({commit}, {password}) {
    let form = new FormData();
    form.append("password", password);
    await this.$api.auth.changePassword.post({body: form});
    commit("clear", "token");
  }

}
