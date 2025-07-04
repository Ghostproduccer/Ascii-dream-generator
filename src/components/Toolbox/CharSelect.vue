<script setup>
import { ref, watch } from 'vue'

const charSet = defineModel()

// Example charset options
const charsetOptions = [
  { name: 'Ascii Dreams', value: '@%#*+=-:. ' },
  { name: 'Blocks', value: '█▓▒░▚▞▖ ' },
  { name: 'Blocks Extended', value: '█▓▒░▚▞▖▗▘▙▛▜▝▟ ' },
  { name: 'Symbol', value: '☀☁☂☃☄★☆☎✈✉✌ ' },
  { name: '1993', value: '!@#$%^&*()_+-=[]{}|;:\'",.<>/? ' },
  { name: 'Numbers', value: '9876543210 ' },
  { name: 'Letters', value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ ' },
]
const submited = ref(false)

const onMounted = () => {
  if (charSet.value === undefined || charSet.value === '') {
    charSet.value = charsetOptions[0].value
  }
  submited.value = false
}

const handleSubmitCustomCharSet = () => {
  if (charSet.value.trim() === '') {
    alert('Please enter a valid custom charset.')
    return
  }
  charSet.value = charSet.value.trim()
  submited.value = true
}
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
  </div>
</template>

<style scoped>
.char-select {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}
</style>