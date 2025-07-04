<script setup>
import Dropdown from './Dropdown.vue'
const charSet = defineModel()

const charsetOptions = [
  { name: 'Ascii Dreams', value: '@%#*+=-:. ' },
  { name: 'Blocks', value: '█▓▒░▚▞▖ ' },
  { name: 'Blocks Extended', value: '█▓▒░▚▞▖▗▘▙▛▜▝▟ ' },
  { name: '1993', value: '!@#$%^&*()_+-=[]{}|;:\'",.<>/? ' },
  { name: 'Symbol', value: '☀☁☂☃☄★☆☎✈✉✌ ' },
  { name: 'Numbers', value: '9876543210 ' },
  { name: 'Letters', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ' },
]

const onSelect = (e) => {
  charSet.value = e.target.value
}
</script>

<template>
  <div class="char-select">
    <label for="charset-select">Select a CharSet</label>
    <Dropdown v-model="charSet" :options="charsetOptions" />
  </div>
</template>

<style scoped>
.char-select {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  font-family: sans-serif;
  font-size: 14px;
}

label {
  font-weight: 500;
}

select {
  appearance: none;       /* Removes default arrow in most browsers */
  -webkit-appearance: none; /* For Safari */
  -moz-appearance: none;    /* For Firefox */
  border: 1px solid var(--color-muted);
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: 14px;
  transition: border-color 0.2s;
  background-image: none; /* Removes any fallback arrow */
}

select:focus {
  outline: none;
  border-color: #666;
}
</style>

