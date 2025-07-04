<script setup>
import InvertToggle from './InvertToggle.vue'
import SliderComponent from './SliderComponent.vue'
import CharSelect from './CharSelect.vue'

const brightnessThreshold = defineModel('brightnessThreshold')
const invert = defineModel('invert')
const charSize = defineModel('charSize')
const charSet = defineModel('charSet')
</script>

<template>
  <div class="toolbox">
    <h2>Toolbox</h2>
    
    <SliderComponent
      v-model="brightnessThreshold"
      :minValue="10"
      :maxValue="255"
      placeholder="Brightness Threshold"/>
    
      <SliderComponent
      v-model="charSize"
      :minValue="6"
      :maxValue="20"
      placeholder="Definition"
      inverted="true"/>

    <CharSelect 
    v-model="charSet"/>

    <InvertToggle v-model="invert" />
    
  </div>
</template>

<style scoped>
.toolbox {
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-muted);
  background-color: var(--color-background);
  width: 300px;
}
</style>
