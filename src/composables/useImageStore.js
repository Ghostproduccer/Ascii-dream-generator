import { ref } from "vue";

const uploadedImage = ref(null)

export function useImageStore() {
  const setImage = (imageData) => {
    uploadedImage.value = imageData
  }
  
  return { uploadedImage, setImage }
}