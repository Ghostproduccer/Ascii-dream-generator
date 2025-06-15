<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

// Debounced emit on slider change
let debounceTimer = null
watch(localValue, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', Number(newVal))
  }, 150)
})

// Sync with external modelValue change
watch(() => props.modelValue, (val) => {
  if (val !== localValue.value) {
    localValue.value = val
  }
})
</script>

<template>
  <div>
    <label for="brightness">Brightness Threshold</label>
    <input
      id="brightness"
      class="slider"
      type="range"
      min="10"
      max="255"
      v-model="localValue"
    />
    <div class="value">{{ localValue }}</div>
  </div>
</template>

<style scoped>
.slider {
  width: 100%;
  height: 6px;
  background: var(--color-secondary);
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.slider:hover {
  background: #5a5a5a;
}
.value {
  text-align: right;
  font-size: 0.9rem;
  color: var(--color-primary);
}
</style>
