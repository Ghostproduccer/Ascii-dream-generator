<script setup>
import { watch } from 'vue'

const props = defineProps({
  minValue: {
    type: Number,
    required: true,
  },
  maxValue: {
    type: Number,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
})
const sliderValue = defineModel()

// Debounce emit
let debounceTimer = null
watch(sliderValue, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    sliderValue.value = Number(newVal)
  }, 150)
})
</script>

<template>
  <div class="container">
    <label for="title">{{ props.placeholder }}</label>
    <input
      id="brightness"
      class="slider"
      type="range"
      :min="props.minValue"
      :max="props.maxValue"
      v-model.number="sliderValue"
    />
    <div class="value">{{ sliderValue }}</div>
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
