import Cookies from 'js-cookie'
const token = Cookies.get("AuthToken");

export const state = () => ({
    token: token || null,
})

export const getters = {
    getToken: state => state.token,
}

export const mutations = {

}

export const actions = {
    async sendingContactDetails({ commit }, { userData, additionalData }) {
        const data = await this.$api.creatingHotel.post(userData, {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            const id = response.id
            this.$api.sendingAdditionalHotelData.put(additionalData, {
                params: { id },
                headers: {
                    'Authorization': `JWT ${token}`,
                    'Content-Type': 'application/json'
                }
            })
        })

    },

    async getServices() {
        return await this.$api.getServices.get({
            headers: { "Authorization": `JWT ${token}` }
        })
    },

    async getTypes() {
        return await this.$api.getTypes.get({
            headers: { "Authorization": `JWT ${token}` }
        })
    },

    async getBedTypes() {
        return await this.$api.getBedTypes.get({
            headers: { "Authorization": `JWT ${token}` }
        })
    },

    async creatingRoom({ commit }, data) {
        let formData = new FormData();
        data.image.forEach((element, i) => {
            // console.log(id);
            formData.append('files[' + i + ']', file);
        });
        // console.log(formData);

        await this.$api.creatingRoom.post(data, {
            headers: {
                'Authorization': `JWT ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            const id = response.id
            // console.log(id);
        })
    }
}
