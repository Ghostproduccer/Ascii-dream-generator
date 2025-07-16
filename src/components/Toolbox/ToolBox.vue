<script setup>
import InvertToggle from './InvertToggle.vue'
import SliderComponent from './SliderComponent.vue'
import CharSelect from './CharSelect.vue'
import asciiDreams from '@/assets/images/asciiDreams.svg'
import { ref } from 'vue'

const brightnessThreshold = ref(200)
const invert = ref(false)
const charSize = ref(8)
const charSet = ref("@%#*+=-:. ")

defineExpose({
  brightnessThreshold,
  invert,
  charSize,
  charSet
})

const props = defineProps({
  asciiSvg: {
    type: String,
    default: ''
  }
})

function downloadSVG() {
  const blob = new Blob([props.asciiSvg], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'ascii-dream.svg'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="toolbox">
    <div class="logo-container">
      <img class="logo" :src="asciiDreams" alt="ASCII Dreams Logo" />
    </div>

    <SliderComponent
      v-model="brightnessThreshold"
      :minValue="10"
      :maxValue="255"
      placeholder="Threshold"
    />

    <SliderComponent
      v-model="charSize"
      :minValue="6"
      :maxValue="20"
      placeholder="Definition"
      :inverted="true"
    />

    <CharSelect v-model="charSet" />
    <InvertToggle v-model="invert" />
     <div>
    <button @click="downloadSVG()">Download</button>
  </div>
  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 50%;
  margin-bottom: 1.5rem;
}

.logo {
  width: 100%;
  opacity: 0.8;
  height: auto;
}

.toolbox {
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  border: 1px solid var(--color-muted);
  background-color: var(--color-background);
  width: 35rem;
}
</style>
