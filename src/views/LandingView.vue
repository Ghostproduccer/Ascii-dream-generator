<script setup>
import AsciiAnimationComponent from "@/components/AsciiAnimationComponent.vue";
import AsciiBackground from "@/components/AsciiBackground.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { useRouter } from "vue-router";
import { useImageStore } from "@/composables/useImageStore.js";
import { ref } from "vue";

const frames = [
  `   ▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄
   █▒▒░░░░░░░░░▒▒█
    █░░█░░░░░█░░█
 ▄▄  █░░░▀█▀░░░█  ▄▄
█░░█ ▀▄░░░░░░░▄▀ █░░█`,

  `   ▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄
   █▒▒░░░░░░░░░▒▒█
 ▄▄ █░░█░░░░░█░░█ ▄▄
█░░█ █░░░▀█▀░░░█ █░░█
 ▀▀  ▀▄░░░░░░░▄▀   ▀▀`,

  `   ▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄
 ▄▄█▒▒░░░░░░░░░▒▒█▄▄
█░░██░█░░░░░█░░░██░░█
 ▀▀  █░░░▀█▀░░░█  ▀▀
     ▀▄░░░░░░░▄▀`,

  `   ▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄
   █▒▒░░░░░░░░░▒▒█
 ▄▄ █░░█░░░░░█░░█ ▄▄
█░░█ █░░░▀█▀░░░█ █░░█
 ▀▀  ▀▄░░░░░░░▄▀   ▀▀`,
];

const router = useRouter();
const { setImage } = useImageStore();

const fileInput = ref(null);

const handleClickUpload = () => {
  fileInput.value?.click();
};

const handleFileSelect = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
      router.push("/generate");
    };
    reader.readAsDataURL(file);
  }
};
</script>

<template>
  <div class="landing-container">
    <AsciiBackground />

    <AsciiAnimationComponent :frames="frames" :interval="300" />

    <p>⊹₊˚‧ Drop or upload your image! ‧˚₊⊹</p>

    <ButtonComponent variant="primary" size="md" @click="handleClickUpload">
      Upload
    </ButtonComponent>
    <input
      ref="fileInput"
      type="file"
      accept="image/*"
      @change="handleFileSelect"
    />
  </div>
</template>

<style scoped>
.landing-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
p {
  margin: 0.25rem 0.5rem 1rem 0.5rem;
  font-size: 1rem;
  color: var(--color-primary);
}
input[type="file"] {
  display: none;
}
</style>
