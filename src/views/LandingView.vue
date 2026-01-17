<script setup>
import AsciiAnimationComponent from "@/components/AsciiAnimationComponent.vue";
import AsciiBackground from "@/components/AsciiBackground.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import { useRouter } from "vue-router";

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

const handleClickUpload = () => {
  router.push("/generate");
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
</style>
