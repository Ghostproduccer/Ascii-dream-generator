import { ref, reactive, toRefs } from "vue";

// Shared state object (acting as a simple store)
const state = reactive({
  uploadedImage: null,
  brightnessThreshold: 200,
  invert: false,
  charSize: 10,
  charSet: "@%#*+=-:. "
})

export function useImageStore() {
  const setImage = (imageData) => {
    state.uploadedImage = imageData
  }

  return {
    ...toRefs(state),
    setImage
  }
}
