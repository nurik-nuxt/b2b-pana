export const state = () => ({
    photosOfTheObject: [],
    photosOfTheGarden: [],
    photosOfTheUtils: [],
    photosOfTheRoom: []
})

export const getters = {
    getphotosOfTheObject: state => state.photosOfTheObject,
    getphotosOfTheGarden: state => state.photosOfTheGarden,
    getphotosOfTheUtils: state => state.photosOfTheUtils,
    getphotosOfTheRoom: state => state.photosOfTheRoom,
}

export const mutations = {
    addingPhotos(state, { image, type }) {
        // let data = new FormData()
        // data.append('image',image)
        // console.log("BEFORE LENGTH", state[type].length);
        state[type].push({image})
        // console.log("IMAGES", state[type]);
      // state[type].push(image)
    },

    deletePhoto(state, { index, type }) {
        state[type].splice(index, 1)
    }
}
