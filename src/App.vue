<script setup>
import { ref, watch } from 'vue'
import AsciiGeneratorSketch from './components/AsciiGeneratorSketch.vue'
import ToolBox from './components/ToolBox.vue'

const brightnessThreshold = ref(200)
const invert = ref(false)

// ✅ Watch for updates from ToolBox
watch(brightnessThreshold, (newVal) => {
  console.log('Brightness threshold updated to:', newVal)
})
</script>

<template>
  <main class="layout">
    <div class="canvas">
      <AsciiGeneratorSketch 
        :brightness-threshold="brightnessThreshold"
        :invert="invert" 
      />
    </div>
    <div class="toolbox">
      <ToolBox 
        v-model:brightness-threshold="brightnessThreshold"
        v-model:invert="invert" 
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
  width: 300px;
}
</style>
