<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import BrightnessSlider from './BrightnessSlider.vue'
import InvertToggle from './InvertToggle.vue'

const props = defineProps({
  brightnessThreshold: {
    type: Number,
    required: true
  },
  invert: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:brightnessThreshold', 'update:invert'])

// Local reactive state for brightnessThreshold
const localBrightness = ref(props.brightnessThreshold)
watch(() => props.brightnessThreshold, (val) => {
  if (val !== localBrightness.value) {
    localBrightness.value = val
  }
})
watch(localBrightness, (val) => {
  emit('update:brightnessThreshold', val)
})

// Local reactive state for invert
const localInvert = ref(props.invert)
watch(() => props.invert, (val) => {
  if (val !== localInvert.value) {
    localInvert.value = val
  }
})
watch(localInvert, (val) => {
  emit('update:invert', val)
})
</script>

<template>
  <div class="toolbox">
    <h2>Toolbox</h2>
    <BrightnessSlider v-model="localBrightness" />
    <InvertToggle v-model="localInvert" />
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
  background-color: var(--color-background);
  width: 300px;
}
</style>
