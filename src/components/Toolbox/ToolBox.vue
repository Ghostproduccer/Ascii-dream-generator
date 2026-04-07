<script setup>
import InvertToggle from './InvertToggle.vue'
import SliderComponent from './SliderComponent.vue'
import CharSelect from './CharSelect.vue'
import Dropdown from './Dropdown.vue'
import asciiDreams from '@/assets/images/asciiDreams.svg'
import { useImageStore } from '@/stores/imageStore'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

/* -------------------- */
/* STORE */
/* -------------------- */

const store = useImageStore()
const { brightnessThreshold, invert, charSize, charSet } = storeToRefs(store)

/* -------------------- */
/* PROPS */
/* -------------------- */

const props = defineProps({
  asciiSvg: { type: String, default: '' },
  asciiText: { type: String, default: '' }
})

/* -------------------- */
/* DOWNLOAD LOGIC */
/* -------------------- */

const downloadValue = ref(null)

const downloadOptions = [
  { name: 'PNG', value: 'png' },
  { name: 'JPG', value: 'jpg' },
  { name: 'SVG', value: 'svg' },
  { name: 'TXT', value: 'txt' }
]

watch(downloadValue, (value) => {
  if (!value) return

  if (value === 'png') downloadCanvas('png')
  if (value === 'jpg') downloadCanvas('jpg')
  if (value === 'svg') downloadSVG()
  if (value === 'txt') downloadTXT()

  // Reset para permitir seleccionar de nuevo
  downloadValue.value = null
})

function downloadCanvas(format = 'png') {
  const canvas = document.querySelector('canvas')
  if (!canvas) return

  const mime = format === 'jpg' ? 'image/jpeg' : 'image/png'
  const dataURL = canvas.toDataURL(mime, 0.9)

  const a = document.createElement('a')
  a.href = dataURL
  a.download = `ascii-dream.${format}`
  a.click()
}

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

function downloadTXT() {
  if (!props.asciiText) return

  const blob = new Blob([props.asciiText], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = 'ascii-dream.txt'
  a.click()

  URL.revokeObjectURL(url)
}
</script>

<template>
  <div class="toolbox">

    <!-- Logo -->
    <div class="logo-container">
      <img class="logo" :src="asciiDreams" alt="ASCII Dreams Logo" />
    </div>

    <!-- Controls -->
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

    <!-- Download Dropdown -->
    <Dropdown
      v-model="downloadValue"
      :options="downloadOptions"
    >
      Download ⬇
    </Dropdown>

  </div>
</template>

<style scoped>
.logo-container {
  display: flex;
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