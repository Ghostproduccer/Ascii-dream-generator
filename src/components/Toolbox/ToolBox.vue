<script setup>
import InvertToggle from './InvertToggle.vue'
import SliderComponent from './SliderComponent.vue'
import CharSelect from './CharSelect.vue'
import asciiDreams from '@/assets/images/asciiDreams.svg'

const brightnessThreshold = defineModel('brightnessThreshold')
const invert = defineModel('invert')
const charSize = defineModel('charSize')
const charSet = defineModel('charSet')
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
      placeholder="Brightness Threshold"
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
