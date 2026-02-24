import { defineStore } from 'pinia'

export const useImageStore = defineStore('image', {
    state: () => ({
        uploadedImage: null,
        brightnessThreshold: 200,
        invert: false,
        charSize: 10,
        charSet: "@%#*+=-:. "
    }),
    actions: {
        setImage(imageData) {
            this.uploadedImage = imageData
        }
    }
})
