<script setup>
const model = defineModel()

const toggle = () => {
  model.value = !model.value
}
</script>

<template>
  <div class="invert-toggle">
    <label class="switch">
      <input type="checkbox" :checked="model" @change="toggle" />
      <span class="slider"></span>
    </label>
    <span class="label-text">Invert</span>
  </div>
</template>

<style scoped>
.invert-toggle {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label-text {
  font-size: 0.9rem;
  color: var(--color-primary);
}

.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 22px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0;
  right: 0; bottom: 0;
  background-color: var(--color-secondary);
  transition: 0.4s;
  border-radius: 22px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px; width: 16px;
  left: 3px; bottom: 3px;
  background-color: var(--color-primary);
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: var(--color-secondary);
}

input:checked + .slider:before {
  transform: translateX(18px);
}
</style>
