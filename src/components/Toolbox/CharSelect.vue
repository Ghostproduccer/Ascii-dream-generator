<script setup>
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