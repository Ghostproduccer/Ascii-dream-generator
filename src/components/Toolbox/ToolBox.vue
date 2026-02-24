<script setup>
import InvertToggle from './InvertToggle.vue'
import SliderComponent from './SliderComponent.vue'
import CharSelect from './CharSelect.vue'
import asciiDreams from '@/assets/images/asciiDreams.svg'
import { useImageStore } from '@/stores/imageStore'
import { storeToRefs } from 'pinia'

const store = useImageStore()
const { brightnessThreshold, invert, charSize, charSet } = storeToRefs(store)

const props = defineProps({
  asciiSvg: {
    type: String,
    default: ''
  }
})

function downloadSVG() {
  if (!props.asciiSvg) return
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
      <button @click="downloadSVG()" :disabled="!props.asciiSvg">Download</button>
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
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

