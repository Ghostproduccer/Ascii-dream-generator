<script setup>
import { watch, ref } from 'vue'

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
  inverted: { 
    type: Boolean, 
    default: false }
})
const modelValue = defineModel()
const localValue = props.inverted ? ref(props.maxValue -(modelValue.value - props.minValue)) : ref(modelValue.value)

watch(modelValue, (newVal) => {
  if (!props.inverted) {
    if (newVal !== localValue.value) localValue.value = newVal
  } else {
    if (newVal !== localValue.value) localValue.value = props.maxValue - (newVal - props.minValue)
  }
})

let debounceTimer = null
watch(localValue, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    if (!props.inverted) {
      modelValue.value = Number(newVal)
    } else {
      modelValue.value = props.maxValue - (Number(newVal) - props.minValue)
    }
  }, 100)
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
      v-model.number="localValue"
    />
    <div class="value">{{ localValue }}</div>
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
