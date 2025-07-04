<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  options: Array,
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const selectedLabel = computed(() => {
  return props.options.find(o => o.value === props.modelValue)?.name || 'Select...'
})

const filteredOptions = computed(() =>
  props.options.filter(option => option.value !== props.modelValue)
)

const selectOption = (option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="dropdown" @click="toggleDropdown">
    <span class="selected">{{ selectedLabel }}</span>
    <ul v-show="isOpen" class="dropdown-list">
      <li
        v-for="option in filteredOptions"
        :key="option.name"
        @click.stop="selectOption(option)"
        :class="{ selectedOption: option.value === modelValue }"
      >
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  border: 1px solid var(--color-muted);
  padding: 0.4em 0.6em;
  background: var(--color-background);
  cursor: pointer;
  position: relative;
  user-select: none;
  width: 100%;
}

.selected {
  display: block;
}

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0.3em 0;
  border: 1px solid var(--color-muted);
  background: var(--color-background);
  position: absolute;
  width: 100%;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.dropdown-list li {
  color: var(--color-muted); 
  padding: 0.4em 0.6em;
  cursor: pointer;
}

.dropdown-list li:hover {
  color: var(--color-primary);
  border: 1px solid var(--color-muted);
}

.selectedOption {
  color: aliceblue;
  background: var(--color-muted);
  font-weight: bold;
}
</style>
