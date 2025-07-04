<script setup>
import { ref, watch } from 'vue'

const charSet = defineModel()

// Example charset options
const charsetOptions = [
  { name: 'Standard', value: '@%#*+=-:. ' },
  { name: 'Blocks', value: '█▓▒░▚▞▖ ' },
  { name: 'Extended', value: '█▓▒░▚▞▖▗▘▙▛▜▝▟ ' },
  { name: 'Symbols', value: '☀☁☂☃☄★☆☎✈✉✌ ' },
  { name: 'Emoji', value: '😀😃😄😁😆😅😂🤣😊😇🙂🙃😉' },
  { name: 'Punctuation', value: '!@#$%^&*()_+-=[]{}|;:\'",.<>/? ' },
  { name: 'Numbers', value: '9876543210 ' },
  { name: 'Letters', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ' },
  { name: 'Custom', value: '' }
]

// Handle select change
function onSelect(e) {
  charSet.value = e.target.value
}
</script>

<template>
  <div class="char-select">
    <label for="charset-select">Select a CharSet</label>
    <select id="charset-select" @change="onSelect" :value="charSet">
      <option
        v-for="option in charsetOptions"
        :key="option.name"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
    <div v-if="charSet === ''" style="margin-top: 0.5em;">
      <input
        type="text"
        placeholder="Enter custom charset"
        v-model="charSet"
      />
    </div>
  </div>
</template>

<style scoped>
.char-select {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>