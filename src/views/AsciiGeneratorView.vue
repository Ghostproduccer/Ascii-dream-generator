<script setup>
import { ref } from 'vue'
import AsciiGeneratorSketch from '../components/AsciiGeneratorSketch.vue'
import ToolBox from '../components/Toolbox/ToolBox.vue'

const toolBoxRef = ref(null)
const sketchRef = ref(null)

</script>

<template>
  <main class="layout">
    <div class="canvas">
      <AsciiGeneratorSketch 
        ref="sketchRef"
        :brightness-threshold="toolBoxRef?.brightnessThreshold"
        :invert="toolBoxRef?.invert"
        :char-size="toolBoxRef?.charSize"
        :char-set="toolBoxRef?.charSet" 
      />
    </div>
    <div class="toolbox">
      <ToolBox 
        ref="toolBoxRef"
        :ascii-svg="sketchRef?.asciiSvg"
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
