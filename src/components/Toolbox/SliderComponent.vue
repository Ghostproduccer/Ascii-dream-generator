<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  minValue: { type: Number, required: true },
  maxValue: { type: Number, required: true },
  placeholder: { type: String, required: true },
  inverted: { type: Boolean, default: false }
})

const modelValue = defineModel()

// Internal value for immediate slider feedback
const displayValue = computed({
  get: () => {
    if (!props.inverted) return modelValue.value
    return props.maxValue - (modelValue.value - props.minValue)
  },
  set: (val) => {
    let targetValue = Number(val)
    if (props.inverted) {
      targetValue = props.maxValue - (targetValue - props.minValue)
    }
    modelValue.value = targetValue
  }
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
      v-model.number="displayValue"
    />
    <div class="value">{{ displayValue }}</div>
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
