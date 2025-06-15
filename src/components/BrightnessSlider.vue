<script setup>
import { watch } from 'vue'
const brightnessThreshold = defineModel()

// Debounce emit
let debounceTimer = null
watch(brightnessThreshold, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    brightnessThreshold.value = Number(newVal)
  }, 150)
})
</script>

<template>
  <div class="container">
    <label for="brightness">Brightness Threshold</label>
    <input
      id="brightness"
      class="slider"
      type="range"
      min="10"
      max="255"
      v-model.number="brightnessThreshold"
    />
    <div class="value">{{ brightnessThreshold }}</div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.slider {
  width: 100%;
  height: 6px;
   accent-color: var(--color-muted);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.value {
  text-align: right;
  font-size: 0.9rem;
  color: var(--color-primary);
}
</style>
