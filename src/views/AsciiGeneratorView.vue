<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import AsciiGeneratorSketch from "../components/AsciiGeneratorSketch.vue";
import ToolBox from "../components/Toolbox/ToolBox.vue";
import { useImageStore } from "@/composables/useImageStore";

const router = useRouter();
const sketchRef = ref(null);
const { uploadedImage, brightnessThreshold, invert, charSize, charSet } = useImageStore();

onMounted(() => {
  if (!uploadedImage.value) {
    router.push("/");
  }
});
</script>

<template>
  <main class="layout">
    <div class="canvas">
      <AsciiGeneratorSketch
        ref="sketchRef"
        :image="uploadedImage"
        :brightness-threshold="brightnessThreshold"
        :invert="invert"
        :char-size="charSize"
        :char-set="charSet"
      />
    </div>
    <div class="toolbox">
      <ToolBox :ascii-svg="sketchRef?.asciiSvg" />
    </div>
  </main>
</template>


<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

.canvas {
  flex: 1 1 auto;
  max-width: 70%;
}

.toolbox {
  width: 20rem;
}
</style>
