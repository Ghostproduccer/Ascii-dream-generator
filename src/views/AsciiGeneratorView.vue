<script setup>
import { ref, watch } from 'vue'
import AsciiGeneratorSketch from '../components/AsciiGeneratorSketch.vue'
import ToolBox from '../components/Toolbox/ToolBox.vue'

const brightnessThreshold = ref(200)
const invert = ref(false)
const charSize = ref(8)
const charSet = ref("@%#*+=-:. ")

</script>

<template>
  <main class="layout">
    <div class="canvas">
      <AsciiGeneratorSketch 
        :brightness-threshold="brightnessThreshold"
        :invert="invert"
        :char-size="charSize"
        :char-set="charSet" 
      />
    </div>
    <div class="toolbox">
      <ToolBox 
        v-model:brightness-threshold="brightnessThreshold"
        v-model:invert="invert"
        v-model:char-size="charSize" 
        v-model:char-set="charSet"
      />
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
