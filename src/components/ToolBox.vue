<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

// ✅ Props for v-model
const props = defineProps({
  brightnessThreshold: {
    type: Number,
    required: true
  }
})

// ✅ Emit for v-model
const emit = defineEmits(['update:brightnessThreshold'])

// Local slider state
const localThreshold = ref(props.brightnessThreshold)

// 🔁 Watch local change and debounce emit
let debounceTimer = null
watch(localThreshold, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('update:brightnessThreshold',  Number(newVal))
  }, 150)
})

// Sync if external prop changes
watch(() => props.modelValue, (val) => {
  if (val !== localThreshold.value) {
    localThreshold.value = val
  }
})
</script>

<template>
  <div class="toolbox">
    <h2>Toolbox</h2>
    <label for="brightness">Brightness Threshold</label>
    <input
      id="brightness"
      class="slider"
      type="range"
      min="10"
      max="255"
      v-model="localThreshold"
    />
    <div class="value">{{ localThreshold }}</div>
  </div>
</template>

<style scoped>
.toolbox {
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-primary);
  background-color:var(--color-background);
  width: 300px;
}
.toolbox .slider {
  width: 100%;
  height: 6px;
  background: var(--color-secondary);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.toolbox .slider:hover {
  background: #5a5a5a; /* slightly lighter on hover */
}

label {
  font-weight: 500;
}
.value {
  text-align: right;
  font-size: 0.9rem;
  color: var(--color-primary);
}
</style>
